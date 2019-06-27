import express from 'express';
import User from '../controllers/user';
import passport from 'passport';
import {check} from 'express-validator/check';
import { multerUploads} from '../helpers/multer';
import validators from '../middleware/validations';
import middlewares from '../middleware/checks';
const router = express.Router();

router.use('/api/v1/auth',validators.validateEmail);
router.use('/api/v1/auth',validators.validatePassword);
router.use('/api/v1/user',passport.authenticate('jwt',{session:false}),middlewares.isAdmin,middlewares.isVerified)
// validated route with ID and Phone validation 

router.post('/api/v1/auth/signup',[
  check('ID').isNumeric()
  .withMessage('ID must be numeric')
  .isLength({ min : 16, max : 16 })
  .withMessage('ID should not be less than 16 digits'),
  check('tel').isMobilePhone()
  .isLength({min:10})
  .withMessage('phone number should not be less than 10 digits'),
],User.createUser);

// authentication route

router.post('/api/v1/auth/signin',User.auth);
// delete user 
router.delete('/api/v1/user/del',validators.validateEmail,User.deleteUser);
// update user
router.put('/api/v1/update/user',passport.authenticate('jwt',{session:false}),User.updateUser);
// delete user with all related info of the cooperative
router.delete('/api/v1/user/coop/del',validators.validateEmail,User.deleteUserCoop);
// delete user with all related info of the bidding company
router.delete('/api/v1/user/bidder/del',validators.validateEmail,User.deleteUserBidder);
// verify account to enable navigation to sensitive routes
router.put('/api/v1/user/verify',validators.validateEmail,User.verify);
//grant admin privilege to user acount 
router.put('/api/v1/User/grant',User.GrantAdmin);
// get user heading cooperative with any info regarding cooperative
router.get('/api/v1/user/coop/getfull',validators.validateEmail,User.getUserCoopInfo);
// get user heading bidding company with full info
router.get('/api/v1/user/bidder/getfull',validators.validateEmail,User.getUserBidderInfo)

export default router;
