
class Identity{
	static  isAdmin(req,res,next){
		// console.log(req.user.userFind.id);
		if (req.user.userFind.isadmin == true) {
			next();
		}else{
			return res.render('index',{
				user:req.user.userFind,
	            role:{
	              isEax:req.user.role.isEax(req.user.userFind),
	              isCoop:req.user.role.isCoop(req.user.userFind),
	              isBidder:req.user.role.isBidder(req.user.userFind),
	            },
				message:'forbidden require administator priviledge'
			})
		}
	}
	static async isVerified(req,res,next){
		if (req.user.userFind.isverified ){
			next();
		}else{
			return res.render('index',{
				user:req.user.userFind,
	            role:{
	              isEax:req.user.role.isEax(req.user.userFind),
	              isCoop:req.user.role.isCoop(req.user.userFind),
	              isBidder:req.user.role.isBidder(req.user.userFind),
	            },
				message:'Forbidden Account not verified!'
			})
		}
	}

}

export default Identity;