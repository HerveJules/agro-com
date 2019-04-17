import express from 'express';
import User from '../controllers/user';

const router = express.Router();

router.post('/api/v1/auth/signup', User.createUser);

export default router;