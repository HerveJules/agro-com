import dotenv from 'dotenv';

dotenv.config();

const secret ={
	secretKey : process.env.JWT_SECRET_KEY
}

export default secret;
