import multer from 'multer';

import Datauri from 'datauri';

import path from 'path';

const storage = multer.memoryStorage();

const multerUploads = multer({ 
	storage,

}).array('uploadfile',9);

const dUri = new Datauri();

const dataUri = req => dUri.format(path.extname(req.originalname).toString(), req.buffer);

export { multerUploads, dataUri };