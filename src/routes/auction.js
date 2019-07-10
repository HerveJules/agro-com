import express from 'express';
import passport from 'passport';
import passportAuth from '../config/passport';
import Auction from '../controllers/auction';
import middlewares from '../middleware/checks';
const router = express.Router();

// router.post('/api/v1/pub/auction/:StoreId',Auction.addAuction)
router.get('/api/v1/auction/allCom',Auction.getAllCom);
router.get('/api/v1/auction/bidder',middlewares.isVerified,(req,res)=>{
	res.render('auctions-bidder',{
		user:req.user.userFind,
		role:{
						isEax:req.user.role.isEax(req.user.userFind),
						isCoop:req.user.role.isCoop(req.user.userFind),
						isBidder:req.user.role.isBidder(req.user.userFind),
					},
	})
});
router.get('/api/v1/auction/getbid/:id',Auction.getInfoAuction);
router.post('/api/v1/auction/biz',Auction.findAuction)

export default router;