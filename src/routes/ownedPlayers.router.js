import express from 'express';
import { myPlayersList } from '../controllers/ownedPlayers.controller.js';
import { myPlayer } from '../controllers/ownedPlayers.controller.js';
import authMiddleware from '../middleWares/auth.middleware.js';

const router = express.Router();

router.use(authMiddleware);

//내 선수 조회
router.get('/players', myPlayersList);

//내 선수 상세 조회
router.get('/players/:ownedPlayerId', myPlayer)


export default router;