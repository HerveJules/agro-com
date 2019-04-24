import db from '../models';
const {coops} = db;

class Coops {

	// creating a function for add cooperative
	static async createCoop(req,res){
		// destructing data from body
		const {coopName,coopLocation,coopLicense,coopReaderName,coopReaderId,coopEmail} = req.body;

		// try and catch to find if not exist create new coop
		try{
			// find if exist
			const findOne = await coops.findOne({where: {coopLicense}});
			if (findOne){
				res.status(403).send({
					message:'The cooperative with that tin exists',
					coopname:findOne.coopName
				})
			}
			else{
				const createCoop = await coops.create({
					coopName,
					coopLocation,
					coopLicense,
					coopReaderName,
					coopReaderId,
					coopEmail
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
				} else {

				}
			}
		}
		catch(err){
			res.send({
				message:err
			})
		}
	}

	


}

// export coops  

export default Coops;