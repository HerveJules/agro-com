import express from 'express';
import Bidder from '../controllers/bidders';
import passport from 'passport';
import passportAuth from '../config/passport';
import { multerUploads} from '../helpers/multer';
import validators from '../middleware/validations';
const router = express.Router();

router.use('/api/v1/add',validators.validateEmail);
router.use('/api/v1/add',validators.validatePassword);

router.post('/api/v1/add/bidders',Bidder.addBidder);

router.get('/api/v1/get/bidders', Bidder.fetch);
	
export default router;