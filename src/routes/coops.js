import express from 'express';
import Coop from '../controllers/coops';
import cloudinary from 'cloudinary';
import { multerUploads} from '../helpers/multer';
import {dataUri } from '../helpers/multer';
const router = express.Router();

router.post('/api/v1/add/coop',Coop.createCoop);
// update cooperative
router.post('/api/v1/update/coop',Coop.updateCoop);
// destroy cooperative
router.delete('/api/v1/delete/coop',Coop.deleteCoop);
	
export default router;