const { searchData } = require('../esService');

module.exports = function (app) {
	app.get('/search', (req, res) => {
		// localhost:4000/search?page=0&phrase=Book&filter[category]=0&filter[type]=book

		const { phrase, page, filter } = req.query;
		const query = phrase ? {
			bool : {
			  must : {
				multi_match : {
				  query : phrase,
				  fields : [ 'name' ],
				  fuzziness : 2
				}
			  },
			  filter: []
			}
		  } : {
			bool : {
			  must : {
				match_all : {}
			  },
			  filter: []
			}
		  };

		  if (filter && filter.category) {
			query.bool.filter.push(
				{term : { 'categoryId' : filter.category }}
			);
		  }
		  
		  const size = 5;

		  const from = !page ? 0 : (page === 0 ? 0 : size * page);

		  const body = {
			  query,
			  size,
			  from
		  }
			return searchData('product', body)
				.then(results => {
					const total = results.hits.total;
					const data = results.hits.hits.map(result => result._source);
					return res.send({data, total})
				})
	});
};
