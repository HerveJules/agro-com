import db from '../models';
import vd from 'express-validator/check';
const {check} = vd;
const {User,Coop} = db;

class Identity{
	static  isAdmin(req,res,next){
		
		if (req.user.isadmin == "true") {
			next();
		}else{
			return res.status(403).send({
				status:res.statusCode,
				message:'forbidden require administator priviledge'
			})
		}
	}
	static async isVerified(req,res,next){
		if (req.user.isverified ){
			next();
		}else{
			return res.status(403).send({
				status:res.statusCode,
				message:'your account is not verified!'
			})
		}
	}

}

export default Identity;