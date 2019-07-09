import db from "../models";
import Sequelize from "sequelize";
import cloud from "../helpers/clouds";
const { Store, Coop, User, Auction} = db;

// class for store operation controller

class store {
  // function to add product to store

  static async addStore(req, res) {
  	// destruct params and req body
		try {
			const {coopName,productName,quality,quantity,price} = req.body;
			const findCooperative = await Coop.findOne({where: { coopName },include:[Store]})
			if (findCooperative.Stores.length !==0 ) {
				// update the existing store
				const quantity = +findCooperative.Stores[0].quantity + +req.body.quantity;
				for(const element of findCooperative.Stores){
					// confirm wether there is a strore of same product to coop
					if (element.productName === req.body.productName && element.quality === req.body.quality) {
						return await element.update({quantity}).then((updateResult)=>{
							return res.render('add-store',{
								user:req.user.userFind,
						        role:{
						            isEax:req.user.role.isEax(req.user.userFind),
						            isCoop:req.user.role.isCoop(req.user.userFind),
						            isBidder:req.user.role.isBidder(req.user.userFind),
						        },
								message:'Store has been updated successfully!',
							})
						})
					}
				}
				// if there is no existing same product then add new product to store
				return await Store.create({...req.body,CoopId:findCooperative.id}).then((addResult)=>{
					return res.render('add-store',{
						user:req.user.userFind,
						role:{
						    isEax:req.user.role.isEax(req.user.userFind),
						    isCoop:req.user.role.isCoop(req.user.userFind),
						    isBidder:req.user.role.isBidder(req.user.userFind),
						},
						status:res.statusCode,
						message:'Store has been Added successfully!'
					})
				})
						
				}else{
					// create new store for the first time 
					return await Store.create({...req.body,CoopId:findCooperative.id}).then((createResult)=>{
						return res.render('add-store',{
							user:req.user.userFind,
							role:{
						        isEax:req.user.role.isEax(req.user.userFind),
						        isCoop:req.user.role.isCoop(req.user.userFind),
						        isBidder:req.user.role.isBidder(req.user.userFind),
						    },
							status:res.statusCode,
							message:`Store has been created successfully!`,
						})
					})
				}

		} catch (error) {
			return res.render('500');
		}
  }

  // function that is going to update store and publish to auction

  static async publish(req, res) {
    //find product with tin
    try{
    	const {productName,quality, quantity } = req.body;
    	const findOne = await User.findOne({where:{id:req.user.userFind.id},include:[{model:Coop,include:[Store]}]});

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
		    				return res.render('publish',{
		    					status:res.statusCode,
		    					user:req.user.userFind,
			    				role:{
							        isEax:req.user.role.isEax(req.user.userFind),
							        isCoop:req.user.role.isCoop(req.user.userFind),
							        isBidder:req.user.role.isBidder(req.user.userFind),
							    },
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
    		return res.render('publish',{
    			user:req.user.userFind,
				role:{
					isEax:req.user.role.isEax(req.user.userFind),
					isCoop:req.user.role.isCoop(req.user.userFind),
					isBidder:req.user.role.isBidder(req.user.userFind),
				},
    			message:'Request not fit the acceptance!'
    		})		
    	}
    	// the store is empty
    	return res.render('publish',{
    		user:req.user.userFind,
			role:{
				isEax:req.user.role.isEax(req.user.userFind),
				isCoop:req.user.role.isCoop(req.user.userFind),
				isBidder:req.user.role.isBidder(req.user.userFind),
			},
    		status:res.statusCode,
    		message:'Cooperative have no Store yet!'
    	})
    }catch(err){
    	return res.render('500',{
    		user:req.user.userFind,
			role:{
				isEax:req.user.role.isEax(req.user.userFind),
				isCoop:req.user.role.isCoop(req.user.userFind),
				isBidder:req.user.role.isBidder(req.user.userFind),
			},
    		
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
		  			return res.render('Update',{
		  				user:req.user.userFind,
			  			role:{
							isEax:req.user.role.isEax(req.user.userFind),
							isCoop:req.user.role.isCoop(req.user.userFind),
							isBidder:req.user.role.isBidder(req.user.userFind),
						},
		  				message:'Price has been updated successfully!',
		  			})
		  		})
		  	} else {
		  		// findone failed
		  		return res.render('Update',{
		  			user:req.user.userFind,
		  			role:{
						isEax:req.user.role.isEax(req.user.userFind),
						isCoop:req.user.role.isCoop(req.user.userFind),
						isBidder:req.user.role.isBidder(req.user.userFind),
					},
		  			message:'commodities not found!'
		  		})
		  	}
	  	}catch(err){
	  		return res.render('Update',{
	  			message:'Something went wrong on server!'
	  		})
	  	}
  	}

