import db from '../models';
import {dataUri } from '../helpers/multer';
import cloudinary from '../config/cloudinaryConfig';

const {Store} = db;

// class for store operation controller

class store{
	// function to add product to store

	static addStore(req,res){
		Store.create({...req.body,CoopId:req.params.coopId});
	}
}

export default store;