var router = require('express').Router();
var mysql = require('mysql');
var pool = require('../connection');

function get( req, res ) {
	console.log('getting products');
	if( req.query.id !== undefined ) {
		console.log('22222222222');
		var id = req.query.id;
		
		pool.getConnection(function(err, con) {
			con.query(`SELECT *, description, IFNULL((SELECT SUM(quantity) FROM product_entry WHERE product = ${id}), 0) AS quantity FROM product WHERE product_id = ${id}`, function(err, dbResults) {
				con.release();
				if (err) throw err;

				res.json(dbResults);
			});
		});
	} else if(req.query.diff_price !== undefined) {
		pool.getConnection(function(err, con) {
			con.query(`SELECT product_id, name, pack_size, SUM(prd.quantity) AS total_quantity, barcode, product_code, p.mark_up FROM product p, product_receive_details prd WHERE p.product_id = prd.product AND fulfilled = 0 AND prd.quantity <> 0 GROUP BY p.product_id`, function(err, dbResults) { // prd.amount_per_unit AS price
				if (err) throw err;
				// SELECT product_id, name, pack_size, prd.quantity AS receive_quantity, p.mark_up, prd.amount_per_unit AS price, SUM(dd.quantity) FROM product p, product_receive_details prd, distribution_details dd WHERE p.product_id = prd.product AND dd.product = p.product_id AND fulfilled = 0 AND prd.quantity <> 0
				
				dbResults.forEach((result, i) => {
					// console.log(`What is res? ${res.product_id}`);
					
					con.query(`SELECT amount_per_unit from product_receive_details WHERE product = ${result.product_id} ORDER BY product_receive_details_id DESC LIMIT 1`, function(err3, dbResults3) {
						if (err3) {
							con.release(); // is this necessary?

							throw err3;
						}

						dbResults[i].price = dbResults3[0].amount_per_unit;

						// console.log(`SELECT SUM(quantity) AS distribute_quantity FROM distribution_details WHERE product = ${result.product_id} GROUP BY product`);
						con.query(`SELECT SUM(quantity) AS distribute_quantity FROM distribution_details WHERE product = ${result.product_id} GROUP BY product`, function(err2, dbResults2) {
							if (err2) {
								con.release(); // is this necessary?

								throw err2;
							}

							console.log(JSON.stringify(dbResults2));
							dbResults[i].total_quantity -= dbResults2.length == 0 ? 0 : dbResults2[0].distribute_quantity;

							if(i == dbResults.length - 1) {
								con.release();
						
								res.json(dbResults);
							}
						});
					});
				});
			});
		});
	} else {
		console.log('11111111111');

		// specify which columns are required
		var columns = req.query.columns || '*';
	
		pool.getConnection(function(err, con) {
			// con.query(`SELECT ${columns} FROM product`, function(err, dbResults) {
			con.query(`SELECT *, @id := product_id, IFNULL((SELECT SUM(quantity) FROM product_entry WHERE product = @id), 0) AS quantity FROM product`, function(err, dbResults) {
				con.release();
				if (err) throw err;

				res.json(dbResults);
			});
		});
	}
}

function create(req, res) {
	var product_code = req.body.product_code,
		name = req.body.name,
		description = req.body.description,
		strength = req.body.strength,
		types = req.body.types,
		additional_info = req.body.additional_info,
		pack_size = req.body.pack_size,
		mark_up = req.body.mark_up,
		min_stock_level = req.body.min_stock_level,
		barcode = req.body.barcode;
	
	pool.getConnection(function(err, con) {
		con.query(`INSERT INTO product(product_code, name, description, strength, types, additional_info, pack_size, mark_up, min_stock_level, barcode, date_created, date_updated)
					VALUES ('${product_code}', '${name}', '${quantity}', '${description}', '${strength}', '${types}', '${additional_info}', '${pack_size}', '${mark_up}', '${min_stock_level}', '${barcode}', CURRENT_TIMESTAMP, NULL)`, function(err, dbResults) {
			con.release();
			if (err) throw err;

			res.json({results: 'success'});
		});
	});
}

function update(req, res) {
	var product_id = req.body.id,
		product_code = req.body.product_code,
		name = req.body.name,
		description = req.body.description,
		strength = req.body.strength,
		types = req.body.types,
		additional_info = req.body.additional_info,
		pack_size = req.body.pack_size,
		mark_up = req.body.mark_up,
		min_stock_level = req.body.min_stock_level,
		barcode = req.body.barcode;

	console.log(`UPDATE product SET product_code = '${product_code}', name = '${name}', description = '${description}', additional_info = '${additional_info}', strength = '${strength}', types = '${types}', pack_size = '${pack_size}', mark_up = '${mark_up}', min_stock_level = '${min_stock_level}', barcode = '${barcode}', date_updated = CURRENT_TIMESTAMP WHERE product_id = ${product_id}`);
	
	pool.getConnection(function(err, con) {
		con.query(`UPDATE product SET product_code = '${product_code}', name = '${name}', description = '${description}', strength = '${strength}', additional_info = '${additional_info}', types = '${types}', pack_size = '${pack_size}', mark_up = '${mark_up}', min_stock_level = '${min_stock_level}', barcode = '${barcode}', date_updated = CURRENT_TIMESTAMP WHERE product_id = ${product_id}`, function(err, dbResults) {
			con.release();
			if (err) throw err;

			res.json({results: 'success'});
		});
	});
}

function remove(req, res) {
	var product_id = req.query.id;
	
	pool.getConnection(function(err, con) {
		con.query(`DELETE FROM product WHERE product_id = ${product_id}`, function(err, dbResults) {
			con.release();
			if (err) throw err;

			res.json({results: 'success'});
		});
	});
}

function newStock(req, res) {
	console.log('newStock happeneing 1')
	const { id, newStock } = req.body;

	pool.getConnection(function(err, con) {
		con.query(`INSERT INTO product_entry (product, quantity) VALUES (${id}, ${newStock})`, function(err, dbResults) {
			console.log('newStock happeneing 2')
			con.release();
			if (err) throw err;

			res.json({results: 'success'});
		});
	});	
}

router.route( '/' ) // /
       .get( get )
       .post( create )
       .delete( remove )
       .put( update );


router.route('/new-stock').post( newStock );
/*router.route( '/:id' )
      .get( get );*/

module.exports = router;