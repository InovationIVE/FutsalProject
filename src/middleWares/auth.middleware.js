
import { userPrisma } from '../utils/prisma/index.js';
import { sessionCache, negativeSessionCache } from '../utils/sessionCache.js';
import { hashToken } from '../utils/token.utils.js';
import { setSessionCookie } from '../utils/cookie.utils.js';
import { SESSION_DURATION_MINUTES, RENEWAL_THRESHOLD_MINUTES } from '../constants/auth.constants.js';

// --- 정책 상수 ---
// export const SESSION_DURATION_MINUTES = 60; // 이동됨
// const RENEWAL_THRESHOLD_MINUTES = 10; // 세션 만료 5분 전부터 갱신 시도 // 이동됨


/**
 * 인증 미들웨어 - 세션 토큰 검증 및 사용자 정보 주입
 */
const authMiddleware = async (req, res, next) => {
  const excludedRoutes = ['/auth/login', '/auth/signup', '/auth/signup/code', '/auth/signup/code/verify', '/auth/reset-password/link', '/auth/reset-password/code/verify', '/auth/reset-password', '/auth/find-id', '/auth/find-password', '/auth/reset-password-with-token'];
  if (excludedRoutes.includes(req.path)) {
    return next();
  }

  // 1. 요청 쿠키에서 세션토큰 추출 
  let sessionToken;
  if (req.cookies.sessionToken) {
    sessionToken = req.cookies.sessionToken;
  }

  // 클라이언트가 세션토큰을 쿠키로 전달하지 않았으면 더 진행하지 않고 바로 401 에러를 반환합니다.
  if (!sessionToken) {                
    return res.status(401).json({ message: '로그인이 필요합니다.' });
  }

  try {
    // 서버 측에 저장된 헤시된 세션토큰과 비교를 위해 클라이언트가 전달한 세션토큰을 해시화
    const sessionTokenHash = hashToken(sessionToken);

    // 2. 네거티브 캐시 확인 (유효하지 않은 세션토큰인 경우 인지 판단)
    if (negativeSessionCache.isNegative(sessionTokenHash)) {
      return res.status(401).json({ message: '유효하지 않은 세션입니다 (캐시됨).' });
    }

    // 3. 세션 캐시 확인
    const cachedSession = sessionCache.get(sessionTokenHash);
    if (cachedSession) {
      // 캐시된 세션의 만료 시간 확인
      if (new Date(cachedSession.expiresAt) < new Date()) {
        sessionCache.del(sessionTokenHash); // 만료된 세션 캐시에서 제거
        // 비동기적으로 DB에서도 정확히 해당 세션만 제거
        userPrisma.session.delete({ where: { sessionTokenHash } }).catch();
        return res.status(401).json({ message: '세션이 만료되었습니다 (캐시 확인).' });
      }

      req.user = { accountId: cachedSession.accountId, sessionToken };
      // 슬라이딩 만료 처리
      return await handleSlidingExpiration(req, res, next, cachedSession.expiresAt);
    }

    // 3. DB에서 세션 조회
    const dbSession = await userPrisma.session.findUnique({
      where: { tokenHash: sessionTokenHash },
    });

    if (!dbSession) {
      negativeSessionCache.setNegative(sessionTokenHash); // 네거티브 캐시에 추가
      return res.status(401).json({ message: '세션이 존재하지 않습니다.' });
    }

    if (new Date(dbSession.expiresAt) < new Date()) {
      // DB에서 만료된 세션 삭제 (비동기)
      userPrisma.session.delete({ where: { sessionTokenHash } }).catch();
      negativeSessionCache.setNegative(sessionTokenHash);
      return res.status(401).json({ message: '세션이 만료되었습니다.' });
    }

    // --- 세션이 유효한 경우 ---
    req.user = { accountId: dbSession.accountId, sessionToken };
    const ttlSeconds = Math.floor((new Date(dbSession.expiresAt).getTime() - Date.now()) / 1000);
    if (ttlSeconds > 0) {
      sessionCache.setWithTTL(
        sessionTokenHash,
        { accountId: dbSession.accountId, expiresAt: dbSession.expiresAt },
        ttlSeconds,
      );
    }

    // 슬라이딩 만료 처리
    return await handleSlidingExpiration(req, res, next, dbSession.expiresAt);

  } catch (error) {
    console.error('인증 미들웨어 오류:', error);
    return res.status(500).json({ message: '서버 내부 오류가 발생했습니다.' });
  }
};

/**
 * 슬라이딩 만료 처리 함수
 */
async function handleSlidingExpiration(req, res, next, expiresAt) {
  const now = new Date();
  const remainingTime = new Date(expiresAt).getTime() - now.getTime();
  const renewalThreshold = RENEWAL_THRESHOLD_MINUTES * 60 * 1000;

  // 남은 시간이 임계값보다 적으면 갱신 시도
  if (remainingTime < renewalThreshold) {
    try {
      const newExpiresAt = new Date(Date.now() + SESSION_DURATION_MINUTES * 60 * 1000);
      const ttlSeconds = SESSION_DURATION_MINUTES * 60;

      // DB 업데이트
      await userPrisma.session.update({
        where: { sessionTokenHash: hashToken(req.user.sessionToken) },
        data: { expiresAt: newExpiresAt },
      });

      // 캐시 업데이트
      sessionCache.setWithTTL(
        hashToken(req.user.sessionToken),
        { accountId: req.user.accountId, expiresAt: newExpiresAt },
        ttlSeconds,
      );
      // 쿠키 재설정
      setSessionCookie(res, req.user.sessionToken);

    } catch (dbError) {
        console.error('세션 갱신 중 DB 오류:', dbError);
        // 갱신에 실패해도 일단 현재 요청은 통과시킬 수 있음
    }
  }

  return next();
}


/**
 * 관리자 권한이 필요한 API용 미들웨어
 */
const requireAdmin = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: '인증이 필요합니다.' });
  }

  const { role } = await userPrisma.account.findUnique({ where: { accountId: req.user.accountId }, select: { role: true } });

  if (role !== 'ADMIN') {
    return res.status(403).json({ message: '관리자 권한이 필요합니다.' });
  }

  next();
};

export { authMiddleware, requireAdmin };