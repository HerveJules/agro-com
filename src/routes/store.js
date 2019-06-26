import express from 'express';
import passport from 'passport';
import store from '../controllers/store';
import middlewares from '../middleware/checks';

const router = express.Router();
router.use('/api/v1',passport.authenticate('jwt', { session: false }));
router.use('/api/v1/store',middlewares.isAdmin,middlewares.isVerified);
router.post('/api/v1/store/:coopName', store.addStore);
router.post('/api/v1/publish/store',middlewares.isVerified,store.publish);
router.get('/api/v1/get/store',middlewares.isVerified,store.getStore);
router.put('/api/v1/store/price',store.updatePrice);
router.get('/api/v1/store/all',store.storeDetails);
router.put('/api/v1/store/mod/:StoreId',store.updateStore);
	
export default router;