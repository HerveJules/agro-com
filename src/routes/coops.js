import express from 'express';
import Coop from '../controllers/coops';
import {cloudinaryConfig } from '../config/cloudinaryConfig'
import { multerUploads} from '../middleware/multerUpload';
const router = express.Router();

router.post('/api/v1/add/coop',Coop.createCoop);

router.use('/upload', cloudinaryConfig);

router.post('/api/v1/upload', multerUploads,Coop.uploadFile);
	
export default router;