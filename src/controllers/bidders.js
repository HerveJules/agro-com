import db from '../models';
import cloud from '../helpers/clouds';
import {generateHash} from '../helpers';
const {User, Bidder} = db;

class bidder{

	// function to add origanisation related information
	static async addBidder(req,res){ 
		// // try to find if not exist create new coop
		req.headers[req.cookies];
			console.log(req.headers);
		try{
			const{compName, tin}=req.body;
			const coudinary_links = await cloud(req.files);
			const createBidder = await Bidder.create({...req.body,
				UserId:req.user.id,
				RBCertificate:coudinary_links[0],
				compAgrees:coudinary_links[1],
				LeaderSignL:coudinary_links[2],
				BankHis:coudinary_links[3],
				RACertificate:coudinary_links[4],
				compLogo:coudinary_links[5],
				compAuditR:coudinary_links[6]
			});
			if (createBidder) {
				return res.status(200).send({
					status:res.statusCode,
					message:'Company has added successfully!',
					createBidder
				})
			}
		}catch(err){
			console.log(err);
			// return res.status(500).send({
			// 	status:res.statusCode,
			// 	message:'Something went wrong on server!'
			// })
			console.log(err);
		}
	}
	
	// function to update info on oraganisation
	static async edit(req,res){
		// find relative company
		try{
			const findOne = await User.findOne({where:{id:req.user.id},include:[Bidder]});
			console.log(findOne)
			if (findOne.Bidder) {
				// update info
				const update = await findOne.Bidder.update({...req.body});
				if (update) {
					return res.status(200).send({
						status:res.statusCode,
						message:'information updated successfully',
						update
					})
				} 
			} else {
				return res.status(400).send({
					status:res.statusCode,
					message:'oraganisation not found!'
				})
			}
		}catch(err){
			return res.status(500).send({
				status:res.statusCode,
				message:'Something went wrong on server!'
			})
		}
	}

}

export default bidder;