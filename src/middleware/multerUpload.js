import multer from 'multer';

// const storage = multer.distStorage();

const Uploads = multer({
	storage: multer.diskStorage({}),
	// limits:{fileSize:100},
	// fileFilter:(req,file,done)=>{
	// 	if (!file.mimetype.match(/jpg|png|jpeg|pdf/)) {
	// 		done(new Error('File is not supported!'),false);
	// 		return
	// 	}
	// 	done(null,true);
	// 	const fileType = /jpg|png|pdf|jpeg|gif/
	// 	const extename = fileType.test(path.extname(file.originalname).toLowerCase());
	// }
})

// const dUri = new Datauri();

// const dataUri = (req) => {
// 	return dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);
	
// }
export default Uploads;