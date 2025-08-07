import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userPrisma } from '../utils/prisma/index.js';

const router = express.Router();

/** 
 * 유효성 검증을 위한 정규표현식
 */
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const USER_ID_REGEX = /^[a-zA-Z0-9_]{4,20}$/; // 4-20자, 영문+숫자+언더스코어
const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // 8자 이상, 영문+숫자+특수문자

// 토큰 만료 시간 상수
const TOKEN_EXPIRY = {
  ACCESS_TOKEN: '1m',           // Access Token 수명, JWT토큰 시간 설정시 사용
  REFRESH_TOKEN: '1h',           // Refresh Token 수명  
  ACCESS_TOKEN_MS: 1 * 60 * 1000,   // 1분 (밀리초), DB 토큰 시간 설정시 사용
  REFRESH_TOKEN_MS: 60 * 60 * 1000   // 1시간 (밀리초)
};

/*
 * JWT 토큰 생성 함수
 * 
 * 입력: accountId (사용자 계정 ID)
 * 출력: { accessToken, refreshToken }
 */
const generateTokens = (accountId) => {
  const accessToken = jwt.sign(
    { accountId }, 
    process.env.ACCESS_TOKEN_SECRET, 
    { 
        header: { alg: 'HS256', typ: 'JWT' },
        expiresIn: TOKEN_EXPIRY.ACCESS_TOKEN }
  );
  
  const refreshToken = jwt.sign(
    { accountId }, 
    process.env.REFRESH_TOKEN_SECRET, 
    { 
        header: { alg: 'HS256', typ: 'JWT' },
        expiresIn: TOKEN_EXPIRY.REFRESH_TOKEN }
  );
  
  return { accessToken, refreshToken };
};

/**
 * 입력값 형식 검증용 정규표현식
 * 
 * - email: 이메일 형식 확인 (예: test@example.com)
 * - userId: 4-20자 영문/숫자/언더스코어만 허용
 * - password: 8자 이상, 영문+숫자+특수문자 포함 필수
 */
const validateInput = {
  email: (email) => EMAIL_REGEX.test(email),
  userId: (userId) => USER_ID_REGEX.test(userId),
  password: (password) => PASSWORD_REGEX.test(password)
};

/**
 * Refresh Token으로 새 access/refresh 토큰 발급, refresh 토큰은 db에 저장장
 * 
 * 입력: refreshToken (갱신용 토큰 문자열)
 * 출력: { success: true/false, tokens: {accessToken, refreshToken}, accountId: 번호, error: 에러메시지 }
 */
const validateAndRefreshTokens = async (refreshToken) => {
  try {
    // JWT 검증 및 DB 확인
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const storedToken = await userPrisma.refreshToken.findUnique({
      where: { accountId: decoded.accountId },
      select: { token: true, expiresAt: true, createdAt: true }
    });
    
    // 토큰 유효성 검사
    if (!storedToken || storedToken.token !== refreshToken) {
      return { success: false };
    }
    
    // 만료 확인 (expiresAt 우선, 없으면 createdAt 기준)
    const isExpired = storedToken.expiresAt 
      ? new Date() > new Date(storedToken.expiresAt)
      : Date.now() - new Date(storedToken.createdAt).getTime() > TOKEN_EXPIRY.REFRESH_TOKEN_MS;
      
    if (isExpired) {
      await userPrisma.refreshToken.delete({ where: { accountId: decoded.accountId } });
      return { success: false };
    }
    
    // 새 토큰 발급 및 DB 업데이트
    const newTokens = generateTokens(decoded.accountId);
    await userPrisma.refreshToken.update({
      where: { accountId: decoded.accountId },
      data: { 
        token: newTokens.refreshToken,
        expiresAt: new Date(Date.now() + TOKEN_EXPIRY.REFRESH_TOKEN_MS),
        createdAt: new Date()
      }
    });
    
    return { success: true, tokens: newTokens, accountId: decoded.accountId };
    
  } catch (error) {
    return { success: false };
  }
};

/**
 * 토큰을 안전한 쿠키로 클라이언트에 저장하는 함수 

 * 입력: res (응답 객체), accessToken, refreshToken
 * 보안: httpOnly(JS 접근 차단), secure(HTTPS만), sameSite(CSRF 방지)
 */
const setTokenCookies = (res, accessToken, refreshToken) => {
  res.cookie('accessToken', accessToken, {
    httpOnly: true,           // XSS 방지 (JavaScript 접근 차단)
    secure: process.env.NODE_ENV === 'production', // HTTPS에서만 (프로덕션)
    sameSite: 'strict',       // CSRF 방지
    maxAge: TOKEN_EXPIRY.ACCESS_TOKEN_MS
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,           // XSS 방지
    secure: process.env.NODE_ENV === 'production', // HTTPS에서만 (프로덕션)
    sameSite: 'strict',       // CSRF 방지
    maxAge: TOKEN_EXPIRY.REFRESH_TOKEN_MS
  });
};


/**
 * 인증 미들웨어 - Access Token 검증 또는 자동 갱신
 */
