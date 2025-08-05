import express from 'express';
import { gamePrisma } from '../utils/prisma/index.js';
import { verifyToken, isAdmin } from '../middleware/authMiddleware.js';
import { registGoods } from '../controllers/goods.controller.js';

const router = express.Router();

//상품 등록 라우터
router.post('/admin/goods', verifyToken, isAdmin, registGoods);

export default router;
