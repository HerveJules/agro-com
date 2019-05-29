import db from "../models";

const { Store, Coop } = db;

// class for store operation controller

class store {
  // function to add product to store

  static async addStore(req, res) {
		const { body } = req;
		const { coopName } = req.params;

		try {
			const findCooperative = await Coop.findOne({where: { coopName }})
			if(!findCooperative) {
				return res.status(400).send({
					status: res.statusCode,
					error: 'The cooperative is not found'
				})
			}

			const createStore = await Store.create({ body, coopId: findCooperative.id })
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

  static publish(req, res) {
    //find product with tin
    Store.findById({ where: { id } });
  }
}

export default store;
