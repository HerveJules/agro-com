import db from '../models';
import { uploader } from '../config/cloudinaryConfig'

import { dataUri } from '../middleware/multerUpload';
const {coops} = db;

class Coops {

	// creating a function for add cooperative
	static async createCoop(req,res){
		// destructing data from body
		const {coopName,coopLocation,tin,coopEmail} = req.body;
		const {RBCertificate,RAClearance,coopAgrees,coopSignL,leaderCert} = req.file;
		// try and catch to find if not exist create new coop
		try{
			// find if exist
			const findOne = await coops.findOne({where: {coopLicense}});
			if (findOne){
				res.status(403).send({
					message:'The cooperative with that tin exists',
					coopname:findOne.coopName
				})
			}else{
				const createCoop = await coops.create({
					coopName,
					coopLocation,
					RBCertificate, 
					RAClearance,
					tin,
					coopAgrees,
					coopEmail,
					coopSignL,
					leaderCert
				});
				if (createCoop) {
					res.status(201).send({
						status:200,
						message:'Cooperative has been successfully inserted',
						coop:{
							coopName:createCoop.coopName,
							coopLicense:createCoop.coopLicense
						}
					})
				} 
			}
		}
		catch(err){
			res.send({
				status:501,
				message:'Check internet connection!'
			})
		}
	}

	static uploadFile(req,res){
		if(req.file) {

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
	}
}

// export coops  
export default Coops
