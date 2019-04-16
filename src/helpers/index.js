import bcrypt from 'bcrypt';

const generateHash = (password) => {
	const hashPassword = bcrypt.hashSync(password,bcrypt.genSaltSync(10));
	return hashPassword;
}

const compareHashedPassword = (hash,password) => {
		
	return bcrypt.compareSync(password,hash);
}
	

export default {generateHash,compareHashedPassword};