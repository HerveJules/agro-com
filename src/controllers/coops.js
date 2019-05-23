import db from '../models';
import cloud from '../helpers/clouds';
const {User,Coop} = db;

class Coops {

	// creating a function for add cooperative
	static async createCoop(req,res){
		// destructing data from body
		 const {
            firstname, lastname, email, password, 
            isadmin, role, isverified, status, 
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

				const createCoop = await User.create({
					firstname,
					lastname,
					email,
					password,
					jobtitle,
					ID
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
					console.log(err);
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
	
}

// export coops  
export default Coops
