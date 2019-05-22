import express from 'express';
import passport from 'passport';
import passportAuth from '../config/passport';
import store from '../controllers/store';
import { multerUploads} from '../helpers/multer';

const router = express.Router();
router.post('/upload', multerUploads,store.addStore);
	
export default router;