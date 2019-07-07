import express from 'express';
import passport from 'passport';
import store from '../controllers/store';
import middlewares from '../middleware/checks';

const router = express.Router();
router.use('/api/v1',passport.authenticate('jwt', { session: false }));
router.use('/api/v1/store',middlewares.isAdmin,middlewares.isVerified);
router.post('/api/v1/store', store.addStore);
router.post('/api/v1/publish/store',middlewares.isVerified,store.publish);
router.get('/api/v1/get/store',middlewares.isVerified,store.getStore);
router.post('/api/v1/store/price',store.updatePrice);
// route to get all store and station
router.get('/api/v1/store/all',store.storeDetails);
router.put('/api/v1/store/mod',store.updateStore);
// route to get add store page
router.get('/api/v1/store/add',store.storeAddPage);
// route to get edit store page
router.get('/api/v1/store/modPage',store.storeEditPage);
// route to get delete store page
router.get('/api/v1/store/del',(req,res)=>{
	res.render('del-store',{
		user:req.user.userFind
	})
})
// route to get info whose to delete
router.post('/api/v1/store/remove',store.getDelInfo);
// route to open updates page
router.get('/api/v1/store/upts/price',(req,res)=>{
	res.render('Update',{
		user:req.user.userFind
	})
})

export default router;