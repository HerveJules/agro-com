import db from '../models';
import cloud from '../helpers/clouds';
import {generateHash} from '../helpers';
import Sequelize from 'sequelize';
const {User,Coop} = db;

class Coops {

	// creating a function for add cooperative
	static async createCoop(req,res){
		
		// // try and catch to find if not exist create new coop
		try{ 
			const {coopName,coopLocation,tin,coopEmail} = req.body;
			const UserId= req.user.id;
			const Op = Sequelize.Op;
		// 	// find if exist
			const findOne = await Coop.findOne({where: {
				[Op.or]:[{tin},{UserId}]
			}
			});
			if (!findOne) {
				const coudinary_links = await cloud(req.files);
				const createcoop = Coop.create({
					coopName,
					coopLocation,
					coopEmail,
					tin,
					UserId,
					RBCertificate:coudinary_links[0],
					RAClearance:coudinary_links[1],
					coopAgrees:coudinary_links[2],
					coopSignL:coudinary_links[3],
					leaderCert:coudinary_links[4]
				}).then(result =>{
					return res.status(200).send({
						status:res.statusCode,
						message:'cooperative created successfully!',
						result
					})
				})
			}else{
				return res.status(500).send({
					status:res.statusCode,
					message:'something went wrong!'
					
				})
			}
			
		}
		catch(err){
			// res.status(500).send({
			// 	status:res.statusCode,
			// 	message:'Check internet connection!',
			// 	error:err
			// })
			console.log(err);
		}
	}
	// update coop function
	static async updateCoop(req,res){
		// find coop to update
		try{
			await User.findOne({where:{id:req.user.id},
				include:[Coop]
			}).then(result => {
					return result.Coop.update({...req.body}).then(done =>{
						res.status(200).send({
							status:res.statusCode,
							message:'cooperative updated successfully!',
							data:{
								done
							}
						})
					})
				}).catch(err =>{
					return res.status(500).send({
						status:res.statusCode,
						error:`something went wrong while updating please check your cooperative tin`
					})
				})
		}catch(err){
			return res.status(500).send({
				status:res.statusCode,
				message:'Check your network connection',
				error:err
			})
		}
	}
	// delete coop function
	static async deleteCoop(req,res){
		// check if tin is not empty
		try{
			const{tin}=req.body;
				await Coop.destroy({where:{tin}}).then(result=>{
					if (result) {
						return res.status(200).send({
							status:res.statusCode,
							message:'cooperative has been deleted successfully!',
						})
					}else{
						res.status(500).send({
							status:res.statusCode,
							message:'cooperative with that tin not exist yet!'
						})
					}
				})
			
		}catch(err){
			return res.status(500).send({
				status:res.statusCode,
				message:'something went wrong while deleting cooperative',
			})
		}
	}
	// get all coops
	static async getCoops(req,res){
		try{	
			await Coop.findAll().then(result =>{
				return res.status(200).send({
					status:res.statusCode,
					message:'All cooperatives fetched successfully!',
					result,
				})
			})
		}catch(err){
			res.status(500).send({
				status:res.statusCode,
				message:'something went wrong!'
			})
		}
	}
	// 
}

// export coops  
export default Coops
