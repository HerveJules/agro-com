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
					role:{
						isEax:req.user.role.isEax(req.user.userFind),
						isCoop:req.user.role.isCoop(req.user.userFind),
						isBidder:req.user.role.isBidder(req.user.userFind),
					},
					message:'Auction commodities retrieved successfully!'
				})
			} else {
				return res.render('auction',{
					user:req.user.userFind,
					role:{
						isEax:req.user.role.isEax(req.user.userFind),
						isCoop:req.user.role.isCoop(req.user.userFind),
						isBidder:req.user.role.isBidder(req.user.userFind),
					},
					message:'There is no commodity published yet'
				})
			}
			}).catch(err=>res.render('auction',{
				user:req.user.userFind,
					role:{
						isEax:req.user.role.isEax(req.user.userFind),
						isCoop:req.user.role.isCoop(req.user.userFind),
						isBidder:req.user.role.isBidder(req.user.userFind),
					},
				message:'something went wrong on server'
			}))
		}catch(err){
			return res.render('auction',{
				user:req.user.userFind,
					role:{
						isEax:req.user.role.isEax(req.user.userFind),
						isCoop:req.user.role.isCoop(req.user.userFind),
						isBidder:req.user.role.isBidder(req.user.userFind),
					},
				message:'something went wrong on server'
			})
		}
	}
}

export default auction;