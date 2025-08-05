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

/**
 * JWT 토큰 생성 유틸리티, 
 *  input: accountId
 *  output: accessToken, refreshToken
 */
const generateTokens = (accountId) => {
  const accessToken = jwt.sign(
    { accountId }, 
    process.env.ACCESS_TOKEN_SECRET, 
    { 
        header: { alg: 'HS256', typ: 'JWT' },
        expiresIn: '15m' }
  );
  
  const refreshToken = jwt.sign(
    { accountId }, 
    process.env.REFRESH_TOKEN_SECRET, 
    { 
        header: { alg: 'HS256', typ: 'JWT' },
        expiresIn: '1h' }
  );
  
  return { accessToken, refreshToken };
};

/**
 * 입력값 regex 검증 유틸리티
 */
const validateInput = {
  email: (email) => EMAIL_REGEX.test(email),
  userId: (userId) => USER_ID_REGEX.test(userId),
  password: (password) => PASSWORD_REGEX.test(password)
};

/**
 * 1. 회원가입 API
 * POST /auth/signup
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

    // 1-7. JWT 토큰 생성
    const { accessToken, refreshToken } = generateTokens(newAccount.accountId);

    // 1-8. Refresh Token을 DB에 저장
    await userPrisma.refreshToken.create({
      data: {
        accountId: newAccount.accountId,
        token: refreshToken
      }
    });

    // 1-9. httpOnly 쿠키로 토큰 설정
    res.cookie('accessToken', accessToken, {
      httpOnly: true,           // XSS 방지 (JavaScript 접근 차단)
      sameSite: 'strict',       // CSRF 방지 (다른 사이트에서 쿠키 접근해 요청 보내는 것 방지)
      maxAge: 15 * 60 * 1000   // 15분 (Access Token 수명과 동일)
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,         
      sameSite: 'strict',      
      maxAge: 60 * 60 * 1000   // 1시간 (Refresh Token 수명과 동일)
    });

    // 1-10. 응답 (토큰은 쿠키로, 사용자 정보만 JSON으로)
    res.status(201).json({
      message: '회원가입이 완료되었습니다.',
      user: newAccount
    });

  } catch (error) {
    console.error('회원가입 에러:', error);
    res.status(500).json({
      message: '서버 내부 오류가 발생했습니다.'
    });
  }
});

/**
 * 2. 로그인 API
 * POST /auth/login
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
    await userPrisma.refreshToken.upsert({
      where: { accountId: account.accountId },
      update: { 
        token: refreshToken,
        createdAt: new Date() // 토큰 갱신 시간 업데이트
      },
      create: {
        accountId: account.accountId,
        token: refreshToken
      }
    });

    // 2-6. httpOnly 쿠키로 토큰 설정
    res.cookie('accessToken', accessToken, {
      httpOnly: true,           // XSS 방지 (JavaScript 접근 차단)
      secure: process.env.NODE_ENV === 'production', // HTTPS에서만 (프로덕션)
      sameSite: 'strict',       // CSRF 방지
      maxAge: 15 * 60 * 1000   // 15분 (Access Token 수명과 동일)
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,           // XSS 방지
      secure: process.env.NODE_ENV === 'production', // HTTPS에서만 (프로덕션)
      sameSite: 'strict',       // CSRF 방지
      maxAge: 60 * 60 * 1000   // 1시간 (Refresh Token 수명과 동일)
    });

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
 * 3. JWT 토큰 검증 미들웨어 (쿠키 방식)
 * 쿠키에서 accessToken을 읽어 검증하고 req.user에 사용자 정보 (accountId, userId, email, cash, createdAt) 추가
 */
const authMiddleware = async (req, res, next) => {
    try {
      // 3-1. 쿠키에서 accessToken 확인
      const token = req.cookies.accessToken;
  
      if (!token) {
        return res.status(401).json({
          message: '로그인이 필요합니다. 접근 토큰이 없습니다.'
        });
      }
  
      // 3-2. JWT 토큰 검증
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      
      // 3-3. 사용자 정보 조회 및 req 객체에 추가
      const account = await userPrisma.account.findUnique({
        where: { accountId: decoded.accountId },
        select: {
          accountId: true,
          userId: true,
          email: true,
          cash: true,
          createdAt: true
        }
      });
  
      if (!account) {
        return res.status(401).json({
          message: '유효하지 않은 토큰입니다. 계정을 찾을 수 없습니다.'
        });
      }
  
      // 3-4. 요청 객체에 사용자 정보 추가
      req.user = account;
      next();
  
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
          message: '토큰이 만료되었습니다. 다시 로그인해주세요.'
        });
      }
      
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({
          message: '유효하지 않은 토큰입니다.'
        });
      }
  
      console.error('토큰 검증 에러:', error);
      return res.status(500).json({
        message: '서버 내부 오류가 발생했습니다.'
      });
    }
  };

export default router;