  // function to gets all store details undet administrator privilege

  static async storeDetails(req,res){
  	// select all store details
	  	try{
	  		const findAll = await Store.findAll({
	  			attributes:['productName','quality','quantity','price','storeStation','createdAt']
	  		});
		  	if (findAll) {
		  		return res.render('all-Store',{
		  			user:req.user.userFind,
		  			role:{
						isEax:req.user.role.isEax(req.user.userFind),
						isCoop:req.user.role.isCoop(req.user.userFind),
						isBidder:req.user.role.isBidder(req.user.userFind),
					},
		  			message:'Store details retrieved successfully!',
		  			findAll
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
  		const {productName,quantity,price,quality,id}= req.body;
  		const Op = Sequelize.Op;
  		const coudinary_links = await cloud(req.files);
  		const edit = await Store.update({image:coudinary_links[0],quantity,price},{where:{[Op.and]:[{CoopId:id},{productName},{quality}]}});
  		console.log(edit);
  		if (edit) {
  			return res.render('edit-store',{
  				user:req.user.userFind,
  				role:{
					isEax:req.user.role.isEax(req.user.userFind),
					isCoop:req.user.role.isCoop(req.user.userFind),
					isBidder:req.user.role.isBidder(req.user.userFind),
				},
  				message:'store updated successfully!',
  			})
  		}
  	}catch(err){
  		return res.render('500');
  	}
  }
  // get cooperative whose to add store
  static async storeAddPage(req,res){
		try{
			const findAll = await Coop.findAll({
				attributes:['coopName']
			});
			if (findAll) {
				return res.render('add-store',{
					user:req.user.userFind,
					role:{
						isEax:req.user.role.isEax(req.user.userFind),
						isCoop:req.user.role.isCoop(req.user.userFind),
						isBidder:req.user.role.isBidder(req.user.userFind),
					},
					findAll
				})
			} else {
				return res.render('add-store',{
					message:'There is no cooperative registered yet!'
				})
			}
		}catch(err){
			return res.render('500');
		}
	}
	// get cooperative with it's respective store

	static async storeEditPage(req,res){
		try{
			const {coopName} = req.body;
			const findOne = await Coop.findOne({where:{coopName},include:[Store]});
			if (findOne) {
				return res.render('edit-store',{
					user:req.user.userFind,
					role:{
						isEax:req.user.role.isEax(req.user.userFind),
						isCoop:req.user.role.isCoop(req.user.userFind),
						isBidder:req.user.role.isBidder(req.user.userFind),
					},
					findAll:findOne,
				})
			} else {
				return res.render('edit-store',{
					user:req.user.userFind,
					role:{
						isEax:req.user.role.isEax(req.user.userFind),
						isCoop:req.user.role.isCoop(req.user.userFind),
						isBidder:req.user.role.isBidder(req.user.userFind),
					},
				})
			}

		}catch(err){
			return res.render('500');
		}
	}
	// get info shown in card to delete
	static async getDelInfo(req,res){
		try{
			const{coopName}=req.body;
			const findOne = await Coop.findOne({where:{coopName},include:[Store]});
			console.log(findOne);
			if (findOne) {
				return res.render('del-store',{
					user:req.user.userFind,
					role:{
						isEax:req.user.role.isEax(req.user.userFind),
						isCoop:req.user.role.isCoop(req.user.userFind),
						isBidder:req.user.role.isBidder(req.user.userFind),
					},
					findOne,
					message:`Store has been retrieved successfully`
				})
			} else {
				return res.render('del-store',{
					user:req.user.userFind,
					role:{
						isEax:req.user.role.isEax(req.user.userFind),
						isCoop:req.user.role.isCoop(req.user.userFind),
						isBidder:req.user.role.isBidder(req.user.userFind),
					},
					message:'Store not found'
				})
			}
		}catch(err){
			return res.render('500');
		}
	}

}

export default store;
