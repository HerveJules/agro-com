import db from './models';

const {store} = db;

// class for store operation controller

class store{
	// function to add product to store
	static async addStore(req,res){
		// destruct data from body
		const {productName,quality,quantity,storeStation,MaxLifetime} = req.body
		const add = await store.create({
			
		})
	}
}