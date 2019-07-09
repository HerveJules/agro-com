import express from 'express';
import Coop from '../controllers/coops';
import validators from '../middleware/validations';
import passport from 'passport';
import middlewares from '../middleware/checks';
import cookieParser from 'cookie-parser';
const router = express.Router();

router.use(cookieParser());
router.use('/',function(req, res, next) {  
    req.headers['Authorization'] = req.cookies["Authorization"]
    next();
})

router.use('/api/v1/coop',passport.authenticate('jwt',{session:false}));

router.use('/api/v1/coop/ops/',middlewares.isAdmin,middlewares.isVerified);

router.post('/api/v1/coop/createCoop',Coop.createCoop);
// update cooperative
router.put('/api/v1/coop/ops/update',Coop.updateCoop);
// destroy cooperative
router.post('/api/v1/coop/ops/del/:tin/:coopName',Coop.deleteCoop);
// get cooperatives
router.get('/api/v1/coop/ops/fetch',Coop.getCoops);
// route to get cooperative delete page
router.get('/api/v1/coop/ops/remove',(req,res)=>{
	res.render('del-coop',{
		user:req.user.userFind,
		role:{
			isEax:req.user.role.isEax(req.user.userFind),
			isCoop:req.user.role.isCoop(req.user.userFind),
			isBidder:req.user.role.isBidder(req.user.userFind),
		}
	});
})
// route to get info of coop to delete
router.post('/api/v1/coop/ops/info',Coop.getDelInfo);

router.get('/api/v1/coop/add',(req,res)=>{
	res.render('add-coop',{
		user:req.user.userFind,
		role:{
			isEax:req.user.role.isEax(req.user.userFind),
			isCoop:req.user.role.isCoop(req.user.userFind),
			isBidder:req.user.role.isBidder(req.user.userFind),
		},
	});
})

	
export default router;