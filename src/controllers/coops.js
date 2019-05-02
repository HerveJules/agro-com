import db from '../models';
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
}

// export coops  
export default Coops
