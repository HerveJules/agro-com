import express from 'express';
import Bidder from '../controllers/bidders';
import passport from 'passport';
import passportAuth from '../config/passport';
import {cloudinaryConfig } from '../config/cloudinaryConfig'
const router = express.Router();

router.post('/api/v1/add/bidders',Bidder.add);
	
export default router;