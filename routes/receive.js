var router = require('express').Router();
var mysql = require('mysql');
var pool = require('../connection');
var lastInsertID = require('../functions/lastInsertID');

function get(req, res) {
	if( req.query.id === undefined ) {
		console.log('getting 1')
		pool.getConnection(function(err, con) {
			console.log('getting 2')
			con.query(`SELECT pr.product_receive_id, s.name, s.vat, pr.date_issued FROM product_receive pr, supplier s WHERE pr.supplier = s.supplier_id`, function(err, dbResults) {
				console.log('getting 3')
				// con.release();
				if (err) throw err;

				if( dbResults.length == 0 ) { res.json([]); }

				dbResults.forEach((result, i) => {
					console.log('results ' + i)
					var pr_id = result.product_receive_id,
						vat   = result.vat;

					con.query(`SELECT SUM(quantity * amount_per_unit  * (1 + (${vat} * 0.15))) AS total FROM product_receive_details WHERE product_receive = ${pr_id}`, function(err, dbResults2) {
						// con.release();
						if (err) throw err;

						dbResults[i].total = dbResults2[0].total;
						
						if(i == dbResults.length-1) {
							con.release();
				
							res.json(dbResults);
							console.log('getting 4')
						}
					});
				});
			});
		});
	} else {
		var id = req.query.id;
		
		pool.getConnection(function(err, con) {
			con.query(`SELECT pr.product_receive_id, s.name, s.vat, pr.date_issued, pr.invoice_no FROM product_receive pr, supplier s WHERE pr.supplier = s.supplier_id AND pr.product_receive_id = ${id}`, function(err, dbResults) {
			// con.query(`SELECT * FROM product_receive WHERE product_receive_id = ${id}`, function(err, dbResults) {
				if (err) throw err;

				var pr_id = dbResults[0].product_receive_id;
				dbResults[0].products = [];

				con.query(`SELECT p.name, prd.quantity, prd.amount_per_unit FROM product p, product_receive_details prd WHERE prd.product = p.product_id AND prd.product_receive = ${pr_id}`, function(err, dbResults2) {
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
	var supplier = req.body.supplier,
		date = req.body.date,
		invoiceNo = req.body.invoiceNo,
		products = req.body.products;

	pool.getConnection(function(err, con) {
		con.query(`INSERT INTO product_receive(supplier, invoice_no, date_issued, date_created) VALUES (${supplier}, '${invoiceNo}', '${date}', CURRENT_TIMESTAMP)`, function(err, dbResults) {
			if (err) throw err;

			lastInsertID(con)
				.then((id) => {
					products.forEach((p, i) => {
						if(p.name !== '') { // catering for last record is always an empty row with blank values
							con.query(`INSERT INTO product_receive_details(product_receive, product, quantity, amount_per_unit) VALUES
								(${id}, ${p.key}, ${p.quantity}, ${p.price})`, (err, dbResults) => {
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
		con.query(`DELETE FROM product_receive WHERE product_receive_id = ${id}`, function(err, dbResults) {
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

function getProductCostHistory(req, res) {
	var productId = req.query.productId;

	pool.getConnection(function(err, con) {
		console.log(`SELECT s.name, prd.amount_per_unit, pr.date_issued FROM product_receive pr, product_receive_details prd, supplier s WHERE pr.product_receive_id = prd.product_receive AND pr.supplier = s.supplier_id AND prd.product = ${productId}`);

		con.query(`SELECT s.name, prd.amount_per_unit, pr.date_issued FROM product_receive pr, product_receive_details prd, supplier s WHERE pr.product_receive_id = prd.product_receive AND pr.supplier = s.supplier_id AND prd.product = ${productId}`, function(err, dbResults) {
			con.release();
			if(err) throw err;

			res.json(dbResults);
		});
	});
}

router.route('/cost-history')
	.get( getProductCostHistory );

module.exports = router;