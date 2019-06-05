import express from 'express';
import User from '../controllers/user';
import passport from 'passport';
import {check,validationResult} from 'express-validator/check';
import { multerUploads} from '../helpers/multer';
import validators from '../middleware/validations';
import middlewares from '../middleware/checks';
const router = express.Router();

router.use('/api/v1/auth',validators.validateEmail);
router.use('/api/v1/auth',validators.validatePassword);

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

// router.post('/api/v1/auth/delusr',User.deluser)

export default router;
