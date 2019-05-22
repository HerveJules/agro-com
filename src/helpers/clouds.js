import cloudinary from 'cloudinary';
import { multerUploads} from '../helpers/multer';
import {dataUri } from '../helpers/multer';

const upload = async (req) => {
    if(req) {
		try{
			const links = new Array();
			for(let obj of req){
				if (obj !== undefined) {
					const file = dataUri(obj).content;
				
					await cloudinary.uploader.upload(file).then((result) => {

					const image = result.url;

					links.push(image);
					// return links;

					}).catch((err) =>{
						return err;
					} )
				}else{
					return 'image uploaded';
				}

			}
			return links;

		}catch(err){
			return err;
		}
	}
	
}

export default upload;