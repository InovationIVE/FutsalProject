import express from 'express';
import { myPlayersList } from '../controllers/ownedPlayers.controller.js';
import { myPlayer } from '../controllers/ownedPlayers.controller.js';
import { playerSale } from '../controllers/ownedPlayers.controller.js';

const router = express.Router();

//내 선수 조회
router.get('/ownedplayers', myPlayersList);

//내 선수 상세 조회
router.get('/ownedplayers/:ownedPlayerId', myPlayer);

//내 선수 판매
router.post('/ownedplayers/sales', playerSale);

export default router;
