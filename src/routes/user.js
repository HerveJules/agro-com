import express from 'express';
import User from '../controllers/user';
import passport from 'passport';
import passportAuth from '../config/passport';
import { multerUploads} from '../helpers/multer';
const router = express.Router();

router.post('/api/v1/auth/signup',User.createUser);

router.post('/api/v1/auth/signin',User.auth);

router.get('/api/v1/secret',passport.authenticate('jwt',{session:false}),User.secret);
	
export default router;
