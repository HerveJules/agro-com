import db from '../models';

const {Bidders,User} = db;

class bidder{

	// function to add origanisation related information
	static addBidder(req,res){
		//destruct data from body 

		const { compName, compLocation, compEmail, compWeb,email, password,jobtitle,ID} = req.body;
		const {RBCertificate, compAgrees, 
			LeaderSignL, BankHis, RACertificate, compLogo, compAuditR
		} = req.body;
		// bidders.create({
		// 	compName,
		// 	compLocation,
		// 	compEmail,
		// 	compWeb,
		// 	RBCertificate,
		// 	compAgrees,
		// 	LeaderSignL,
		// 	BankHis,
		// 	RACertificate,
		// 	compLogo,
		// 	compAuditR
		// }).then(()=>{
		// 	res.status(201).send({
		// 		status:200,
		// 		message:'you have been registered successfully!'
		// 	})
		// })

		// query data to insert

		// const {compName,compLocation}=req.body;
		// const{BankHis,compLogo}=req.body;
		console.log('========>>',email);
		users.create({
			email,
			password,
			jobtitle,
			ID
		}).then((user)=>{
			user.addBidder({
				compName,
				compLocation,
				compEmail,
				compWeb,
				RBCertificate,
				compAgrees,
				LeaderSignL,
				BankHis,
				RACertificate,
				compLogo,
				compAuditR
			})
		})
	}

	static find(req,res){
		users.findAll({
			include:[bidders]
		}).then( user => {
			// res.send({
			// 	user
			// })
			console.log(user);
		})
	}

	static add(req,res){
		users.create({
			email, 
			password, 
			jobtitle, 
			ID
		}).then((user)=>{
			user.createBidders({
					compName,
					compLocation,
					compEmail,
					compWeb,
					RBCertificate,
					compAgrees,
					LeaderSignL,
					BankHis,
					RACertificate,
					compLogo,
					compAuditR
			}).then((bid)=>{
				res.status(201).send({
						status:200,
						message:'you have been registered successfully!',
						bid
				})
			}).catch(err => console.log(`${err} unable to register member`));

		}).catch(err => console.log(err));
		
	}

}

export default bidder;