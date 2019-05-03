import express from 'express';
import User from '../controllers/user';
import Coop from '../controllers/coops';
import Bidder from '../controllers/bidders';
import passport from 'passport';
import passportAuth from '../config/passport';
import {cloudinaryConfig } from '../config/cloudinaryConfig'

import { multerUploads} from '../middleware/multerUpload';
const router = express.Router();
// store routes

router.get('/api/v1/secret',passport.authenticate('jwt',{session:false}),User.secret);

router.use('/upload', cloudinaryConfig);

router.post('/upload', multerUploads,Coop.uploadFile);
	
export default router;