import express from 'express';
import Coop from '../controllers/coops';
import cloudinary from 'cloudinary';
import { multerUploads} from '../helpers/multer';
import {dataUri } from '../helpers/multer';
const router = express.Router();

router.post('/api/v1/add/coop',multerUploads,Coop.createCoop);
	
export default router;