const authMiddleware = async (req, res, next) => {

  // 로그인 요청은 인증 미들웨어 적용 안함
  const excludedRoutes = ['/auth/login', '/auth/signup'];
  if (excludedRoutes.includes(req.path)) {
    return next(); 
  }

   try {
     const accessToken = req.cookies.accessToken;
     const refreshToken= req.cookies.refreshToken;
     
     // Access Token이 유효한 경우 - 바로 통과
     if (accessToken) {
       const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
       const account = await userPrisma.account.findUnique({
         where: { accountId: decoded.accountId },
         select: { accountId: true, userId: true, email: true, cash: true, role: true, createdAt: true }
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
     
     const refreshResult = await validateAndRefreshTokens(refreshToken);
     if (!refreshResult.success) {
       return res.status(401).json({ message: '인증이 만료되었습니다. 다시 로그인해주세요.' });
     }
     
     // 갱신 성공 - 새 토큰 설정 및 사용자 정보 조회
     setTokenCookies(res, refreshResult.tokens.accessToken, refreshResult.tokens.refreshToken);
     
     const account = await userPrisma.account.findUnique({
       where: { accountId: refreshResult.accountId },
       select: { accountId: true, userId: true, email: true, cash: true, role: true, createdAt: true }
     });
     
     if (!account) {
       return res.status(401).json({ message: '유효하지 않은 토큰입니다. 계정을 찾을 수 없습니다.' });
     }
     
     req.user = account;
     return next();
     
   } catch (error) {
     console.error('인증 미들웨어 오류:', error);
     return res.status(500).json({ message: '서버 내부 오류가 발생했습니다.' });
   }
 };

/**
 * 관리자 권한이 필요한 API용 미들웨어
 * authMiddleware 이후에 사용해야 함
 */
const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: '인증이 필요합니다.' });
  }
  
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ 
      message: '관리자 권한이 필요합니다.' 
    });
  }
  
  next();
};


/**
 * 회원가입 API
 */
router.post('/signup', async (req, res) => {
  try {
    const { userId, email, password, confirmPassword } = req.body;

    // 1-1. 입력값 존재 여부 확인
    if (!userId || !email || !password || !confirmPassword) {
      return res.status(400).json({
        message: 'userId, email, password, confirmPassword는 필수 입력값입니다.'
      });
    }

    // 1-2. 입력값 형식 검증 (정규표현식 사용)
    if (!validateInput.userId(userId)) {
      return res.status(400).json({
        message: 'userId는 4-20자의 영문, 숫자, 언더스코어만 사용 가능합니다.'
      });
    }

    if (!validateInput.email(email)) {
      return res.status(400).json({
        message: '올바른 이메일 형식이 아닙니다.'
      });
    }

    if (!validateInput.password(password)) {
      return res.status(400).json({
        message: '비밀번호는 8자 이상이며, 영문, 숫자, 특수문자를 포함해야 합니다.'
      });
    }

    // 1-3. 비밀번호 확인 검증
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: '비밀번호와 비밀번호 확인이 일치하지 않습니다.'
      });
    }

    // 1-4. 중복 확인 (userId, email 둘 다)
    const existingUser = await userPrisma.account.findFirst({
      where: {
        OR: [
          { userId: userId },
          { email: email }
        ]
      }
    });

    if (existingUser) {
      if (existingUser.userId === userId) {
        return res.status(409).json({
          message: '이미 사용 중인 userId입니다.'
        });
      }
      if (existingUser.email === email) {
        return res.status(409).json({
          message: '이미 사용 중인 email입니다.'
        });
      }
    }

    // 1-5. 비밀번호 해싱 (bcrypt 사용)
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 1-6. 계정 생성 (기본 cash: 10000)
    const newAccount = await userPrisma.account.create({
      data: {
        userId,
        email,
        password: hashedPassword,
        cash: 10000 // 기본 지급 캐시
      },
      select: {
        accountId: true,
        userId: true,
        email: true,
        cash: true,
        createdAt: true
      }
    });

    // 1-7. 회원가입 완료 응답 (토큰 발급 없이)
    res.status(201).json({
      message: '회원가입이 완료되었습니다. 로그인을 진행해주세요.',
      user: {
        accountId: newAccount.accountId,
        userId: newAccount.userId,
        email: newAccount.email,
        cash: newAccount.cash,
        createdAt: newAccount.createdAt
      }
    });

  } catch (error) {
    console.error('회원가입 에러:', error);
    res.status(500).json({
      message: '서버 내부 오류가 발생했습니다.'
    });
  }
});



/**
 * 로그인 API
 * 
 * 입력: { userId, password }
 * 출력: 200 (성공) / 400 (입력 오류) / 401 (인증 실패) / 500 (서버 오류)
 */
