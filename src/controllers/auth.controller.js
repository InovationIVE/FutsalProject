import { mailer } from '../utils/mailer.js';
import { verificationCache } from '../utils/verificationCache.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { userPrisma } from '../utils/prisma/index.js';
import { validateInput } from '../utils/validation.js';
import { cache } from '../utils/sessionCache.js';
import { SESSION_DURATION_MINUTES } from '../middleWares/auth.middleware.js';

const VERIFICATION_MINUTES = 5;

/**
 * 안전한 랜덤 토큰을 생성합니다.
 * @returns {string} 16진수 형식의 토큰
 */

const sha256 = (v) => crypto.createHash('sha256').update(String(v)).digest('hex');
const generateMailCode = () => String(Math.floor(100000 + Math.random() * 900000)); // 6자리 랜덤 코드
const generateRandomToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

const sessionCookieOptions = {
  httpOnly: true,
  sameSite: 'strict',
  maxAge: SESSION_DURATION_MINUTES * 60 * 1000, // 쿠키 만료는 세션 만료와 동기화
};

const verificationCookieOptions = {
  httpOnly: true,
  sameSite: 'strict',
  maxAge: VERIFICATION_MINUTES * 60 * 1000, 
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
  res.cookie('sessionToken', token, sessionCookieOptions);
};

/**
 * 회원가입 코드 전송
 */
const sendSignupCode = async (req, res) => {
  try {
    let { email, userId, password, confirmPassword } = req.body;

    if (!userId || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: '모든 필드를 입력해주세요.' });
    }
    if (!validateInput.userId(userId)) {
      return res
        .status(400)
        .json({ message: 'userId는 4-20자의 영문, 숫자, 언더스코어만 사용 가능합니다.' });
    }
    if (!validateInput.email(email)) {
      return res.status(400).json({ message: '올바른 이메일 형식이 아닙니다.' });
    }
    if (!validateInput.password(password)) {
      return res
        .status(400)
        .json({ message: '비밀번호는 8자 이상이며, 영문, 숫자, 특수문자를 포함해야 합니다.' });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: '비밀번호가 일치하지 않습니다.' });
    }

    const exists = await userPrisma.account.findFirst({
      where: { OR: [{ email }, { userId }] },
    });
    if (exists) return res.status(409).json({ message: '이미 가입된 이메일/아이디' });

    const verificationToken = generateRandomToken();
    const cached = verificationCache.get(verificationToken);

    const now = Date.now();
    // 이메일 인증 코드 재전송 제한
    if (cached && cached.resendAt && cached.resendAt > now) {
      const wait = Math.ceil((cached.resendAt - now) / 1000);
      return res.status(429).json({ message: `잠시 후 재시도 (${wait}s)` });
    }

    // 인증 코드 생성
    const code = generateMailCode();
    const codeHash = sha256(code);

    // 비밀번호 해시
    const passwordHash = await bcrypt.hash(password, 12);

    // 인증 코드 포함 생성할 계정 정보 캐시 저장
    verificationCache.set(verificationToken, {
      email,
      userId,
      passwordHash,
      codeHash,
      attempts: 0,
      resendAt: now + 60 * 1000, // 60초 후 재전송 가능
    });

    // 인증 코드 이메일 전송
    await mailer.sendMail({
      to: email,
      from: process.env.NODEMAILER_USER,
      subject: '[Futsal] 회원가입 인증코드',
      html: `
    <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px; background-color: #fafafa;">
      <h2 style="color: #333; text-align: center;">⚽ Futsal 회원가입 인증</h2>
      <p style="font-size: 15px; color: #555;">
        안녕하세요!<br/>
        아래의 <strong style="color: #000;">인증코드</strong>를 회원가입 화면에 입력해주세요.
      </p>
      <div style="margin: 20px 0; padding: 15px; text-align: center; background: #f0f4ff; border-radius: 6px; font-size: 24px; font-weight: bold; letter-spacing: 4px; color: #2b3a67;">
        ${code}
      </div>
      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
      <p style="font-size: 12px; color: #999; text-align: center;">
        본 메일은 발신전용입니다.<br/>
        잘못 수신하셨다면 죄송합니다;;
      </p>
    </div>
  `,
    });

    res.cookie('verificationToken', verificationToken, verificationCookieOptions);

    return res.status(200).json({ message: '인증코드를 이메일로 전송했습니다(유효 5분).' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: '메일 전송 실패' });
  }
};

