import {config,uploader} from 'cloudinary';

import dotenv from 'dotenv';

dotenv.config();

const cloudinaryConfig = (req,res,next)=>{
	config({
		cloud_name:'regeza',
		api_key:'CLOUDINARY_API_KEY',
		api_secret:'CLOUDINARY_SECRET'
	});
	next();
}

export default {cloudinaryConfig,uploader};