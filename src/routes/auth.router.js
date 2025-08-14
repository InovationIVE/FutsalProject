import express from 'express';
import {
  //signup,
  login,
  logout,
  changePassword,
  deleteAccount,
  getMyRole,
  sendSignupCode,
  verifySignupCode,
  sendPasswordResetLink,
  resetPasswordWithToken,
  findUserIdByEmail,
} from '../controllers/auth.controller.js';
import { authMiddleware } from '../middleWares/auth.middleware.js';

const router = express.Router();

/**
 * 회원가입 API
 */
// router.post('/signup', signup); email 인증 없이 직접 가입 (outdated)
router.post('/signup/code', sendSignupCode);
router.post('/signup/code/verify', verifySignupCode);

/**
 * 로그인 API
 */
router.post('/login', login);

/**
 * 아이디 찾기 (이메일)
 */
router.post('/find-id', findUserIdByEmail);

/**
 * 비밀번호 재설정 (매직 링크 방식)
 */
// 1. 매직 링크 발송 요청
router.post('/reset-password/link', sendPasswordResetLink);
// 2. 링크의 토큰과 새 비밀번호로 최종 변경
router.patch('/reset-password-with-token', resetPasswordWithToken);


// --- 아래부터는 인증이 필요한 API ---
router.use(authMiddleware);

/**
 * 로그아웃 API
 */
router.post('/logout', logout);

/**
 * 비밀번호 수정 API
 */
router.patch('/:accountId/password', changePassword);

/**
 * 회원 탈퇴 API
 */
router.delete('/delete/:accountId', deleteAccount);

/**
 * 내 역할 조회 API (ex. 관리자 확인)
 */
router.get('/role', getMyRole);

export default router;
