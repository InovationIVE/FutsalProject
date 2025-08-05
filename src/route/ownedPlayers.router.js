import express from 'express';
import { prisma } from '../utils/prisma/index.js';
import {myPlayersList, myPlayer} from '../controllers/ownedPlayers.controller.js';

const router = express.Router();

router.use(authMiddleware);

//내 선수 조회
router.get(myPlayersList);

//내 선수 상세 조회
router.get(myPlayer)


export default router;