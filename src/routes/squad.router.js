import express from 'express';
import { Squad } from '../controllers/squad.controller.js';
import { getSquad } from '../controllers/squad.controller.js';

const router = express.Router();

router.post('/squad', Squad);
router.get('/squad', getSquad);

export default router;
