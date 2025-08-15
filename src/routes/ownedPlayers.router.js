import express from 'express';
import { OwnedPlayersController } from '../controllers/ownedPlayers.controller.js';
import { authMiddleware } from '../middleWares/auth.middleware.js';

const router = express.Router();

//내 선수 조회
router.get('/ownedPlayers', authMiddleware, OwnedPlayersController.myPlayersList);

//내 선수 상세 조회
router.get('/ownedPlayers/:ownedPlayerId', authMiddleware, OwnedPlayersController.myPlayer);

//내 선수 판매
router.post('/ownedPlayers/sales', authMiddleware, OwnedPlayersController.playerSale);

export default router;
