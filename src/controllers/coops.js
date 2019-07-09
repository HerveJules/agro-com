import db from '../models';
import cloud from '../helpers/clouds';
import {generateHash} from '../helpers';
import Sequelize from 'sequelize';
const {User,Coop} = db;

class Coops {

	// creating a function for add cooperative
	static async createCoop(req,res){
		// // try and catch to find if not exist and create new coop
		try{ 
			const {coopName,coopLocation,tin} = req.body;
			const UserId= req.user.userFind.id;
			const Op = Sequelize.Op;
		// 	// find if exist
			const findOne = await Coop.findOne({where: {tin}});
			if (!findOne) {
				const coudinary_links = await cloud(req.files);
				const createcoop = Coop.create({
					coopName,
					coopLocation,
					tin,
					UserId,
					RBCertificate:coudinary_links[0],
					RAClearance:coudinary_links[1],
					coopAgrees:coudinary_links[2],
					coopSignL:coudinary_links[3],
					leaderCert:coudinary_links[4]
				}).then(result =>{
					return res.render('add-coop',{
						user:req.user.userFind,
						role:{
							isEax:req.user.role.isEax(req.user.userFind),
							isCoop:req.user.role.isCoop(req.user.userFind),
							isBidder:req.user.role.isBidder(req.user.userFind),
						},
						message:'cooperative created successfully!',
					})
				})
			}
		}
		catch(err){
			return res.render('500');
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
			})
		}
	}
	// delete coop function
	static async deleteCoop(req,res){
		// check if tin is not empty
		try{
			const {tin,coopName}= req.params;
			const findOne = await Coop.findOne({where:{tin,coopName}});
			if (findOne) {
				await Coop.destroy({where:{tin}}).then(result=>{
					if (result) {
						return res.render('del-coop',{
							user:req.user.userFind,
							role:{
								isEax:req.user.role.isEax(req.user.userFind),
								isCoop:req.user.role.isCoop(req.user.userFind),
								isBidder:req.user.role.isBidder(req.user.userFind),
							},
							message:'cooperative has been deleted successfully!',
						})
					}
				})
			} else{
				return res.render('del-coop',{
					user:req.user.userFind,
					role:{
						isEax:req.user.role.isEax(req.user.userFind),
						isCoop:req.user.role.isCoop(req.user.userFind),
						isBidder:req.user.role.isBidder(req.user.userFind),
					},
					message:`cooperative with tin ${tin} not exist !`,
				})
			}
				
			
		}catch(err){
			return res.render('500');
		}
	}
	// get all coops
	static async getCoops(req,res){
		try{	
			await Coop.findAll().then(result =>{
				return res.render('all-coops',{
					result,
					user:req.user.userFind,
					role:{
						isEax:req.user.role.isEax(req.user.userFind),
						isCoop:req.user.role.isCoop(req.user.userFind),
						isBidder:req.user.role.isBidder(req.user.userFind),
					},
				})
			})
		}catch(err){
			res.render('500');
		}
	}
	// get info of coop to delete
	static async getDelInfo(req,res){
		try{
			const{coopName}=req.body;
			const findOne = await Coop.findOne({where:{coopName}});
			if (findOne != null) {
				return res.render('del-coop',{
					findOne,
					user:req.user.userFind,
					role:{
						isEax:req.user.role.isEax(req.user.userFind),
						isCoop:req.user.role.isCoop(req.user.userFind),
						isBidder:req.user.role.isBidder(req.user.userFind),
					},
					message:`${coopName}  found  successfully!`
				})
			} 
			return res.render('del-coop',{
				user:req.user.userFind,
				role:{
					isEax:req.user.role.isEax(req.user.userFind),
					isCoop:req.user.role.isCoop(req.user.userFind),
					isBidder:req.user.role.isBidder(req.user.userFind),
				},
			})
		}catch(err){
			return res.render('500');
		}
	}
	// self coop info
	
}

// export coops  
export default Coops
