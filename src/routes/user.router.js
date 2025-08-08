import express from 'express';
import { getUserList, getUserDetail, chargeCash } from '../controllers/user.controller.js';

const router = express.Router();

/**
 * 유저저 목록 조회 API, offset pagination 적용,
 *
 * 요청 형태 : /api/users?offset=0&limit=10
 */
router.get('/users', getUserList);

/**
 * 유저 상세 조회 API, 유저 상세 정보 조회
 *
 * 요청 형태 : /api/users/:accountId
 */
router.get('/users/:accountId', getUserDetail);

/**
 * 캐시 충전 API, 캐시 충전 및및 캐시 충전 후 잔액 조회
 *
 * 요청 형태 : /api/users/:accountId/cash
 */
router.post('/users/:accountId/cash', chargeCash);

export default router;
