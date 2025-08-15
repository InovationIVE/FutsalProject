import crypto from 'crypto';
import { userPrisma } from '../utils/prisma/index.js';
import { sessionCache, negativeSessionCache } from '../utils/sessionCache.js';
import { hashToken } from '../utils/token.utils.js';
import { setSessionCookie } from '../utils/cookie.utils.js';
import { SESSION_DURATION_MINUTES, RENEWAL_THRESHOLD_MINUTES } from '../constants/auth.constants.js';


/**
 * 인증 미들웨어 (전역) - 세션 토큰 검증 및 사용자 정보 주입
 */

const authMiddleware = async (req, res, next) => {
  const excludedRoutes = [
    '/auth/login',
    '/auth/signup/code',
    '/auth/signup/code/verify',
    '/auth/reset-password/link',
    '/auth/reset-password/code/verify',
    '/auth/reset-password',
    '/auth/find-id',
    '/auth/find-password',
    '/auth/reset-password-with-token',
    '/auth/find-id-by-email',
  ];

  // 인증이 필요 없는 경로는 바로 next()
  if (excludedRoutes.includes(req.path)) {
    return next();
  }

  // 1. 요청 쿠키에서 세션토큰 추출
  const sessionToken = req.cookies.sessionToken;

  // 세션토큰이 없으면 인증 불가
  if (!sessionToken) {
    return next();
  }

  try {
    // 2. 세션토큰 해시화
    const sessionTokenHash = hashToken(sessionToken);

    // 3. 네거티브 캐시(유효하지 않은 세션) 확인
    if (negativeSessionCache.isNegative(sessionTokenHash)) {
      return res.status(401).json({ message: '유효하지 않은 세션입니다 (캐시됨).' });
    }

    // 4. 세션 캐시 확인
    const cachedSession = sessionCache.get(sessionTokenHash);

    if (cachedSession) {
      // 4-1. 캐시된 세션이 만료되었는지 확인
      if (new Date(cachedSession.expiresAt) < new Date()) {
        // 만료된 세션은 캐시/DB/네거티브 캐시 처리 후 401 반환
        sessionCache.del(sessionTokenHash);
        userPrisma.session.delete({ where: { sessionTokenHash } }).catch();
        negativeSessionCache.setNegative(sessionTokenHash);
        return res.status(401).json({ message: '세션이 만료되었습니다 (캐시 확인).' });
      } else {
        // 4-2. 캐시된 세션이 유효하면 사용자 정보 주입 후 슬라이딩 만료 미들웨어로 이동
        req.user = { accountId: cachedSession.accountId, sessionToken };
        return await handleSlidingExpiration(req, res, next, cachedSession.expiresAt);
      }
    } else {
      // 5. 캐시에 없으면 DB에서 세션 조회
      const dbSession = await userPrisma.session.findUnique({
        where: { tokenHash: sessionTokenHash },
      });

      if (!dbSession) {
        // 5-1. DB에도 없으면 네거티브 캐시에 추가 후 401 반환
        negativeSessionCache.setNegative(sessionTokenHash);
        return res.status(401).json({ message: '세션이 존재하지 않습니다.' });
      } else if (new Date(dbSession.expiresAt) < new Date()) {
        // 5-2. DB 세션이 만료된 경우 DB/네거티브 캐시 처리 후 401 반환
        userPrisma.session.delete({ where: { sessionTokenHash } }).catch();
        negativeSessionCache.setNegative(sessionTokenHash);
        return res.status(401).json({ message: '세션이 만료되었습니다.' });
      } else {
        // 5-3. (서버 재시동 시 캐시에 저장된 세션이 만료되어 있는 경우) DB 세션이 유효하면면 캐시에 저장, 사용자 정보 주입, 슬라이딩 만료 처리
        req.user = { accountId: dbSession.accountId, sessionToken };
        const ttlSeconds = Math.floor(
          (new Date(dbSession.expiresAt).getTime() - Date.now()) / 1000,
        );
        if (ttlSeconds > 0) {
          sessionCache.setWithTTL(
            sessionTokenHash,
            { accountId: dbSession.accountId, expiresAt: dbSession.expiresAt },
            ttlSeconds,
          );
        }
        return await handleSlidingExpiration(req, res, next, dbSession.expiresAt);
      }
    }
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

  // 남은 시간이 임계값보다 적으면 만료시각 갱신
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
const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: '인증이 필요합니다.' });
  }

  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ message: '관리자 권한이 필요합니다.' });
  }

  next();
};

export { authMiddleware, requireAdmin };