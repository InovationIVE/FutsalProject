import express from 'express';
import { gamePrisma } from '../utils/prisma/index.js';
import { verifyToken, isAdmin } from '../middleware/authMiddleware.js';
import {
  registGoods,
  deleteGoods,
  updateGoods,
  getGoods,
} from '../controllers/goods.controller.js';

const router = express.Router();

/**상품 등록 API router(관리자)**/
router.post('/admin/goods', verifyToken, isAdmin, registGoods);

/**상품 삭제 API router(관리자)**/
router.delete('/admin/goods/:goodsId', verifyToken, isAdmin, deleteGoods);

/**상품 수정 API router(관리자)**/
router.patch('/admin/goods/:goodsId', verifyToken, isAdmin, updateGoods);

/**상품 목록 조회  API router**/
router.get('/goods', getGoods);
export default router;
