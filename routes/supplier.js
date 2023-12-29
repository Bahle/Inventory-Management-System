var router = require('express').Router();
var mysql = require('mysql');
var pool = require('../connection');

function get(req, res) {
	var columns = req.query.columns || '*';
	if(columns == 'undefined') columns = '*';
	
	if( req.query.id === undefined ) {
		// specify which columns are required
		pool.getConnection(function(err, con) {
			con.query(`SELECT ${columns} FROM supplier`, function(err, dbResults) {
				con.release();
				if (err) throw err;

				res.json(dbResults);
			});
		});
	} else {
		var id = req.query.id;
		
		pool.getConnection(function(err, con) {
			console.log(`SELECT ${columns} FROM supplier WHERE supplier_id = ${id}`);

			con.query(`SELECT ${columns} FROM supplier WHERE supplier_id = ${id}`, function(err, dbResults) {
				con.release();
				if (err) throw err;

				res.json(dbResults);
			});
		});
	}
}

function create(req, res) {
	var name = req.body.name,
		account_no = req.body.account_no,
		city = req.body.city,
		tel_no = req.body.tel_no,
		vat = req.body.vat;

	pool.getConnection(function(err, con) {
		con.query(`INSERT INTO supplier(name, account_no, city, tel_no, vat) VALUES ('${name}', '${account_no}', '${city}', '${tel_no}', '${vat}')`, function(err, dbResults) {
			con.release();
			if (err) throw err;

			res.json({results: 'success'});
		});
	});
}

function update(req, res) {
	var supplier_id = req.body.id,
		name = req.body.name,
		account_no = req.body.account_no,
		city = req.body.city,
		tel_no = req.body.tel_no,
		vat = req.body.vat;

	pool.getConnection(function(err, con) {
		con.query(`UPDATE supplier SET name = '${name}', account_no = '${account_no}', city = '${city}', tel_no = '${tel_no}', vat = '${vat}' WHERE supplier_id = ${supplier_id}`, function(err, dbResults) {
			con.release();
			if (err) throw err;

			res.json({results: 'success'});
		});
	});
}

function remove(req, res) {
	var supplier_id = req.query.id;

	pool.getConnection(function(err, con) {
		con.query(`DELETE FROM supplier WHERE supplier_id = ${supplier_id}`, function(err, dbResults) {
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