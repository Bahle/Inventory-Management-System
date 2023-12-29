var router = require('express').Router();
var mysql = require('mysql');
var pool = require('../connection');

function get(req, res) {
	var columns = req.query.columns || '*';
	if(columns == 'undefined') columns = '*';

	if( req.query.id === undefined ) {
		pool.getConnection(function(err, con) {
			con.query(`SELECT ${columns} FROM customer`, function(err, dbResults) {
				con.release();
				if (err) throw err;

				res.json(dbResults);
			});
		});
	} else {
		var id = req.query.id;
		
		pool.getConnection(function(err, con) {
			con.query(`SELECT * FROM customer WHERE customer_id = ${id}`, function(err, dbResults) {
				con.release();
				if (err) throw err;

				res.json(dbResults);
			});
		});
	}
}


function create(req, res) {
	var name = req.body.name,
		address = req.body.address,
		account_no = req.body.account_no,
		tel_no = req.body.tel_no,
		mark_up = req.body.mark_up;

	pool.getConnection(function(err, con) {
		con.query(`INSERT INTO customer(name, address, account_no, tel_no, mark_up) VALUES ('${name}', '${address}', '${account_no}', '${tel_no}', '${mark_up}')`, function(err, dbResults) {
			con.release();
			if (err) throw err;

			res.json({results: 'success'});
		});
	});
}

function update(req, res) {
	var customer_id = req.body.id,
		name = req.body.name,
		address = req.body.address,
		account_no = req.body.account_no,
		tel_no = req.body.tel_no,
		mark_up = req.body.mark_up;;

	pool.getConnection(function(err, con) {
		con.query(`UPDATE customer SET name = '${name}', address = '${address}', account_no = '${account_no}', tel_no = '${tel_no}', mark_up = '${mark_up}' WHERE customer_id = ${customer_id}`, function(err, dbResults) {
			con.release();
			if (err) throw err;

			res.json({results: 'success'});
		});
	});
}

function remove(req, res) {
	var customer_id = req.query.id;

	pool.getConnection(function(err, con) {
		con.query(`DELETE FROM customer WHERE customer_id = ${customer_id}`, function(err, dbResults) {
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

module.exports = router;