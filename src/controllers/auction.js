import db from '../models';

const {Auction, Store} = db;

// auction operations goes here

class auction {
	// function to get all commodities on auction
	static async getAllCom(req,res){
		try{
			await Auction.findAll({
				attributes:['quantity','bidder_tin','price','payed','StoreId'],
			})
			.then(async(result)=>{
			const findOne = await Store.findOne({where:{id:result.StoreId}})
			if (findOne) {
				return res.render('auction',{
					findOne,
					result,
					user:req.user.userFind,
					message:'Auction commodities retrieved successfully!'
				})
			} else {
				return res.render('auction',{
					user:req.user.userFind,
					message:'something went wrong on server'
				})
			}
			}).catch(err=>res.render('auction',{
				user:req.user.userFind,
				message:'something went wrong on server'
			}))
		}catch(err){
			return es.render('auction',{
				user:req.user.userFind,
				message:'something went wrong on server'
			})
		}
	}
}

export default auction;