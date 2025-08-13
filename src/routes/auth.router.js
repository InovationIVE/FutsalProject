import express from 'express';
import { 
  signup, 
  login, 
  logout, 
  changePassword, 
  deleteAccount,
  getMyRole,
  sendSignupCode,
  verifySignupCode
} from '../controllers/auth.controller.js';

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
router.delete('/:accountId', deleteAccount);


/**
 * 관리자 확인 API
 */
router.get('/role', getMyRole);

export default router;
