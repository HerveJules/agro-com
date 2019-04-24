import bcrypt from 'bcrypt';

const generateHash = (password) => {
	const hashPassword = bcrypt.hashSync(password,bcrypt.genSaltSync(10));
	return hashPassword;
}

const compareHashedPassword = (password,hash) => {
	const comparePassword =	bcrypt.compareSync(password,hash);
	return comparePassword;
}
export {
	generateHash,
	compareHashedPassword
};