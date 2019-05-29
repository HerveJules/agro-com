import db from '../models';
import cloud from '../helpers/clouds';
import {generateHash} from '../helpers';
const {User, Bidder} = db;

class bidder{

	// function to add origanisation related information
	static async addBidder(req,res){
		//destruct data from body 
		
		const {
            firstname, lastname, email, password, role,
            adress, tel, ID, jobtitle, image, 
            compName, compLocation,tin, compEmail, compWeb  
        } = req.body 
		// // try and catch to find if not exist create new coop
		try{
		// 	// find if exist
			const findOne = await Bidder.findOne({where: {tin}});

			if (findOne){
				res.status(403).send({
					message:'The Company with that tin already exists!',
					coopname:findOne.compName
				})
			}else{
				const links = await cloud(req.files);
				const hashPass = await generateHash(password);
				const createCoop = await User.create({
					firstname,
					lastname,
					email,
					password:hashPass,
					jobtitle,
					ID,
					image:links[0],
					role,
					adress,
					tel,

				}).then( user => {
					user.createBidder({
						compName,
						compLocation,
						tin,
						compEmail,
						compWeb,
						RBCertificate:links[1],
						RACertificate:links[2],
						compAgrees:links[3],
						LeaderSignL:links[4],
						compLogo:links[5],
						BankHis:links[6],
						compAuditR:links[7],
					}).then((bidder)=>{
						res.status(201).send({
							message:'Data inserted successfully!',
							data:{
								companyname:bidder.compName,
								companylocation:bidder.compLocation
							}
						})
					}).catch(err =>{
						console.log(err);
					})
				}).catch(err =>{
					console.log(err);
				}) 
			}
		}
		catch(err){
			console.log(err);
		}
	}

	static fetch(req,res){
		User.findAll({
			include:[Bidder]
		}).then(bidders =>{
			console.log(bidders[1].Bidder);
		}).catch(err =>{
			console.log(err);
		})
	}

}

export default bidder;