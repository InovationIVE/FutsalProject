import express from 'express';
import { 
  signup, 
  login, 
  logout, 
  changePassword, 
  deleteAccount 
} from '../controllers/auth.controller.js';

const router = express.Router();

/**
 * 회원가입 API
 */
router.post('/signup', signup);

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

export default router;
