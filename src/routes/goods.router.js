import express from 'express';
import { gamePrisma } from '../utils/prisma/index.js';
import { GoodsController } from '../controllers/goods.controller.js';
import { requireAdmin } from './auth.router.js';

const router = express.Router();

/**상품 등록 API router(관리자)**/
router.post('/admin/goods', requireAdmin, GoodsController.registGoods);

/**상품 삭제 API router(관리자)**/
router.delete('/admin/goods/:goodsId', requireAdmin, GoodsController.deleteGoods);

/**상품 수정 API router(관리자)**/
router.patch('/admin/goods/:goodsId', requireAdmin, GoodsController.updateGoods);

/**상품 목록 조회  API router**/
router.get('/goods', GoodsController.getGoods);

export default router;
