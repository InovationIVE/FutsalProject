import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { userPrisma } from '../utils/prisma/index.js';
import { validateInput } from '../utils/validation.js';
import { cache } from '../utils/sessionCache.js';
import { SESSION_DURATION_MINUTES } from '../middleWares/auth.middleware.js';

/**
 * 안전한 랜덤 토큰을 생성합니다.
 * @returns {string} 16진수 형식의 토큰
 */
const generateSessionToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

/**
 * 토큰을 해시합니다. (SHA256)
 * @param {string} token - 해시할 원본 토큰
 * @returns {string} 16진수 형식의 해시된 토큰
 */
const hashToken = (token) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};

/**
 * 세션 토큰을 안전한 쿠키로 클라이언트에 저장하는 함수
 * @param {object} res - Express 응답 객체
 * @param {string} token - 세션 토큰
 */
const setSessionCookie = (res, token) => {
  res.cookie('sessionToken', token, {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: SESSION_DURATION_MINUTES * 60 * 1000, // 쿠키 만료는 세션 만료와 동기화
  });
};

/**
 * 회원가입 컨트롤러
 */
const signup = async (req, res) => {
  try {
    const { userId, email, password, confirmPassword } = req.body;

    if (!userId || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: '모든 필드를 입력해주세요.' });
    }
    if (!validateInput.userId(userId)) {
      return res.status(400).json({ message: 'userId는 4-20자의 영문, 숫자, 언더스코어만 사용 가능합니다.' });
    }
    if (!validateInput.email(email)) {
      return res.status(400).json({ message: '올바른 이메일 형식이 아닙니다.' });
    }
    if (!validateInput.password(password)) {
      return res.status(400).json({ message: '비밀번호는 8자 이상이며, 영문, 숫자, 특수문자를 포함해야 합니다.' });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: '비밀번호가 일치하지 않습니다.' });
    }

    const existingUser = await userPrisma.account.findFirst({
      where: { OR: [{ userId }, { email }] },
    });

    if (existingUser) {
      return res.status(409).json({ message: '이미 사용 중인 userId 또는 email입니다.' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newAccount = await userPrisma.account.create({
      data: {
        userId,
        email,
        password: hashedPassword,
        cash: 10000,
      },
      select: { accountId: true, userId: true, email: true, cash: true, createdAt: true },
    });

    res.status(201).json({
      message: '회원가입이 완료되었습니다. 로그인을 진행해주세요.',
      user: newAccount,
    });
  } catch (error) {
    console.error('회원가입 에러:', error);
    res.status(500).json({ message: '서버 내부 오류가 발생했습니다.' });
  }
};

/**
 * 로그인 컨트롤러
 */
const login = async (req, res) => {
  try {
    const { userId, password } = req.body;

    if (!userId || !password) {
      return res.status(400).json({ message: 'userId와 password는 필수 입력값입니다.' });
    }

    const account = await userPrisma.account.findUnique({
      where: { userId },
    });

    if (!account || !(await bcrypt.compare(password, account.password))) {
      return res.status(401).json({ message: 'userId 또는 비밀번호가 올바르지 않습니다.' });
    }

    const sessionToken = generateSessionToken();
    const tokenHash = hashToken(sessionToken);
    const expiresAt = new Date(Date.now() + SESSION_DURATION_MINUTES * 60 * 1000);

    // 트랜잭션으로 동시 로그인 처리 및 세션 생성
    await userPrisma.$transaction(async (tx) => {
      // 기존 세션 무효화 (UPSERT 사용)
      await tx.session.upsert({
        where: { accountId: account.accountId },
        update: {
          tokenHash,
          expiresAt,
        },
        create: {
          accountId: account.accountId,
          tokenHash,
          expiresAt,
        },
      });

      // 마지막 로그인 시간 업데이트
      await tx.account.update({
        where: { accountId: account.accountId },
        data: { lastLoginAt: new Date() },
      });
    });

    // LRU 캐시에 세션 저장
    const ttlSeconds = Math.floor((expiresAt.getTime() - Date.now()) / 1000);
    cache.set(sessionToken, { accountId: account.accountId, expiresAt }, ttlSeconds);

    setSessionCookie(res, sessionToken);

    const { password: _, ...userInfo } = account;
    res.status(200).json({
      message: '로그인이 완료되었습니다.',
      user: userInfo,
    });
  } catch (error) {
    console.error('로그인 에러:', error);
    res.status(500).json({ message: '서버 내부 오류가 발생했습니다.' });
  }
};

/**
 * 로그아웃 컨트롤러
 */
const logout = async (req, res) => {
  try {
    const { sessionToken, accountId } = req.user; // authMiddleware에서 주입

    // DB에서 세션 삭제
    await userPrisma.session.deleteMany({
      where: { accountId },
    });

    // 캐시에서 세션 삭제
    cache.del(sessionToken);

    // 쿠키 삭제
    res.clearCookie('sessionToken');

    res.status(200).json({ message: '로그아웃이 완료되었습니다.' });
  } catch (error) {
    console.error('로그아웃 에러:', error);
    res.status(500).json({ message: '서버 내부 오류가 발생했습니다.' });
  }
};

/**
 * 비밀번호 수정 컨트롤러
 */
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    const { accountId } = req.user;

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      return res.status(400).json({ message: '모든 비밀번호 필드를 입력해야 합니다.' });
    }
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ message: '새 비밀번호와 확인 비밀번호가 일치하지 않습니다.' });
    }
    if (!validateInput.password(newPassword)) {
      return res.status(400).json({ message: '새 비밀번호는 8자 이상이며, 영문, 숫자, 특수문자를 포함해야 합니다.' });
    }

    const account = await userPrisma.account.findUnique({ where: { accountId } });

    if (!(await bcrypt.compare(currentPassword, account.password))) {
      return res.status(401).json({ message: '현재 비밀번호가 일치하지 않습니다.' });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 12);

    // 트랜잭션으로 비밀번호 변경 및 모든 세션 무효화
    await userPrisma.$transaction(async (tx) => {
      await tx.account.update({
        where: { accountId },
        data: { password: hashedNewPassword },
      });
      // 보안을 위해 모든 세션 삭제
      await tx.session.deleteMany({ where: { accountId } });
    });

    // 캐시에서 현재 세션 삭제 및 쿠키 클리어
    if (account.sessionToken) {
        cache.del(account.sessionToken);
    }
    res.clearCookie('sessionToken');

    res.status(200).json({ message: '비밀번호가 성공적으로 변경되었습니다. 보안을 위해 다시 로그인해주세요.' });
  } catch (error) {
    console.error('비밀번호 변경 에러:', error);
    res.status(500).json({ message: '서버 내부 오류가 발생했습니다.' });
  }
};

/**
 * 회원 탈퇴 컨트롤러
 */
const deleteAccount = async (req, res) => {
  try {
    const { accountId } = req.user;

    // onDelete: Cascade 설정으로 계정 삭제 시 관련 세션도 자동 삭제됨
    await userPrisma.account.delete({ where: { accountId } });

    if (req.user.sessionToken) {
        cache.del(req.user.sessionToken);
    }
    res.clearCookie('sessionToken');

    res.status(200).json({ message: '회원 탈퇴가 완료되었습니다.' });
  } catch (error) {
    console.error('회원 탈퇴 에러:', error);
    res.status(500).json({ message: '서버 내부 오류가 발생했습니다.' });
  }
};

/**
 * auth/role 컨트롤러: 현재 로그인한 사용자 역할 조회
 */
const getMyRole = async (req, res) => {
  try {
    res.status(200).json({ role: req.user.role });
  } catch (error) {
    console.error('getMyRole 에러:', error);
    res.status(500).json({ message: '서버 내부 오류가 발생했습니다.' });
  }
};

export {
  signup,
  login,
  logout,
  changePassword,
  deleteAccount,
  getMyRole,
};