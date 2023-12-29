var router = require('express').Router();
var mysql = require('mysql');
var pool = require('../connection');
var lastInsertID = require('../functions/lastInsertID');

function get(req, res) {
	if( req.query.id === undefined ) {
		pool.getConnection(function(err, con) {
			con.query(`SELECT d.distribution_id, c.name, SUM(dd.retail) AS total_retail, d.date_distributed FROM distribution d, Customer c, distribution_details dd WHERE c.customer_id = d.customer AND dd.distribution = d.distribution_id GROUP BY d.distribution_id`, function(err, dbResults) {
				con.release();
				if (err) throw err;

				res.json(dbResults);
			});
		});
	} else {
		var id = req.query.id;
		
		pool.getConnection(function(err, con) {
			con.query(`SELECT d.distribution_id, c.name, d.date_distributed FROM distribution d, Customer c WHERE d.distribution_id = ${id} AND c.customer_id = d.customer`, function(err, dbResults) {
			//con.query(`SELECT pr.product_receive_id, s.name, s.vat, pr.date_issued, pr.invoice_no FROM product_receive pr, supplier s WHERE pr.supplier = s.supplier_id AND pr.product_receive_id = ${id}`, function(err, dbResults) {
			// con.query(`SELECT * FROM product_receive WHERE product_receive_id = ${id}`, function(err, dbResults) {
				if (err) throw err;

				var d_id = dbResults[0].distribution_id;
				dbResults[0].products = [];

				// distribution_details_id 	distribution 	product 	quantity 	retail 
				con.query(`SELECT p.name, dd.quantity, dd.retail FROM product p, distribution_details dd WHERE dd.product = p.product_id AND dd.distribution = ${d_id}`, function(err, dbResults2) {
					con.release();
					if (err) throw err;
					
					dbResults[0].products = dbResults2;

					res.json(dbResults);
				});
			});
		});
	}
}

function create(req, res) {
	var destination = req.body.destination,
		date = req.body.date,
		products = req.body.products;

		/* console.log('destination:', destination);
		console.log('date:', destination);
		console.log('products:', JSON.stringify(products));
		return; 
		*/

	pool.getConnection(function(err, con) {
		// distribution_id 	customer 	date_distributed 	date_created 
		con.query(`INSERT INTO distribution(customer, date_distributed, date_created) VALUES (${destination}, '${date}', CURRENT_TIMESTAMP)`, function(err, dbResults) {
			if (err) throw err;

			lastInsertID(con)
				.then((id) => {
					products.forEach((p, i) => {
						// distribution_details_id 	distribution 	product 	quantity
						if(p.name !== '') { // catering for last record is always an empty row with blank values
							con.query(`INSERT INTO distribution_details(distribution, product, quantity, retail) VALUES
								(${id}, ${p.key}, ${p.quantity}, ${p.retail})`, (err, dbResults) => {
									if (err) throw err;

									// if all records have been inserted return sucess message
									if(i == products.length-2) { // -2 because have extra row that is blank
										con.release();
										res.json({results: 'success'});
									}
								});
						}
					});
				}).catch(err => {throw err;});
		});
	});
}

function remove(req, res) {
	var id = req.query.id;

	pool.getConnection(function(err, con) {
		con.query(`DELETE FROM distribution WHERE distribution_id = ${id}`, function(err, dbResults) {
			con.release();
			if (err) throw err;

			res.json({results: 'success'});
		});
	});
}

router.route( '/' ) // /
       .get( get )
       .post( create )
       .delete( remove );

module.exports = router;