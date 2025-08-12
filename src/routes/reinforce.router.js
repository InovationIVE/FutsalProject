import express from 'express';

import { ReinforceController } from '../controllers/reinforce.controller.js';

import { requireAdmin } from '../middleWares/auth.middleware.js';

const router = express.Router();

/** 강화 **/
//router.patch('/reinforce/:ownedplayerId', ReinforceController.reinforce);


/** 강화 조회 **/
router.get('/admin/reinforce', requireAdmin, ReinforceController.getAllReinforcements);

/** 강화 상세 조회 **/
router.get('/admin/reinforce/:reinforceId', requireAdmin, ReinforceController.getTheReinforcement);

/** 강화 등록 **/
router.post('/admin/reinforce', requireAdmin, ReinforceController.createReinforcement);

/** 강화 수정 **/
router.patch('/admin/reinforce/:reinforceId', requireAdmin, ReinforceController.updateReinforcement);

/** 강화 삭제 **/
router.delete('/admin/reinforce/:reinforceId', requireAdmin, ReinforceController.deleteReinforcement);

export default router;