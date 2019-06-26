import express from 'express';
import Bidder from '../controllers/bidders';
import passport from 'passport';
import validators from '../middleware/validations';
const router = express.Router();
router.use('/api/v1',passport.authenticate('jwt', { session: false }));
router.post('/api/v1/add/bidder',Bidder.addBidder);

router.get('/api/v1/edit/bidder', Bidder.edit);
	
export default router;