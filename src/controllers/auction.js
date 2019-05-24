import db from '../models';

const {Auction} = db;

// auction operations goes here

class auction {

	static addAuction(req,res){
		 
		Auction.create({...req.body,StoreId:req.params.StoreId}).then(result =>{
			
			res.status(200).send({
				message:'Product has been published to Auction successfully!',
				data:{
					result,
				}
			})
		}).catch(err =>{
			res.status(203).send({
				message:'Something went wrong while Publishing to Auction',
				error:err,
			})
		});
		
	}

	// other related operation to auction

}

export default auction;