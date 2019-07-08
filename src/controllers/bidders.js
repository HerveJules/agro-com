import db from '../models';
import cloud from '../helpers/clouds';
import {generateHash} from '../helpers';
const {User, Bidder} = db;

class bidder{

	// function to add origanisation related information
	static async addBidder(req,res){ 
		try{
			console.log(req.body);
			console.log(req.files);
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
				compAuditR:coudinary_links[6],
				BankSlip:coudinary_links[7]
			});
			if (createBidder) {
				return res.status(200).render('index',{
					status:res.statusCode,
					message:'Company has added successfully!',
					createBidder,
					user:req.user.userFind,
					role:{
						isEax:req.user.role.isEax(req.user.userFind),
						isCoop:req.user.role.isCoop(req.user.userFind),
						isBidder:req.user.role.isBidder(req.user.userFind),
					},
				})
			}
		}catch(err){
			console.log(err);
			return res.redirect({
				status:res.statusCode,
				message:'Something went wrong on server!'
			})
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
	// get all bidder companies
	static async getAll(req,res){
		try{
			const findAll = await Bidder.findAll({
				attributes:['compName','compLocation',
				'tin','BankHis','RBCertificate','RACertificate',
				'compAgrees','LeaderSignL','compAuditR']
			}).then((result)=>{
				return res.rend('all-companies',{
					findAll,
					user:req.user.userFind,
					// role:{
					// 	isEax:req.user.role.isEax(req.user.userFind),
					// 	isCoop:req.user.role.isCoop(req.user.userFind),
					// 	isBidder:req.user.role.isBidder(req.user.userFind),
					// },
				})
			}).catch( err => res.render('all-companies',{
				user:req.user.userFind,
				message:'No bidder company registered now!'
			}))
		}catch(err){
			return res.redirect('/500');
		}
	}
	// destroy company with tin number
	static async DestroyBidder(req,res){
		try{

			await Bidder.destroy({where:req.params})
				.then(result =>{
					return res.render('del-company',{
						user:req.user.userFind,
						role:{
							isEax:req.user.role.isEax(req.user.userFind),
							isCoop:req.user.role.isCoop(req.user.userFind),
							isBidder:req.user.role.isBidder(req.user.userFind),
						},
						message:'Bidding Company has been destroyed!'
					})
				}).catch(err=> res.render('del-company',{
					user:req.user.userFind,
					role:{
						isEax:req.user.role.isEax(req.user.userFind),
						isCoop:req.user.role.isCoop(req.user.userFind),
						isBidder:req.user.role.isBidder(req.user.userFind),
					},
					message:'This company not registered yet!'
				}))
		}catch(err){
			return res.redirect('/500');
		}
	}
	// get info by tin
	static async getInfoDel(req,res){
		try{
			const {tin} = req.body;
			 await Bidder.findOne({where:{tin}})
			 	.then(result=>{
			 		const findLeader = User.findOne({where:{id:result.UserId}});
			 		if (findLeader) {
			 			return res.render('del-company',{
				 			user:req.user.userFind,
							role:{
								isEax:req.user.role.isEax(req.user.userFind),
								isCoop:req.user.role.isCoop(req.user.userFind),
								isBidder:req.user.role.isBidder(req.user.userFind),
							},
				 			findOne,
				 			findLeader,
				 			message:'Company found!'
				 		})
			 		} else {
			 			return res.render('del-company',{
			 				user:req.user.userFind,
							role:{
								isEax:req.user.role.isEax(req.user.userFind),
								isCoop:req.user.role.isCoop(req.user.userFind),
								isBidder:req.user.role.isBidder(req.user.userFind),
							},
			 				message:'No representative found!'
			 			})
			 		}
			 		
			 	}).catch(err=>res.render('del-company',{
			 		user:req.user.userFind,
					role:{
						isEax:req.user.role.isEax(req.user.userFind),
						isCoop:req.user.role.isCoop(req.user.userFind),
						isBidder:req.user.role.isBidder(req.user.userFind),
					},
			 		message:'Company not registered yet!'
			 	}))
		}catch(err){
			return res.redirect('/500');
		}
	}

}

export default bidder;