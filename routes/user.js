var router = require('express').Router();
var mysql = require('mysql');
var crypto = require('crypto');
var pool = require('../connection');

function get(req, res) {
	var columns = req.query.columns || '*';
	if(columns == 'undefined') columns = '*';
	
	if( req.query.id === undefined ) {
		// specify which columns are required
		pool.getConnection(function(err, con) {
			con.query(`SELECT ${columns} FROM admin`, function(err, dbResults) {
				con.release();
				if (err) throw err;

				res.json(dbResults);
			});
		});
	} else {
		var id = req.query.id;
		
		pool.getConnection(function(err, con) {
			console.log(`SELECT ${columns} FROM admin WHERE admin_id = ${id}`);

			con.query(`SELECT ${columns} FROM admin WHERE admin_id = ${id}`, function(err, dbResults) {
				con.release();
				if (err) throw err;

				res.json(dbResults);
			});
		});
	}
}

function create(req, res) {
	var email = req.body.email,
		password = crypto.createHash('sha1').update(req.body.password, 'utf8').digest('hex'),
		first_name = req.body.first_name,
		last_name = req.body.last_name,
		gender = req.body.gender,
		store = req.body.store,
		privileges = req.body.privileges;

	pool.getConnection(function(err, con) {
		con.query(`INSERT INTO admin(email, password, first_name, last_name, gender, store, privileges) VALUES ('${email}', '${password}', '${first_name}', '${last_name}', '${gender}', '${store}', '${privileges}')`, function(err, dbResults) {
			con.release();
			if (err) throw err;

			res.json({results: 'success'});
		});
	});
}

function update(req, res) {
	var user_id = req.body.id,
		email = req.body.email,
		password = crypto.createHash('sha1').update(req.body.password, 'utf8').digest('hex'),
		first_name = req.body.first_name,
		last_name = req.body.last_name,
		gender = req.body.gender,
		store = req.body.store,
		privileges = req.body.privileges;

	/*
password = crypto.createHash('sha1').update(req.body.password, 'utf8').digest('hex');*/

	pool.getConnection(function(err, con) {
		con.query(`UPDATE supplier SET email = '${email}', password = '${password}', first_name = '${first_name}', last_name = '${last_name}', gender = '${gender}', store = '${store}', privileges = '${privileges}'  WHERE user_id = ${user_id}`, function(err, dbResults) {
			con.release();
			if (err) throw err;

			res.json({results: 'success'});
		});
	});
}

function remove(req, res) {
	var admin_id = req.query.id;

	pool.getConnection(function(err, con) {
		con.query(`DELETE FROM admin WHERE admin_id = ${admin_id}`, function(err, dbResults) {
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