import express from 'express';
import { AuctionController } from '../controllers/auction.controller.js';

const router = express.Router();

router.post('/auction', AuctionController.createAuction);


export default router;