import express from 'express';
import { GachaController } from '../controllers/gacha.controller.js';
import { requireAdmin } from '../middleWares/auth.middleware.js';

const router = express.Router();

/* 가챠 카드 등록 */
router.post('/admin/gacha', requireAdmin ,GachaController.CreateGachaCard);

/* 가챠 카드 조회 */
router.get('/gacha', requireAdmin , GachaController.GetGachaCards);

/* 가챠 카드 수정 */
router.patch('/admin/gacha/:gachaId', requireAdmin ,GachaController.UpdateGachaCard);
  
/* 가챠 카드 상세 조회 */
router.get('/admin/gacha/:gachaId', requireAdmin ,GachaController.GetGachaCardDetail);

/* 가챠 카드 삭제 */
router.delete('/admin/gacha/:gachaId', requireAdmin ,GachaController.RemonveGachaCard);

/* 가챠 뽑기 */
router.post('/gacha/draw', GachaController.DrawGachaCard);


export default router;
