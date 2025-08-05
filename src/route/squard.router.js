import express from 'express';
import { prisma } from '../utils/prisma/index.js';
import {myPlayersCorrection} from '../controllers/squard.controller.js';

const router = express.Router();

router.use(authMiddleware);

//내 선수 조회
router.get(myPlayersCorrection);



export default router;