var express = require('express');
var mysql = require('mysql');
var cors = require('cors');
var crypto = require('crypto');
var bodyParser = require('body-parser');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
const path = require('path');

var router = express.Router(); //, 
	// Supplier = require( './controllers/Supplier' )(),
	///Public = require( './controllers/Public' )(); 

var app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(path.resolve(__dirname, './client/build')));

const PORT = process.env.PORT || 5000;

// var con = mysql.createConnection({
//   host: "127.0.0.1",
//   user: "root",
//   password: "",
//   database: "pharmacy"
// });

/*var con = mysql.createConnection({
  host: "us-cdbr-iron-east-04.cleardb.net",
  user: "bb0981c7c6fcc0",
  password: "7ed34ca0",
  database: "heroku_6c2a2cfdeb5cf35"
});*/

/*var pool  = mysql.createPool({
  host: "us-cdbr-iron-east-04.cleardb.net",
  user: "bb0981c7c6fcc0",
  password: "7ed34ca0",
  database: "heroku_6c2a2cfdeb5cf35"
})*/

/*var pool  = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "pharmacy",
}) */

/*app.get('/test', function(req, res) {
	pool.getConnection(function(err, con) {
		con.query('SELECT * FROM admin', function(err, dbResults) {
			con.release();
			console.log('RESULTS FROM DATABASE');

			 // Handle error after the release.
    		if (err) throw err;

			console.log( JSON.stringify(dbResults) );

			res.json({
				data: crypto.createHash('sha1').update('123456', 'utf8').digest('hex')
			});
		});
	});
});*/

app.get('/test', function(req, res) {
	// console.log(`res.body.name`);
	res.send('hello world');
});

app.post('/Test', function(req, res) {
	console.log(`${req.body.name}`);
	res.json({status: 'okay'});
});

app.get('/migrate-prices', function(req, res) {
	res.json({
		data: 'data already written' //crypto.createHash('sha1').update('123456', 'utf8').digest('hex')
	});

	return;

	pool.getConnection(function(err, con) {
		//con.query('INSERT INTO product_receive(supplier, invoice_no, date_issued, date_created) VALUES (?, ?, ?, ?)', [1, '487GFGJ', '2018-07-01', 'CURRENT_TIMESTAMP'], function(err, dbResults) {
		con.query('SELECT product_id, quantity, price FROM product ', function(err, results) {
			results.forEach((r, i) => {
				con.query('INSERT INTO product_receive_details(product_receive,	product, quantity, amount_per_unit) VALUES (?, ?, ?, ?)', [7, r.product_id, r.quantity, r.price], function(err, dbResults) {
					if(i == results.length - 1) {
						con.release();

						res.json({
							data: 'success'
						});
					}

					 // Handle error after the release.
		    		if (err) throw err;

					/* console.log( JSON.stringify(dbResults) );

					res.json({
						data: 'success' //crypto.createHash('sha1').update('123456', 'utf8').digest('hex')
					}); */


				});
			});
		});
	});
});

app.get('/testing', function(req, res) {
	res.send('Hello World');
});

app.use( '/', require('./routes/public') );
app.use( '/supplier', require('./routes/supplier') );
app.use( '/product', require('./routes/product') );
app.use( '/customer', require('./routes/customer') );
app.use( '/receive', require('./routes/receive') );
app.use( '/distribution', require('./routes/distribution') );
app.use( '/admin', require('./routes/user') );
app.use( '/sales', require('./routes/user') );

app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

var server = app.listen(PORT, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listeningzzza at http://%s:%s', host, port);
});