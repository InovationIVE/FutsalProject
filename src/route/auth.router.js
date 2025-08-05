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

    // 1-9. 응답 (비밀번호 제외)
    res.status(201).json({
      message: '회원가입이 완료되었습니다.',
      accessToken,
      tokenType: 'Bearer',
      user: newAccount
    });

  } catch (error) {
    console.error('회원가입 에러:', error);
    res.status(500).json({
      message: '서버 내부 오류가 발생했습니다.'
    });
  }
});

export default router;