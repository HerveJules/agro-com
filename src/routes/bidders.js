import express from 'express';
import Bidder from '../controllers/bidders';
import passport from 'passport';
import passportAuth from '../config/passport';
import { multerUploads} from '../helpers/multer';
const router = express.Router();

router.post('/api/v1/add/bidders',Bidder.addBidder);

router.get('/api/v1/get/bidders', Bidder.fetch);
	
export default router;