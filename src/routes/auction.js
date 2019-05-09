import express from 'express';
import passport from 'passport';
import passportAuth from '../config/passport';
import {cloudinaryConfig } from '../config/cloudinaryConfig'

import { multerUploads} from '../middleware/multerUpload';
const router = express.Router();

// router.get('/api/v1/secret',passport.authenticate('jwt',{session:false}),User.secret);

router.use('/upload', cloudinaryConfig);

// router.post('/upload', multerUploads,Coop.uploadFile);
	
export default router;