import express from 'express';
import { OwnedPlayersController } from '../controllers/ownedPlayers.controller.js';
const router = express.Router();

//내 선수 조회
router.get('/ownedplayers', OwnedPlayersController.myPlayersList);

//내 선수 상세 조회
router.get('/ownedplayers/:ownedPlayerId', OwnedPlayersController.myPlayer);

//내 선수 판매
router.post('/ownedplayers/sales', OwnedPlayersController.playerSale);

export default router;
