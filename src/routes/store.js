import express from 'express';
import passport from 'passport';
import passportAuth from '../config/passport';
import store from '../controllers/store';

const router = express.Router();
router.post('/api/v1/add/store/:CoopId', store.addStore);
	
export default router;