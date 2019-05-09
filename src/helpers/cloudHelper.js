import {cloudinaryConfig, uploader } from '../config/cloudinaryConfig'
import { multerUploads, dataUri} from '../middleware/multerUpload';

class cloud{
	static getData(file){

		const files = dataUri(req).content;

		return uploader.upload(file).then((result) => {

		   	return res.status(200).send({
		       	image
		    })
		   }).catch((err) =>{
		  		return res.status(203).send({
		 			error:err
				});
		})	

	}
}


// function* getUrl(arrFile) {
// 	// body...
// 	for(let i of arrFile){
// 		const cloud = new cloud();
// 		return cloud.getData(i);
// 	}

// }
// const generate = getUrl(arrFile);

export default cloud;