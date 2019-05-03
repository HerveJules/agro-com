import multer from 'multer';

import Datauri from 'datauri';

import path from 'path';

const storage = multer.memoryStorage();

const multerUploads = multer({
	storage,
	// limits:{fileSize:1000000},
	// fileFilter:(file,done)=>{
	// 	const fileType = /jpg|png|pdf|jpeg|gif/
	// 	const extename = fileType.test(path.extname(file.originalname).toLowerCase());
	// }
}).fields([
  { name: 'image', maxCount: 1 },
  { name: 'doc', maxCount: 8 }
]);

const dUri = new Datauri();

const dataUri = (req) => {
	return dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);
}

export { multerUploads, dataUri };