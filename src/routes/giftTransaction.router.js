import express from 'express';
import giftTransactionController from '../controllers/giftTransaction.controller.js';
import { authMiddleware, requireAdmin } from '../middleWares/auth.middleware.js';

const router = express.Router();

/**상품 선물하기 API router**/
router.post('/gift/send', giftTransactionController.sendGift);

/**내가 받은 선물 조회하기 API routerI**/
router.get('/gift/received/:receiverId', giftTransactionController.getReceivedGifts);

/**전체 선물 내역 조회(관리자) API router**/
router.get(
  '/admin/gift',
  authMiddleware,
  requireAdmin,
  giftTransactionController.getAllGiftTransactions,
);

/**선물받기 API router**/
router.post('/gift/accept/:giftId', giftTransactionController.acceptGift);

export default router;
