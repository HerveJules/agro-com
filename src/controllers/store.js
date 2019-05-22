import db from '../models';
import {dataUri } from '../helpers/multer';
import cloudinary from '../config/cloudinaryConfig';

const {store} = db;

// class for store operation controller

class Store{
	// function to add product to store

	static async addStore(req,res){
		if(req.files) {
			try{
				const links = new Array();
				for(let obj of req.files){
					if (obj !== undefined) {
						const file = dataUri(obj).content;
					
						await cloudinary.uploader.upload(file).then((result) => {

						const image = result.url;

						links.push(image);

						}).catch((err) => res.status(400).json({

							messge: 'someting went wrong while processing your request',

							data: {

								err

							}

						}))
					}else{
						return res.status(200).send({
							messge:'files uploaded'
						})
					}

				}
				return res.status(200).send({
					links
				})

			}catch(err){
				res.status(502).send({
					message: 'something went wrong while uploading your documents please try again',
					data:err
				})
			}
		}
	}
}

export default Store;