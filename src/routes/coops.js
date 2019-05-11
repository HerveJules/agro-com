import express from 'express';
import Coop from '../controllers/coops';
import {cloudinaryConfig } from '../config/cloudinaryConfig'
import upload from '../helpers/multer';

const router = express.Router();

router.post('/api/v1/add/coop',Coop.createCoop);

	
export default router;