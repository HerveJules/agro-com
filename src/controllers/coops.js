import db from '../models';
import cloud from '../helpers/clouds';
import {generateHash} from '../helpers';
const {User,Coop} = db;

class Coops {

	// creating a function for add cooperative
	static async createCoop(req,res){
		// destructing data from body
		 const {
            firstname, lastname, email, password, role,
            adress, tel, ID, jobtitle, image  
        } = req.body 
		const {coopName,coopLocation,tin,coopEmail} = req.body;
		// // try and catch to find if not exist create new coop
		try{
		// 	// find if exist
			const findOne = await Coop.findOne({where: {tin}});
			
			if (findOne){
				res.status(403).send({
					message:'The cooperative with that tin exists',
					coopname:findOne.tin
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
					tel
				}).then( user => {
					user.createCoop({
						coopName,
						coopLocation,
						tin,
						coopEmail,
						RBCertificate:links[0],
						RAClearance:links[1],
						coopAgrees:links[2],
						coopSignL:links[3],
						leaderCert:links[4]
					}).then((coop)=>{
						res.status(201).send({
							message:'Data inserted successfully!',
							data:{
								coopname:coop.coopName,
								cooplocation:coop.coopLocation
							}
						})
					})
				}).catch(err =>{
					res.send({
						status:501,
						error:err
					})
				}) 
			}
		}
		catch(err){
			res.send({
				status:501,
				message:'Check internet connection!',
				error:err
			})
		}
	}
	// update coop function
	static async updateCoop(req,res){
		// find coop to update
		try{
			const{tin,coopName,coopLocation,coopEmail} = req.body;
			// check if tin is not null
			if (tin == "") {
				res.status(416).send({
					message:'request not satistiable please fill the form!'
				})
			}else{
				// else tin not null
				const coopinfo = Coop.findOne({where: {tin}});
				if (coopinfo) {
					const update = await Coop.update({
						coopName,coopLocation,coopEmail
					},
					{
						where:{tin}
					}).then(coop =>{
						return res.status(200).send({
							message:'cooperative has been updated successfully!',
							data:{
								name:coop.coopName,
								location:coop.coopLocation,
								email:coop.coopEmail
							}
						})
					}).catch(err=>{
						return res.status(503).send({
							message:'Something went wrong updating cooperative!',
							error:err
						})
					})
				}else{
					return res.status(204).send({
						message:'No cooperative exist with that Tin',
					})
				}
			}
			
		}catch(err){
			return res.status(503).send({
				message:'Check your network connection',
				error:err
			})
		}
	}
	// delete coop function
	static async deleteCoop(req,res){
		// check if tin is not empty
		const{tin}=req.body;
		if (req.body.tin != "") {
			const coopinfo = Coop.findOne({where:{tin}}).then(coop =>{
				return coop.destroy().then(()=>{
					res.status(200).send({
						message:'cooperative destroyed successfully!'
					})
				});
			})
		}else{	
			return res.status(416).send({
				message:'request is not satistiable please fill the form',
			})
		}
	}
	// 
}

// export coops  
export default Coops
