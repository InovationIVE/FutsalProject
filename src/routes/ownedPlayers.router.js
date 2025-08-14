import express from 'express';
import { OwnedPlayersController } from '../controllers/ownedPlayers.controller.js';
const router = express.Router();

//내 선수 조회
router.get('/ownedPlayers', OwnedPlayersController.myPlayersList);

//내 선수 상세 조회
router.get('/ownedPlayers/:ownedPlayerId', OwnedPlayersController.myPlayer);

//내 선수 판매
router.post('/ownedPlayers/sales', OwnedPlayersController.playerSale);

export default router;
