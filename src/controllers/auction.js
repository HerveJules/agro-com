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
			console.log(err)
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

	static async getBidderAuction(req,res){
		try{
			const findAll = await Auction.findAll({
				attributes:['']
			});
			if (findAll) {
				return res.render('auctions-bidder',{
					findAll,
					user:req.user.userFind,
					role:{
						isEax:req.user.role.isEax(req.user.userFind),
						isCoop:req.user.role.isCoop(req.user.userFind),
						isBidder:req.user.role.isBidder(req.user.userFind),
					},
					message:'All auctions retrieved successfully!'
				})
			} else {
				return res.render('auctions-bidder',{
					user:req.user.userFind,
					role:{
						isEax:req.user.role.isEax(req.user.userFind),
						isCoop:req.user.role.isCoop(req.user.userFind),
						isBidder:req.user.role.isBidder(req.user.userFind),
					},
					message:'there is no  auctions yet!'
				})
			}
		}catch(err){

		}
	}

	static async bids(req,res){
		try{
			const {id} = req.params;
			await Auction.update({price,where:{id}}).then(async()=>{
				await User.findOne({id:req.user.userFind.id}).then((result)=>{
					return res.render('bid',{
						user:req.user.userFind,
						role:{
						isEax:req.user.role.isEax(req.user.userFind),
						isCoop:req.user.role.isCoop(req.user.userFind),
						isBidder:req.user.role.isBidder(req.user.userFind),
					},
					result
					})
				})
			})

		}catch(err){
			return res.render('500')
		}
	}
	static async getInfoAuction(req,res){
		try{
			const {id}=req.params;
			const findOne= await Store.findOne({where:{id}});
			if (findOne) {
				return res.render('bid',{
					findOne,
					user:req.user.userFind,
					role:{
						isEax:req.user.role.isEax(req.user.userFind),
						isCoop:req.user.role.isCoop(req.user.userFind),
						isBidder:req.user.role.isBidder(req.user.userFind),
					},
				})
			} else {}
	    }catch(err){
	      console.log(err);
	      return res.render('500');
	    }
	}
	static async findAuction(req,res){
		try{
			const{productName}=req.body;
			const findAll = await Store.findOne({productName});
			if (findAll) {
				return res.render('auctions-bidder',{
					user:req.user.userFind,
					role:{
			            isEax:req.user.role.isEax(req.user.userFind),
			            isCoop:req.user.role.isCoop(req.user.userFind),
			            isBidder:req.user.role.isBidder(req.user.userFind),
			          },
			          findAll
				})
			} else {}
		}catch(err){
			return res.render('500');
		}
	}
}

export default auction;