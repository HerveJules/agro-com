import express from 'express';
import passport from 'passport';
import passportAuth from '../config/passport';
import Auction from '../controllers/auction';
const router = express.Router();

// router.post('/api/v1/pub/auction/:StoreId',Auction.addAuction)
router.get('/api/v1/auction/allCom',Auction.getAllCom);

export default router;