import express from 'express';
import { GameController } from '../controllers/game.controller.js';


const router = express.Router();

router.get('/game', GameController.GetSquadTeam);

export default router;