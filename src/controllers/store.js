import db from '../models';

const {Store} = db;

// class for store operation controller

class store{
	// function to add product to store

	static addStore(req,res){

		Store.create({...req.body,CoopId:req.params.CoopId}).then(result =>{
			res.status(200).send({
				message:'stock updated successfully!',
				data:{
					result,
				}
			})
		}).catch(err =>{
			res.status(203).send({
				message:'Something went wrong while updating store',
				error:err,
			})
		});
	}

	// function that is going to update store and publish to auction

	static publish(req,res){
		//find product with tin
		Store.findById({where:{id}});
		
	}	
}

export default store;