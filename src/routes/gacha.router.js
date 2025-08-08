import express from 'express';
import { GachaController } from '../controllers/gacha.controller.js';
import { requireAdmin } from '../middleWares/auth.middleware.js';


const router = express.Router();

/* 가챠 카드 등록 (관리자) */
router.post('/admin/gacha', requireAdmin, GachaController.CreateGachaCard);

/* 가챠 카드 목록 조회 (사용자) */
router.get('/gacha', GachaController.GetGachaCards);

/* 가챠 카드 수정 (관리자) */
router.patch('/admin/gacha/:gachaId', requireAdmin, GachaController.UpdateGachaCard);

/* 가챠 카드 상세 조회 (관리자) */
router.get('/admin/gacha/:gachaId', requireAdmin, GachaController.GetGachaCardDetail);

/* 가챠 카드 삭제 (관리자) */
router.delete('/admin/gacha/:gachaId', requireAdmin, GachaController.RemonveGachaCard);

/* 가챠 뽑기 (사용자) */
router.post('/gacha/draw', GachaController.DrawGachaCard);

router.get('/gacha/admin', requireAdmin);

export default router;
