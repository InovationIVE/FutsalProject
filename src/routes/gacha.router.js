import express from 'express';
import { GachaController } from '../controller/gacha.controller.js';

const router = express.Router();

/* 가챠 카드 등록 */
router.post('/admin/gacha', GachaController.CreateGachaCard);

/* 가챠 카드 조회 */
router.get('/gacha', GachaController.GetGachaCards);

/* 가챠 카드 수정 */
router.patch('/admin/gacha/:gachaId', GachaController.UpdateGachaCard);
  
/* 가챠 카드 상세 조회 */
router.get('/admin/gacha/:gachaId', GachaController.GetGachaCardDetail);

/* 가챠 카드 삭제 */
router.delete('/admin/gacha/:gachaId', GachaController.RemonveGachaCard);

/* 가챠 뽑기 */
router.post('/gacha/draw/:accountId', GachaController.DrawGachaCard);


export default router;
