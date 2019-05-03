import multer from 'multer';

import Datauri from 'datauri';

import path from 'path';

const storage = multer.memoryStorage();

const multerUploads = multer({
	storage,
	// limits:{fileSize:100},
	// fileFilter:(file,done)=>{
	// 	const fileType = /jpg|png|pdf|jpeg|gif/
	// 	const extename = fileType.test(path.extname(file.originalname).toLowerCase());
	// }
}).single('userPhoto');

const dUri = new Datauri();

const dataUri = (req) => {
	return dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);
	
}

export { multerUploads, dataUri };