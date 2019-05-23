import express from 'express';
import Bidder from '../controllers/bidders';
import passport from 'passport';
import passportAuth from '../config/passport';
import { multerUploads} from '../helpers/multer';
const router = express.Router();

router.post('/api/v1/add/bidders',multerUploads,Bidder.addBidder);
	
export default router;