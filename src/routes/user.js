import express from 'express';
import User from '../controllers/user';
import Coop from '../controllers/coops';
import Bidder from '../controllers/bidders';
import passport from 'passport';
import passportAuth from '../config/passport';
import { uploader, cloudinaryConfig } from '../config/cloudinaryConfig'

import { multerUploads, dataUri } from '../middleware/multerUpload';
const router = express.Router();

router.post('/api/v1/auth/signup', User.createUser);

router.post('/api/v1/auth/signin',User.auth);

router.post('/api/v1/add/coop',Coop.createCoop);

router.post('/api/v1/add/bidders',Bidder.add);

router.get('/api/v1/secret',passport.authenticate('jwt',{session:false}),User.secret);

router.use('/upload', cloudinaryConfig);

	router.post('/upload', multerUploads, (req, res) => {

	if(req.files) {

	const file = dataUri(req).content;

	return uploader.upload(file).then((result) => {

		const image = result.url;

		return res.status(200).json({

			messge: 'Your image has been uploded successfully to cloudinary',

			data: {

				image

			}

		})

	}).catch((err) => res.status(400).json({

		messge: 'someting went wrong while processing your request',

		data: {

			err

		}

		}))

	}

});
	
export default router;
