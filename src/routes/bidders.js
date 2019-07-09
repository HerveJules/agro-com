import express from 'express';
import Bidder from '../controllers/bidders';
import passport from 'passport';
import validators from '../middleware/validations';
import middlewares from '../middleware/checks';

const router = express.Router();
router.use('/api/v1',passport.authenticate('jwt', { session: false }));
router.use('/api/v1/bidders',middlewares.isAdmin,middlewares.isVerified)
router.post('/api/v1/add/bidder',Bidder.addBidder);

router.get('/api/v1/edit/bidder', Bidder.edit);

// route to get all bidders company
router.get('/api/v1/bidders/all',Bidder.getAll);
// route to get to delete company page
router.get('/api/v1/bidders/Del',(req,res)=>{
	res.render('del-company',{
		user:req.user.userFind,
		role:{
			isEax:req.user.role.isEax(req.user.userFind),
			isCoop:req.user.role.isCoop(req.user.userFind),
			isBidder:req.user.role.isBidder(req.user.userFind),
		},
		
	})
})
// route to delete a company
router.post('/api/v1/bidders/remove/:tin',Bidder.DestroyBidder);
// route to get info for destroying
router.post('/api/v1/bidders/infoDel',Bidder.getInfoDel);
// route to get add company info page
router.get('/api/v1/add',(req,res)=>{
	res.render('add-comp',{
		user:req.user.userFind,
		role:{
			isEax:req.user.role.isEax(req.user.userFind),
			isCoop:req.user.role.isCoop(req.user.userFind),
			isBidder:req.user.role.isBidder(req.user.userFind),
		},
	})
})
// route to get to bidding
router.get('/api/v1/bidders/bid',(req,res)=>{
	res.render('bid',{
		user:req.user.userFind,
		role:{
			isEax:req.user.role.isEax(req.user.userFind),
			isCoop:req.user.role.isCoop(req.user.userFind),
			isBidder:req.user.role.isBidder(req.user.userFind),
		},
	})
})
	
export default router;