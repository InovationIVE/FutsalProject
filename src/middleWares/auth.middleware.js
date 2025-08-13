import crypto from 'crypto';
import { userPrisma } from '../utils/prisma/index.js';
import { cache } from '../utils/sessionCache.js';

// --- 정책 상수 ---
export const SESSION_DURATION_MINUTES = 60;
const RENEWAL_THRESHOLD_MINUTES = 10; // 세션 만료 5분 전부터 갱신 시도

/**
 * 토큰을 해시합니다. (SHA256)
 * @param {string} token - 해시할 원본 토큰
 * @returns {string} 16진수 형식의 해시된 토큰
 */
const hashToken = (token) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};

/**
 * 인증 미들웨어 - 세션 토큰 검증 및 사용자 정보 주입
 */
const authMiddleware = async (req, res, next) => {
  const excludedRoutes = ['/auth/login', '/auth/signup', '/auth/signup/code', '/auth/signup/code/verify'];
  if (excludedRoutes.includes(req.path)) {
    return next();
  }

  // 1. 토큰 추출 (Authorization 헤더 우선, 다음으로 쿠키)
  let sessionToken;
  if (req.cookies.sessionToken) {
    sessionToken = req.cookies.sessionToken;
  }

  try {
    // 2. 네거티브 캐시 확인
    if (cache.isNegative(sessionToken)) {
      return res.status(401).json({ message: '유효하지 않은 세션입니다.' });
    }

    // 3. LRU 캐시 확인
    const cachedSession = cache.get(sessionToken);
    if (cachedSession) {
      // 캐시된 세션이 만료되었는지 확인
      if (new Date(cachedSession.expiresAt) < new Date()) {
        cache.del(sessionToken);
        // DB에서도 삭제 시도 (정합성 유지)
        await userPrisma.session.deleteMany({ where: { accountId: cachedSession.accountId } });
        return res.status(401).json({ message: '세션이 만료되었습니다.' });
      }

      // 사용자 정보 주입
      req.user = { accountId: cachedSession.accountId, sessionToken };
      // 슬라이딩 만료 처리 로직으로 이동
      return await handleSlidingExpiration(req, res, next, cachedSession.expiresAt);
    }

    // 4. DB 확인 (캐시 미스)
    const tokenHash = hashToken(sessionToken);
    const dbSession = await userPrisma.session.findUnique({
      where: { tokenHash },
      include: { account: true }, // 사용자 정보 함께 조회
    });

    // DB에 세션이 없거나 만료된 경우
    if (!dbSession || new Date(dbSession.expiresAt) < new Date()) {
      cache.setNegative(sessionToken); // 네거티브 캐시에 추가
      if (dbSession) {
        await userPrisma.session.delete({ where: { id: dbSession.id } });
      }
      return res.status(401).json({ message: '세션이 만료되었거나 유효하지 않습니다.' });
    }

    // 5. 캐시에 세션 정보 저장
    const ttlSeconds = Math.floor((new Date(dbSession.expiresAt).getTime() - Date.now()) / 1000);
    if (ttlSeconds > 0) {
        cache.set(sessionToken, { accountId: dbSession.accountId, expiresAt: dbSession.expiresAt }, ttlSeconds);
    }

    // 사용자 정보 주입
    req.user = { ...dbSession.account, sessionToken };
    delete req.user.password; // 비밀번호 정보 제거

    // 슬라이딩 만료 처리 로직으로 이동
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
      const newExpiresAt = new Date(now.getTime() + SESSION_DURATION_MINUTES * 60 * 1000);

      await userPrisma.session.updateMany({
        where: {
          accountId: req.user.accountId,
        },
        data: {
          expiresAt: newExpiresAt,
          lastUsedAt: now,
        },
      });

      // 캐시 갱신
      const ttlSeconds = Math.floor((newExpiresAt.getTime() - now.getTime()) / 1000);
      cache.set(req.user.sessionToken, { accountId: req.user.accountId, expiresAt: newExpiresAt }, ttlSeconds);

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