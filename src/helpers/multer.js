import multer from 'multer';

import Datauri from 'datauri';

import path from 'path';

const storage = multer.memoryStorage();

const multerUploads = multer({ 
	storage,
	fileFilter: function (req, file, cb) {

	    var filetypes = /jpeg|jpg|pdf|png/;
	    var mimetype = filetypes.test(file.mimetype);
	    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

	    if (mimetype && extname) {
	      return cb(null, true);
	    }
	    cb("Error: File upload only supports the following filetypes - " + filetypes);
  	}
}).array('image',5);

const dUri = new Datauri();

const dataUri = req => dUri.format(path.extname(req.originalname).toString(), req.buffer);

export { multerUploads, dataUri };