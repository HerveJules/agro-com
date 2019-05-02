import express from 'express';
import User from '../controllers/user';
import Coop from '../controllers/coops';
import Bidder from '../controllers/bidders';
import passport from 'passport';
import passportAuth from '../config/passport';
import {multerUploads,dataUri} from '../middleware/multer';
import {cloudinary,uploader} from '../config/cloudinary';

const router = express.Router();

router.post('/api/v1/auth/signup', User.createUser);

router.post('/api/v1/auth/signin',User.auth);

router.post('/api/v1/add/coop',Coop.createCoop);

router.post('/api/v1/add/bidders',Bidder.add);

router.get('/api/v1/secret',passport.authenticate('jwt',{session:false}),User.secret);

router.post('/upload', multerUploads, (req,res) => {
	if (req.file) {
		const file = dataUri(req).content;
		console.log(file);

		return uploader.upload(file).then( result => {
			const image = result.url;
			return res.status(201).send({
				message:'uploaded successfully',
				data:{
					image,
					size:result.size,
					format:result.format
				}
			})
		}).catch(err =>{
			return res.status(400).send({
				message:'something went wrong while uploading your files',
				data:{
					err
				}
			})
		})
	}
})
	
export default router;