router.post('/login', async (req, res) => {
  try {
    const { userId, password } = req.body;

    // 2-1. 입력값 존재 여부 확인
    if (!userId || !password) {
      return res.status(400).json({
        message: 'userId와 password는 필수 입력값입니다.'
      });
    }

    // 2-2. 사용자 존재 여부 확인
    const account = await userPrisma.account.findUnique({
      where: { userId: userId },
      select: {
        accountId: true,
        userId: true,
        email: true,
        password: true,
        cash: true,
        role: true,
        createdAt: true
      }
    });

    if (!account) {
      return res.status(401).json({
        message: '존재하지 않는 userId입니다.'
      });
    }

    // 2-3. 비밀번호 검증 (bcrypt.compare 사용)
    const isPasswordValid = await bcrypt.compare(password, account.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        message: '비밀번호가 일치하지 않습니다.'
      });
    }

    // 2-4. JWT 토큰 생성
    const { accessToken, refreshToken } = generateTokens(account.accountId);

    // 2-5. 기존 Refresh Token 업데이트 (upsert 사용, 있으면 값 업데이트, 없으면 생성)
    const expiresAt = new Date(Date.now() + TOKEN_EXPIRY.REFRESH_TOKEN_MS);
    
    await userPrisma.refreshToken.upsert({
      where: { accountId: account.accountId },
      update: { 
        token: refreshToken,
        expiresAt: expiresAt,
        createdAt: new Date() // 토큰 갱신 시간 업데이트
      },
      create: {
        accountId: account.accountId,
        token: refreshToken,
        expiresAt: expiresAt
      }
    });

    // 2-6. httpOnly 쿠키로 토큰 설정
    setTokenCookies(res, accessToken, refreshToken);

    // 2-7. 응답 (토큰은 쿠키로, 사용자 정보만 JSON으로)
    const { password: _, ...userInfo } = account;
    
    res.status(200).json({
      message: '로그인이 완료되었습니다.',
      user: userInfo
    });

  } catch (error) {
    console.error('로그인 에러:', error);
    res.status(500).json({
      message: '서버 내부 오류가 발생했습니다.'
    });
  }
});
/**

/**
 * 로그아웃 API
 */
router.post('/logout', authMiddleware, async (req, res) => {
  try {
    const { accountId } = req.user;

    // 4-1. DB에서 Refresh Token 삭제
    await userPrisma.refreshToken.deleteMany({
      where: { accountId: accountId }
    });

    // 4-2. 쿠키에서 토큰들 삭제
    res.clearCookie('accessToken', {
      httpOnly: true,
      sameSite: 'strict'
    });

    res.clearCookie('refreshToken', {
      httpOnly: true,
      sameSite: 'strict'
    });

    // 4-3. 성공 응답
    res.status(200).json({
      message: '로그아웃이 완료되었습니다.'
    });

  } catch (error) {
    console.error('로그아웃 에러:', error);
    res.status(500).json({
      message: '서버 내부 오류가 발생했습니다.'
    });
  }
});

/**
 * 비밀번호 수정 API
 */
router.patch('/:accountId/password', async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    const urlAccountId = parseInt(req.params.accountId);

    // 1. 현재 비밀번호 확인
    const account = await userPrisma.account.findUnique({
      where: { accountId: urlAccountId },
      select: { password: true }
    });
    
    if (!account) {
      return res.status(404).json({
        message: '계정을 찾을 수 없습니다.'
      });
    }
    
    // 2. 권한 확인 (본인만 수정 가능)
    if (req.user.accountId !== urlAccountId) {
      return res.status(403).json({ 
        message: '본인의 비밀번호만 수정할 수 있습니다.' 
      });
    }
    
    // 3. 입력값 존재 여부 확인
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      return res.status(400).json({
        message: 'currentPassword, newPassword, confirmNewPassword는 필수 입력값입니다.'
      });
    }
    
    // 4. 새 비밀번호 형식 검증
    if (!validateInput.password(newPassword)) {
      return res.status(400).json({
        message: '새 비밀번호는 8자 이상이며, 영문, 숫자, 특수문자를 포함해야 합니다.'
      });
    }
    
    // 5. 새 비밀번호 확인 검증
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({
        message: '새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.'
      });
    }
    
    
    // 6. 현재 비밀번호 확인
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, account.password);
    if (!isCurrentPasswordValid) {
      return res.status(401).json({
        message: '현재 비밀번호가 일치하지 않습니다.'
      });
    }
    
    // 7. 새 비밀번호 해싱 및 업데이트
    const saltRounds = 12;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);
    
    await userPrisma.account.update({
      where: { accountId: urlAccountId },
      data: { password: hashedNewPassword }
    });
    
    // 8. 보안을 위해 기존 Refresh Token 삭제 
    await userPrisma.refreshToken.deleteMany({
      where: { accountId: urlAccountId }
    });
    
    // 9. 쿠키에서 토큰들 삭제
    res.clearCookie('accessToken', {
      httpOnly: true,
      sameSite: 'strict'
    });
    
    res.clearCookie('refreshToken', {
      httpOnly: true,
      sameSite: 'strict'
    });
    
    // 10. 성공 응답
    res.status(200).json({
      message: '비밀번호가 성공적으로 변경되었습니다. 보안을 위해 다시 로그인해주세요.'
    });

  } catch (error) {
    console.error('비밀번호 변경 에러:', error);
    res.status(500).json({
      message: '서버 내부 오류가 발생했습니다.'
    });
  }
});

// 미들웨어들을 다른 라우터에서도 사용할 수 있도록 export
export { authMiddleware, requireAdmin };
export default router;