/**
 * 회원가입 코드 인증
 */
const verifySignupCode = async (req, res) => {
  try {
    const { code } = req.body;
    const { verificationToken } = req.cookies;

    if (!verificationToken) {
      return res.status(401).json({ message: '인증 토큰이 없습니다. 다시 시도해주세요.' });
    }
    if (!code) {
      return res.status(400).json({ message: '인증코드를 입력해주세요.' });
    }

    const cached = verificationCache.get(verificationToken);
    if (!cached) return res.status(410).json({ message: '인증 세션 만료. 다시 요청하세요.' });

    if (cached.attempts >= 5) {
      verificationCache.delete(verificationToken);
      res.clearCookie('verificationToken', verificationCookieOptions);
      return res.status(429).json({ message: '시도 횟수 초과. 다시 진행하세요.' });
    }

    if (sha256(code) !== cached.codeHash) {
      cached.attempts += 1;
      verificationCache.set(verificationToken, cached);
      return res.status(401).json({ message: '인증코드가 올바르지 않습니다.' });
    }

    // DB 트랜잭션: 계정 생성 + 세션 생성
    const result = await userPrisma.$transaction(async (tx) => {
      const account = await tx.account.create({
        data: {
          userId: cached.userId,
          email: cached.email,
          password: cached.passwordHash,
          role: 'USER',
          cash: 10000,
        },
        select: {
          accountId: true,
          userId: true,
          email: true,
          role: true,
          cash: true,
          createdAt: true,
        },
      });

      const sessionToken = generateRandomToken();
      const tokenHash = sha256(sessionToken);
      const expiresAt = new Date(Date.now() + SESSION_DURATION_MINUTES * 60 * 1000);

      await tx.session.upsert({
        where: { accountId: account.accountId },
        update: { tokenHash, expiresAt },
        create: { accountId: account.accountId, tokenHash, expiresAt },
      });

      await tx.account.update({
        where: { accountId: account.accountId },
        data: { lastLoginAt: new Date() },
      });

      const ttlSeconds = Math.floor((expiresAt.getTime() - Date.now()) / 1000);
      cache.set(sessionToken, { accountId: account.accountId, expiresAt }, ttlSeconds);

      return { account, sessionToken };
    });

    setSessionCookie(res, result.sessionToken);
    verificationCache.delete(verificationToken);
    res.clearCookie('verificationToken', verificationCookieOptions);

    return res.status(201).json({
      message: '회원가입 및 로그인 완료',
      user: result.account,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: '가입/로그인 처리 실패' });
  }
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
      return res
        .status(400)
        .json({ message: 'userId는 4-20자의 영문, 숫자, 언더스코어만 사용 가능합니다.' });
    }
    if (!validateInput.email(email)) {
      return res.status(400).json({ message: '올바른 이메일 형식이 아닙니다.' });
    }
    if (!validateInput.password(password)) {
      return res
        .status(400)
        .json({ message: '비밀번호는 8자 이상이며, 영문, 숫자, 특수문자를 포함해야 합니다.' });
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
        role: 'USER',
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

    const sessionToken = generateRandomToken();
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
    res.clearCookie('sessionToken', sessionCookieOptions);

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
      return res
        .status(400)
        .json({ message: '새 비밀번호는 8자 이상이며, 영문, 숫자, 특수문자를 포함해야 합니다.' });
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
    if (req.user.sessionToken) {
      cache.del(req.user.sessionToken);
    }
    res.clearCookie('sessionToken', sessionCookieOptions);

    res
      .status(200)
      .json({ message: '비밀번호가 성공적으로 변경되었습니다. 보안을 위해 다시 로그인해주세요.' });
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
    res.clearCookie('sessionToken', sessionCookieOptions);

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
    const { role } = await userPrisma.account.findUnique({
      where: { accountId: req.user.accountId },
      select: { role: true },
    });
    res.status(200).json({ role });
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
  sendSignupCode,
  verifySignupCode,
};
