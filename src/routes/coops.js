import express from 'express';
import Coop from '../controllers/coops';
import cloudinary from 'cloudinary';
import { multerUploads} from '../helpers/multer';
import {dataUri } from '../helpers/multer';
import validators from '../middleware/validations';
import passport from 'passport';
import middlewares from '../middleware/checks';
const router = express.Router();

router.use('/api/v1/coop',passport.authenticate('jwt',{session:false}));

router.use('/api/v1/coop/ops/',middlewares.isAdmin,middlewares.isVerified);

router.post('/api/v1/coop',Coop.createCoop);
// update cooperative
router.put('/api/v1/coop/ops/update',Coop.updateCoop);
// destroy cooperative
router.delete('/api/v1/coop/ops/del',Coop.deleteCoop);
// get cooperatives
router.get('/api/v1/coop/ops/fetch',Coop.getCoops);
	
export default router;