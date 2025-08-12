import express from 'express';
import { AuctionController } from '../controllers/auction.controller.js';

const router = express.Router();

router.post('/auction', AuctionController.createAuction);
router.get('/auctions', AuctionController.getAuctions);
router.get('/auctions/:auctionId', AuctionController.getAuctionDetails);


export default router;