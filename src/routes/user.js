import express from 'express';
import User from '../controllers/user';
import Coop from '../controllers/coops';
import validators from '../middleware/validations';
import passport from 'passport';
import passportAuth from '../config/passport';

const router = express.Router();

router.use('/api/v1/auth',validators.validatePassword);

router.use('/api/v1/auth',validators.validateEmail);


router.post('/api/v1/auth/signup', User.createUser);

router.post('/api/v1/auth/signin',User.auth);

router.post('/api/v1/add/coop',Coop.createCoop);

// router.get('/api/v1/secret',(req,res,next) =>{
// 	passport.authenticate('jwt',{session:false},User.secret);
// });

router.use('/api/v1/secret',passport.authenticate('jwt',{session:false},User.secret));
	
export default router;