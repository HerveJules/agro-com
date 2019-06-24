import db from "../models";

const { Store, Coop, User, Auction} = db;

// class for store operation controller

class store {
  // function to add product to store

  static async addStore(req, res) {
		const { coopName } = req.params;

		try {

			const findCooperative = await Coop.findOne({where: { coopName }})
			if(!findCooperative) {
				return res.status(400).send({
					status: res.statusCode,
					error: 'The cooperative is not found'
				})
			}

			const createStore = await Store.create({...req.body,CoopId:findCooperative.id})
			return res.status(201).send({
				status: res.statusCode,
				message: 'the store has successfully been created',
				data: createStore
			})
		} catch (error) {
			return res.status(500).send({
				status: res.statusCode,
				error: 'Something went wrong on the server'
			})
		}
  }

  // function that is going to update store and publish to auction

  static async publish(req, res) {
    //find product with tin
    try{
    	const {quality, quantity,price } = req.body;
    	const findOne = await User.findOne({where:{id:req.user.id},include:[{model:Coop, include:[Store]}]});
    	if (findOne) {
    		console.log(findOne.Stores)
    		if (findOne.Store.quality === quality && findOne.Store.quantity >= quantity) {
    			const StoreId = findOne.Store.id
    			// publish to auction 
    			 return await Auction.create({quantity, price , StoreId}).then(()=>{
    					// update store quantity
	    				const StoreQuantity = findOne.store.quantity - quantity;
	    				const updateStore = Store.update({
	    					quantity:StoreQuantity, where:{id:StoreId}
	    				})
	    				if (updateStore) {
	    					return res.status(200).send({
	    						status:res.statusCode,
	    						message:'Product has been publish to auction successfully!'
	    					})
	    				}
    				})

    		}
    		return res.status(400).send({
    			status:res.statusCode,
    			message:'Store have neither mentioned Quantity nor quality'
    		})
    	}
    	return res.status(400).send({
    		status:res.statusCode,
    		error:'Cooperative have no Store yet!'
    	})
    }catch(err){
    	// return res.status(500).send({
    	// 	status:res.statusCode,
    	// 	error:'Something went wrong on the server'
    	// })
    	console.log(err)
    }
  }
}

export default store;
