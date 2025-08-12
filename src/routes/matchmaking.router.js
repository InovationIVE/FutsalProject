import express from 'express';
import matchmakingController from '../controllers/matchmaking.controller.js';

const router = express.Router();

router.post('/join', matchmakingController.joinMatchmaking);

module.exports = router;
