import express from 'express';
import User from '../controllers/user';
import validators from '../middleware/validations';

const router = express.Router();

router.use('/api/v1/auth',validators.validatePassword);

router.use('/api/v1/auth',validators.validateEmail);


router.post('/api/v1/auth/signup', User.createUser);

router.post('/api/v1/auth/signin',User.auth);

export default router;