import db from './models';

const {bidders,users} = db;

class bidder{

	// function to add origanisation related information
	static addBidder(req,res){
		//destruct data from body 

		const { compName, compLocation, compEmail, compWeb } = req.body;
		const {RBCertificate, compAgrees, 
			LeaderSignL, BankHis, RACertificate, compLogo, compAuditR
		} = req.file;
		users.findOne({})

		// query data to insert
	}

}