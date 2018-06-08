const { indexData } = require('../esService');
const productsMock = require('../mock/products');
const categoriesMock = require('../mock/categories');
const Promise = require('bluebird')

module.exports = function (app) {
	// localhost:4000/indexData
	app.get('/indexData', (req, res) => {
		return Promise.map(productsMock, item => {	
			return indexData('product', 'entries', item.id, item)
		})
		.then(() => {
			return Promise.map(categoriesMock, item => {	
				return indexData('categories', 'entries', item.id, item)
			})	
		})
		.then(() => {
			return res.status(200).send({message: 'success'});
		})
	})
};
