import emailValidator from 'email-validator';
import passwdValidator from 'password-validator';



function validateEmail(req,res,next){
	const {email} = req.body;
		// console.log(emailValidator.validate(email));
	if (emailValidator.validate(email)){
		next();
	}else{

		res.status(406).send({
		status:406,
		message: 'invalid email'
		})
		// console.log('invalid email');
	}
		
}


function validatePassword(req,res,next){
	const {password} = req.body;
	const schema = new passwdValidator();

	schema.is().min(8);
	schema.has().lowercase();
	schema.has().uppercase();
	schema.has().not().spaces();
	schema.has().digits();
	if (schema.validate(password)) {
		next();
	} else {
		return res.status(406).send({
		status:res.statusCode,
		message:'invalid password',
		error:schema.validate(password,{list:true})
		})
	}
}


export default {
	validateEmail,
	validatePassword
}
