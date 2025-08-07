import express from 'express';
import { gamePrisma } from '../utils/prisma/index.js';
import {
  registGoods,
  deleteGoods,
  updateGoods,
  getGoods,
} from '../controllers/goods.controller.js';
import { requireAdmin } from './auth.router.js';

const router = express.Router();

/**상품 등록 API router(관리자)**/
router.post('/admin/goods', requireAdmin, registGoods);

/**상품 삭제 API router(관리자)**/
router.delete('/admin/goods/:goodsId', requireAdmin, deleteGoods);

/**상품 수정 API router(관리자)**/
router.patch('/admin/goods/:goodsId', requireAdmin, updateGoods);

/**상품 목록 조회  API router**/
router.get('/goods', getGoods);

export default router;
