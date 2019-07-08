
class Identity{
	static  isAdmin(req,res,next){
		// console.log(req.user.userFind.id);
		if (req.user.userFind.isadmin == true) {
			next();
		}else{
			return res.status(403).send({
				status:res.statusCode,
				message:'forbidden require administator priviledge'
			})
		}
	}
	static async isVerified(req,res,next){
		if (req.user.userFind.isverified ){
			next();
		}else{
			return res.status(403).send({
				message:'Account not verified'
				`<span>{{message}}</span>`
			})
		}
	}

}

export default Identity;