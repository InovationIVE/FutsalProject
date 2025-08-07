import express from 'express';
import { PlayerController } from '../controllers/player.controller.js';
import { requireAdmin } from '../middleWares/auth.middleware.js';

const router = express.Router();

/** 전체 선수 목록 조회 **/
router.get('/players', PlayerController.getAllPlayers);

/** 특정 선수 정보 조회 ( 상세 조회 ) **/
router.get('/players/:playerId', PlayerController.getThePlayer);

/** 선수 등록 **/
router.post('/admin/players', requireAdmin, PlayerController.createPlayer);

/** 선수 수정 **/
router.patch('/admin/players/:playerId', requireAdmin, PlayerController.updatePlayer);

/** 선수 삭제 **/
router.delete('/admin/players/:playerId', requireAdmin, PlayerController.deletePlayer);

export default router;