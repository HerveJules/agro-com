import db from "../models";
import Sequelize from "sequelize";

const { Store, Coop, User, Auction} = db;

// class for store operation controller

class store {
  // function to add product to store

  static async addStore(req, res) {
  	// destruct params and req body
		try {
			const { coopName } = req.params;
			const {productName,quality} = req.body;
			const findCooperative = await Coop.findOne({where: { coopName },include:[Store]})

			if (findCooperative.Stores.length !==0 ) {
				// update the existing store
				const quantity = +findCooperative.Stores[0].quantity + +req.body.quantity;
				for(const element of findCooperative.Stores){
					// confirm wether there is a strore of same product to coop
					if (element.productName === req.body.productName && element.quality === req.body.quality) {
						return await element.update({quantity}).then((updateResult)=>{
							return res.status(200).send({
								status:res.statusCode,
								message:'Store has been updated successfully!',
								data:{
									product:updateResult.productName,
									quality:updateResult.quality,
									quantity:updateResult.quantity,
									price:updateResult.price
								}
							})
						})
					}
				}
				// if there is no existing same product then add new product to store
				return await Store.create({...req.body,CoopId:findCooperative.id}).then((addResult)=>{
					return res.status(200).send({
						status:res.statusCode,
						message:'Store has been Added successfully!',
						data:{
							product:addResult.productName,
							quality:addResult.quality,
							quantity:addResult.quantity,
							price:addResult.price
						}
					})
				})
						
				}else{
					// create new store for the first time 
					return await Store.create({...req.body,CoopId:findCooperative.id}).then((createResult)=>{
						return res.status(200).send({
							status:res.statusCode,
							message:'Store has been created successfully!',
							data:{
								product:createResult.productName,
								quality:createResult.quality,
								quantity:createResult.quantity,
								price:createResult.price
							}
						})
					})
				}

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
    	const {productName,quality, quantity } = req.body;
    	const findOne = await User.findOne({where:{id:req.user.id},include:[{model:Coop,include:[Store]}]});

    	if (findOne.Coop.Stores.length !== 0) {
    		 for(const element of findOne.Coop.Stores){
    			// confirm that commodities to publish match with req.body
    			if (element.quality === quality && element.quantity >= quantity && element.productName === productName) {
    			
	    			// publish to auction 
	    			const publish = await Auction.create({quantity, price:element.price , StoreId:element.id});
	    			if (publish) {
	    			 	// update store quantity
		    			const StoreQuantity = element.quantity - quantity;
		    			const updateStore = await element.update({quantity:StoreQuantity});
		    			if (updateStore) {
		    				return res.status(200).send({
		    					status:res.statusCode,
		    					message:'Product has been published to auction successfully!',
		    					// current store position after publishing to auction
		    					data:{
		    						product:updateStore.productName,
		    						quality:updateStore.quality,
		    						quantity:updateStore.quantity,
		    						price:updateStore.price
		    					}
		    				})
		    			}
	    			 } 

    			}
    		}
    		// input data doesn't fit the above condition
    		return res.status(400).send({
    			status:res.statusCode,
    			message:'Request not fit the acceptance!'
    		})		
    	}
    	// the store is empty
    	return res.status(400).send({
    		status:res.statusCode,
    		error:'Cooperative have no Store yet!'
    	})
    }catch(err){
    	return res.status(500).send({
    		status:res.statusCode,
    		error:'Something went wrong on the server'
    	})
    }
  }

  // function that gets cooperatives store details 

  static async getStore (req,res){
  	// try to retrive store of coop and catch errors
  	try{
  		// find store
  		const findOne = await User.findOne({where:{id:req.user.id},include:[{model:Coop,include:[Store]}]});
  		if (findOne.Coop.Stores) {
  			const data = [];
  			for(const element of findOne.Coop.Stores){
  				data.push(element);
  			}
  			return res.status(200).send({
  				status:res.statusCode,
  				message:'Cooperative Store retrieved successfully!',
  				data
  			})
  		} else {
  			return res.status(400).send({
  				status:res.statusCode,
  				message:'Cooperative have no Store yet!'
  			})
  		}

  	}catch(err){
  		return res.status(500).send({
  			status:res.statusCode,
  			message:'Something went wrong!'
  		})
  	}
  }

  // function to update price under administrator privilege

  static async updatePrice (req,res){
  	// update price consider product and quality
	  	try{
	  		const { productName, quality, price} = req.body;
		  	// find the existing price of this product and quality
		  	const Op = Sequelize.Op;
		  	const findOne = await Store.findOne({where:{[Op.and]:[{productName},{quality}]}});
		  	if (findOne) {
		  		// if found update price
		  		const Prev_Price = findOne.price;
		  		return await findOne.update({price}).then(priceResult => {
		  			return res.status(200).send({
		  				status:res.statusCode,
		  				message:'Price has been updated successfully!',
		  				Prev_Price,
		  				data:{
		  					priceResult
		  				}
		  			})
		  		})
		  	} else {
		  		// findone failed
		  		return res.status(400).send({
		  			status:res.statusCode,
		  			message:'commodities not found!'
		  		})
		  	}
	  	}catch(err){
	  		return res.status(500).send({
	  			status:res.statusCode,
	  			message:'Something went wrong on server!'
	  		})
	  	}
  	}

  // function to gets all store details undet administrator privilege

  static async storeDetails(req,res){
  	// select all store details
	  	try{
	  		const findAll = await Store.findAll();
		  	if (findAll) {
		  		const data = [];
		  		for(const element of findAll){
		  			data.push(element);
		  		}
		  		return res.status(200).send({
		  			status:res.statusCode,
		  			message:'Store details retrieved successfully!',
		  			data
		  		})
		  	} else {
		  		return res.status(400).send({
		  			status:res.statusCode,
		  			message:'There is no Store yet!'
		  		})
		  	}
	  	}catch(err){
	  		return res.status(500).send({
	  			status:res.statusCode,
	  			message:'Something went wrong on server!',
	  		})
	  	}
  	}

  // function to edit store details under administrator privilege

  static async updateStore(req,res){
  	// destruct storeid from params
  	try{
  		const {StoreId} = req.params;
  	
  		const edit = await Store.update({...req.body},{where:{id:StoreId}});
  		if (edit) {
  			return res.status(200).send({
  				status:res.statusCode,
  				message:'Commodities updated successfully!',
  			})
  		}
  	}catch(err){
  		console.log(err)
  		return res.status(500).send({
  			status:res.statusCode,
  			message:'Something went wrong on server!'
  		})
  	}
  }

}

export default store;
