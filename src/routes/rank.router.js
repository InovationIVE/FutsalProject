import express from 'express';
import { RankController } from '../controllers/rank.controller.js';


const router = express.Router();

router.post('/rank', RankController.createRank);

router.get('/rank', RankController.getRank);

export default router;

