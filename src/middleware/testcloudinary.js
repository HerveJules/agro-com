import cloudinary from 'cloudinary';
import multer from 'multer';
import cloudinaryStorage from 'multer-storage-cloudinary';
import cloudinaryConfig from '../config/cloudinaryConfig';

const storage = cloudinaryStorage({
	cloudinaryConfig,
	folder:'sample',
	allowedFormats:['jpg','png','pdf'],

});

const parser = multer({storage});

app.post('/upload', parser.array('images', 10), function (req, res) {
  console.log(req.files);
});

// export default upl;