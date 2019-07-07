import express from 'express';
import Bidder from '../controllers/bidders';
import passport from 'passport';
import validators from '../middleware/validations';
const router = express.Router();
router.use('/api/v1',passport.authenticate('jwt', { session: false }));
router.post('/api/v1/add/bidder',Bidder.addBidder);

router.get('/api/v1/edit/bidder', Bidder.edit);

// route to get all bidders company
router.get('/api/v1/bidders/all',Bidder.getAll);
// route to get to delete company page
router.get('/api/v1/bidders/Del',(req,res)=>{
	res.render('del-company',{
		user:req.user.userFind,
	})
})
// route to delete a company
router.post('/api/v1/bidder/remove/:tin',Bidder.DestroyBidder);
// route to get info for destroying
router.post('/api/v1/bidders/infoDel',Bidder.getInfoDel);
	
export default router;