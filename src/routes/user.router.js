import express from 'express';
import { getUserList, getUserDetail } from '../controllers/user.controller.js';

const router = express.Router();


/**
 * 유저저 목록 조회 API, offset pagination 적용,
 * 
 * 요청 형태 : /user/accounts?offset=0&limit=10
 */
router.get('/accounts', getUserList);

router.get('/accounts/:accountId', getUserDetail);

export default router;