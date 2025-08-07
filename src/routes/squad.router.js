import express from 'express';
import { SquadController } from '../controllers/squad.controller.js';
const router = express.Router();

router.post('/squad', SquadController.createOrUpdateSquad);
router.get('/squad', SquadController.getSquad);

export default router;
