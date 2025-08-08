import jwt from 'jsonwebtoken';
import { userPrisma } from '../utils/prisma/index.js';
import { validateAndRefreshTokens, setTokenCookies } from '../controllers/auth.controller.js';

// 토큰 만료 시간 상수
const TOKEN_EXPIRY = {
  ACCESS_TOKEN: '1m', // Access Token 수명, JWT토큰 시간 설정시 사용
  REFRESH_TOKEN: '1h', // Refresh Token 수명
  ACCESS_TOKEN_MS: 1 * 60 * 1000, // 1분 (밀리초), DB 토큰 시간 설정시 사용
  REFRESH_TOKEN_MS: 60 * 60 * 1000, // 1시간 (밀리초)
};

/**
 * 인증 미들웨어 - Access Token 검증 또는 자동 갱신
 */
const authMiddleware = async (req, res, next) => {
  // 로그인 요청, 회원가입 요청은 인증 미들웨어 적용 안함
  const excludedRoutes = ['/auth/login', '/auth/signup'];

  if (excludedRoutes.includes(req.path)) {
    return next();
  }

  try {
    // 쿠키에서 토큰 조회
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    // Access Token이 유효한 경우 - 바로 통과
    if (accessToken) {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      const account = await userPrisma.account.findUnique({
        where: { accountId: decoded.accountId },
        select: {
          accountId: true,
          userId: true,
          email: true,
          cash: true,
          role: true,
          createdAt: true,
          lastLoginAt: true,
        },
      });

      if (account) {
        req.user = account;
        return next();
      }
    }

    // Access Token이 없거나 문제가 있는 경우 - Refresh Token으로 갱신
    if (!refreshToken) {
      return res.status(401).json({ message: '인증이 만료되었습니다. 다시 로그인해주세요.' });
    }

    // refreshToken 바탕으로 accessToken 갱신 및 새로운 refreshToken 발급
    const refreshResult = await validateAndRefreshTokens(refreshToken);

    if (!refreshResult.success) {
      return res.status(401).json({ message: '인증이 만료되었습니다. 다시 로그인해주세요.' });
    }

    // 갱신 성공 - 새 토큰 설정 및 사용자 정보 조회
    setTokenCookies(res, refreshResult.tokens.accessToken, refreshResult.tokens.refreshToken);

    const account = await userPrisma.account.findUnique({
      where: { accountId: refreshResult.accountId },
      select: {
        accountId: true,
        userId: true,
        email: true,
        cash: true,
        role: true,
        createdAt: true,
        lastLoginAt: true,
      },
    });

    if (!account) {
      return res
        .status(401)
        .json({ message: '유효하지 않은 토큰입니다. 계정을 찾을 수 없습니다.' });
    }

    req.user = account;
    return next();
  } catch (error) {
    console.error('인증 미들웨어 오류:', error);
    return res.status(500).json({ message: '서버 내부 오류가 발생했습니다.' });
  }
};

/**
 * 관리자 권한이 필요한 API용 미들웨어, /admin 경로에 적용
 */
const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: '인증이 필요합니다.' });
  }

  // 관리자 권한이 아닌 경우 접근 제한
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({
      message: '관리자 권한이 필요합니다.',
    });
  }

  next();
};

export { authMiddleware, requireAdmin, TOKEN_EXPIRY };
