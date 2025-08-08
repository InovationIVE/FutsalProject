import express from 'express';
import { gamePrisma } from '../utils/prisma/index.js';
import { GoodsController } from '../controllers/goods.controller.js';
import { requireAdmin } from '../middleWares/auth.middleware.js';

const router = express.Router();

/**상품 등록 API router(관리자)**/
router.post('/admin/goods', requireAdmin, GoodsController.RegistGoods);

/**상품 삭제 API router(관리자)**/
router.delete('/admin/goods/:goodsId', requireAdmin, GoodsController.DeleteGoods);

/**상품 수정 API router(관리자)**/
router.patch('/admin/goods/:goodsId', requireAdmin, GoodsController.UpdateGoods);

/**상품 목록 조회  API router**/
router.get('/goods', GoodsController.GetGoods);

export default router;
