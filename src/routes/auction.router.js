import express from 'express';
import { AuctionController } from '../controllers/auction.controller.js';

const router = express.Router();

router.post('/auction', AuctionController.createAuction);
router.get('/auctions/myAuction', AuctionController.getMyAuctions);
router.get('/auctions', AuctionController.getAuctions);
router.get('/auctions/:auctionId', AuctionController.getAuctionDetails);
router.post('/auctions/:auctionId/bid', AuctionController.placeBid);
router.patch('/auctions/:auctionId/end', AuctionController.endAuction);



export default router;