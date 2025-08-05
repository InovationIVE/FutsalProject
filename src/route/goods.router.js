import express from 'express';
import { gamePrisma } from '../utils/prisma/index.js';
import { verifyToken, isAdmin } from '../middleware/authMiddleware.js';
import { registGoods, deleteGoods, updateGoods } from '../controllers/goods.controller.js';

const router = express.Router();

//상품 등록 API router
router.post('/admin/goods', verifyToken, isAdmin, registGoods);

//상품 삭제 API router
router.delete('/admin/goods/:goodsId', verifyToken, isAdmin, deleteGoods);

//상품 수정 API router
router.patch('/admin/goods/:goodsId', verifyToken, isAdmin, updateGoods);

export default router;
