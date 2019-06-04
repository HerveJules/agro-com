import express from 'express';
import User from '../controllers/user';
import passport from 'passport';
// import passportAuth from '../config/passport';
import { multerUploads} from '../helpers/multer';
import validators from '../middleware/validations';
const router = express.Router();

router.use('/api/v1/auth',validators.validateEmail);
router.use('/api/v1/add',validators.validatePassword);

router.post('/api/v1/auth/signup',User.createUser);

router.post('/api/v1/auth/signin',User.auth);

	
export default router;
