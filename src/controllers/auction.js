import db from './models';

const {auctions,store} = db;

// auction operations goes here

class auction {

	static async addAuction(req,res){
		 
		try{
			//select product from store
			const product = await store.findOne({id});
			// add product to auction 
			if (product) {
				const id = product.id;
				const saveAuction = await auctions.create({quantity});
				if (saveAuction) {
					return res.status(201).send({
						status:201,
						message:'product has been published to auction platform'
					})
				}
			}
		}catch((err)=>{
			return res.send({
				status:501,
				message:err
			})
		})
		
	}

	// other related operation to auction

}

export default auction;