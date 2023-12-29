var express = require('express');
var mysql = require('mysql');
var cors = require('cors');
var crypto = require('crypto');
var bodyParser = require('body-parser');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

var router = express.Router(), 
	Supplier = require( './controllers/supplier' )(); 

var app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(cors());

const PORT = process.env.PORT || 5000;

var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "pharmacy"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected Successfully!");
});

app.get('/test', function(req, res) {
	con.query('SELECT * FROM admin', function(err, dbResults) {
		console.log('RESULTS FROM DATABASE');

		console.log( JSON.stringify(dbResults) );

		// res.json( dbResults );

		// res.json( req.query );

		res.json({
			data: crypto.createHash('sha1').update('123456', 'utf8').digest('hex')
		});
	});
});

app.post('/sign-in', function(req, res) {
	var username = req.body.username,
		password = crypto.createHash('sha1').update(req.body.password, 'utf8').digest('hex');

	var loginStatus = 0;

	con.query(`SELECT * FROM admin WHERE email = \'${username}\' AND password = \'${password}\'`, function(err, dbResults) {
		if (err) throw err;

		if(dbResults.length !== 0) {
			loginStatus = 1;
		}

		res.json({status: loginStatus});
	});
});

app.get('/', function(req, res) {
	res.send('Hello World');
});

// SUPPLIER
app.get('/suppliers', function(req, res) {
	con.query(`SELECT * FROM supplier`, function(err, dbResults) {
		if (err) throw err;

		res.json(dbResults);
	});
});

app.get('/supplier', function(req, res) {
	var id = req.query.id;
	
	con.query(`SELECT * FROM supplier WHERE supplier_id = ${id}`, function(err, dbResults) {
		if (err) throw err;

		res.json(dbResults);
	});
});

app.post('/add-supplier', function(req, res) {
	var name = req.body.name,
		account_no = req.body.account_no,
		city = req.body.city,
		tel_no = req.body.tel_no,
		vat = req.body.vat;

	con.query(`INSERT INTO supplier(name, account_no, city, tel_no, vat) VALUES ('${name}', '${account_no}', '${city}', '${tel_no}', '${vat}')`, function(err, dbResults) {
		if (err) throw err;

		res.json({results: 'success'});
	});

});

app.put('/update-supplier', function(req, res) {
	var supplier_id = req.body.supplier_id,
		name = req.body.name,
		account_no = req.body.account_no,
		city = req.body.city,
		tel_no = req.body.tel_no,
		vat = req.body.vat;

	con.query(`UPDATE supplier SET name = '${name}', account_no = '${account_no}', city = '${city}', tel_no = '${tel_no}', vat = '${vat}' WHERE supplier_id = ${supplier_id}`, function(err, dbResults) {
		if (err) throw err;

		res.json({results: 'success'});
	});
});

app.delete('/delete-supplier', function(req, res) {
	var supplier_id = req.query.supplier_id;

	console.log(`DELETE FROM supplier WHERE supplier_id = ${supplier_id}`);
	con.query(`DELETE FROM supplier WHERE supplier_id = ${supplier_id}`, function(err, dbResults) {
		if (err) throw err;

		res.json({results: 'success'});
	});
});

// PRODUCT
app.get('/products', function(req, res) {
	con.query(`SELECT * FROM stock`, function(err, dbResults) {
		if (err) throw err;

		res.json(dbResults);
	});
});

app.get('/product', function(req, res) {
	var id = req.query.id;
	
	con.query(`SELECT * FROM stock WHERE stock_id = ${id}`, function(err, dbResults) {
		if (err) throw err;

		res.json(dbResults);
	});
});

app.post('/add-product', function(req, res) {
	var product_code = req.body.product_code,
		name = req.body.name,
		quantity = req.body.quantity,
		description = req.body.description,
		strength = req.body.strength,
		types = req.body.types,
		pack_size = req.body.pack_size,
		mark_up = req.body.mark_up,
		min_stock_level = req.body.min_stock_level,
		barcode = req.body.barcode,
		date_created = req.body.date_created,
		date_updated = req.body.date_updated;

	console.log(`INSERT INTO stock(product_code, name, quantity, description, strength, types, pack_size, mark_up, min_stock_level, barcode, date_created, date_updated)
				VALUES ('${product_code}', '${name}', '${quantity}', '${description}', '${strength}', '${types}', '${pack_size}', '${mark_up}', '${min_stock_level}', '${barcode}', '${date_created}', '${date_updated}')`);
	con.query(`INSERT INTO stock(product_code, name, quantity, description, strength, types, pack_size, mark_up, min_stock_level, barcode, date_created, date_updated)
				VALUES ('${product_code}', '${name}', '${quantity}', '${description}', '${strength}', '${types}', '${pack_size}', '${mark_up}', '${min_stock_level}', '${barcode}', '${date_created}', '${date_updated}')`, function(err, dbResults) {
		if (err) throw err;

		res.json({results: 'success'});
	});

});

app.put('/update-product', function(req, res) {
	var stock_id = req.body.stock_id,
		name = req.body.name,
		account_no = req.body.account_no,
		city = req.body.city,
		tel_no = req.body.tel_no,
		vat = req.body.vat;

	con.query(`UPDATE stock SET name = '${name}', account_no = '${account_no}', city = '${city}', tel_no = '${tel_no}', vat = '${vat}' WHERE stock_id = ${stock_id}`, function(err, dbResults) {
		if (err) throw err;

		res.json({results: 'success'});
	});
});

app.delete('/delete-product', function(req, res) {
	var stock_id = req.query.stock_id;

	console.log(`DELETE FROM stock WHERE stock_id = ${stock_id}`);
	con.query(`DELETE FROM stock WHERE stock_id = ${stock_id}`, function(err, dbResults) {
		if (err) throw err;

		res.json({results: 'success'});
	});
});

var server = app.listen(PORT, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});