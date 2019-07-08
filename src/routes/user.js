import express from 'express';
import User from '../controllers/user';
import passport from 'passport';
import {check} from 'express-validator/check';
import { multerUploads} from '../helpers/multer';
import validators from '../middleware/validations';
import middlewares from '../middleware/checks';
import cookieParser from 'cookie-parser';

const router = express.Router();

router.use(cookieParser());
router.use('/',function(req, res, next) {  
    req.headers['Authorization'] = req.cookies["Authorization"]
    next();
})

// router.use('/api/v1/auth',validators.validateEmail);
// router.use('/api/v1/auth',validators.validatePassword);
router.use('/api/v1/user',passport.authenticate('jwt',{session:false}),middlewares.isAdmin,middlewares.isVerified)
// validated route with ID and Phone validation 

router.post('/api/v1/auth/signup',[
  check('password')
  .withMessage('password should be AlphaNumeric')
  .isLength({ min : 8 })
  .withMessage('password not less than 8 characters'),
  check('email').isEmail()
  .withMessage('enter a valid email'),
],User.createUser);

// authentication route
router.get('/beneficiary',(req,res)=>{
	res.render('all-coops',{
		user:req.user.userFind,
		role:{
			isEax:req.user.role.isEax(req.user.userFind),
			isCoop:req.user.role.isCoop(req.user.userFind),
			isBidder:req.user.role.isBidder(req.user.userFind),
		}
	});
})
router.post('/api/v1/auth/signin',User.auth);
// delete user 
router.post('/api/v1/user/erase',User.deleteUser);
// update user
router.post('/api/v1/update/user/:id',passport.authenticate('jwt',{session:false}),User.updateUser);
// delete user with all related info of the cooperative
router.post('/api/v1/user/coop/del/:coopName',User.deleteUserCoop);
// delete user with all related info of the bidding company
router.delete('/api/v1/user/bidder/del',validators.validateEmail,User.deleteUserBidder);
// verify account to enable navigation to sensitive routes
router.post('/api/v1/user/verify/:id',User.verify); 
//grant admin privilege to user acount 
router.put('/api/v1/User/grant',User.GrantAdmin);
// get user heading cooperative with any info regarding cooperative
router.get('/api/v1/user/coop/getfull',validators.validateEmail,User.getUserCoopInfo);
// get user heading bidding company with full info
router.get('/api/v1/user/bidder/getfull',validators.validateEmail,User.getUserBidderInfo);
// get all users
router.get('/api/v1/user/all',User.getAllUsers);
// get add page
router.get('/api/v1/user/add',(req,res)=>{
	res.render('add-user',{
		user:req.user.userFind,
		role:{
			isEax:req.user.role.isEax(req.user.userFind),
			isCoop:req.user.role.isCoop(req.user.userFind),
			isBidder:req.user.role.isBidder(req.user.userFind),
		}
	});
});
// route to get edit page
router.get('/api/v1/user/edit/:id',User.getInfoEdit);
// route to get delete page
router.get('/api/v1/user/del',(req,res)=>{
	res.render('del-user',{
		user:req.user.userFind,
		role:{
			isEax:req.user.role.isEax(req.user.userFind),
			isCoop:req.user.role.isCoop(req.user.userFind),
			isBidder:req.user.role.isBidder(req.user.userFind),
		}
	})
})
// route to get index
router.get('/api/v1/index',passport.authenticate('jwt',{session:false}),(req,res)=>{
	res.render('index',{
		user: req.user.userFind,
		role:{
			isEax:req.user.role.isEax(req.user.userFind),
			isCoop:req.user.role.isCoop(req.user.userFind),
			isBidder:req.user.role.isBidder(req.user.userFind),
		}
	})
})
// route to get edit page without content
router.get('/api/v1/user/edit',(req,res)=>{
	res.render('edit-user',{
		user:req.user.userFind,
		role:{
			isEax:req.user.role.isEax(req.user.userFind),
			isCoop:req.user.role.isCoop(req.user.userFind),
			isBidder:req.user.role.isBidder(req.user.userFind),
		}
	})
})
// route to get info for edit with email
router.post('/api/v1/user/edit',User.getInfoEditByEmail);
// get user to delete
router.post('/api/v1/user/remove',User.getInfoDelByEmail);
// route to render profile info on all users page
router.get('/api/v1/profile',passport.authenticate('jwt',{session:false}),(req,res)=>{
	const user = req.user.userFind;
	// console.log(profile.User);
	res.render('profile',{
		user,
		role:{
			isEax:req.user.role.isEax(req.user.userFind),
			isCoop:req.user.role.isCoop(req.user.userFind),
			isBidder:req.user.role.isBidder(req.user.userFind),
		}
	})
})
// route to settings change password
router.get('/api/v1/settings',(req,res)=>{
	res.render('password-recovery',{
		user:req.user.userFind,
		
	})
})

export default router;
