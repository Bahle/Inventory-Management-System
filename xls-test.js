var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");
var mysql = require('mysql');

app.use(bodyParser.json());

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
});

var upload = multer({ //multer settings
    storage: storage,
    fileFilter : function(req, file, callback) { //file filter
        if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
            return callback(new Error('Wrong extension type'));
        }
        callback(null, true);
    }
}).single('file');

var pool  = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "pharmacy",
})

/** API path that will upload the files */
app.post('/upload', function(req, res) {
    var exceltojson;
    upload(req,res,function(err){
        if(err){
             res.json({error_code:1,err_desc:err});
             return;
        }
        /** Multer gives us file info in req.file object */
        if(!req.file){
            res.json({error_code:1,err_desc:"No file passed"});
            return;
        }
        /** Check the extension of the incoming file and
         *  use the appropriate module
         */
        if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx'){
            exceltojson = xlsxtojson;
        } else {
            exceltojson = xlstojson;
        }
        try {
            exceltojson({
                input: req.file.path,
                output: null, //since we don't need output.json
                lowerCaseHeaders:true
            }, function(err,result){
                if(err) {
                    return res.json({error_code:1,err_desc:err, data: null});
                }
                res.json({error_code:0,err_desc: null, data: result});
            });
        } catch (e) {
            res.json({error_code: 1, err_desc: "Corupted excel file"});
        }
    })
});

function lastInsertID(con) {
	return new Promise((resolve, reject) => {
		// pool.getConnection(function(err, con) {
		con.query(`SELECT LAST_INSERT_ID() AS last_record`, function(err, dbResults) {
			if (err) {
				reject(err);
			} else {
				console.log('GOT!!!' + JSON.stringify(dbResults))

				resolve(dbResults[0].last_record);
			}
		});
		// });
	});
}


app.post('/upload-read', function(req, res) {
    var exceltojson;
    upload(req,res,function(err){
        if(err){
             res.json({error_code:1,err_desc:err});
             return;
        }
        /** Multer gives us file info in req.file object */
        if(!req.file){
            res.json({error_code:1,err_desc:"No file passed"});
            return;
        }
        /** Check the extension of the incoming file and
         *  use the appropriate module
         */
        if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx'){
            exceltojson = xlsxtojson;
        } else {
            exceltojson = xlstojson;
        }
        try {
            exceltojson({
                input: req.file.path,
                output: null, //since we don't need output.json
                lowerCaseHeaders:true
            }, function(err,result){
                if(err) {
                    return res.json({error_code:1,err_desc:err, data: null});
                }
                //res.json({error_code:0,err_desc: null, data: result});

                var startDate,
                	output = [];

                result.forEach(res => {
                	if(res.startdate == 'STOCK CODE' || res.startdate == 'DEPARTMENT') {
                		var i = 0;
                		for(field in res) {
                			if(i == 4) {
                				// console.log('The start date is! ', field);
                				startDate = field;

                				break;
                			}

                			i++;
                		}

                		return;
                	}
                	
                	var record = {};

                	record['stock_code'] = res.startdate;
                	record['quantity'] = parseInt(res['endate:'].split(' ')[0]);
                	record['amount_per_unit'] = (parseInt(res.product) + parseInt(res['all products'])) / parseInt(res['endate:'].split(' ')[0]);

                	output.push(record);
                });

                pool.getConnection(function(err, con) {
                	let stockIDs = {}, notExist = Object.assign([], output.map(a => a.stock_code));
                	// con.query(`SELECT COUNT(*) AS record_count FROM product WHERE product_code IN (` + output.map(a => "'" + a.stock_code + "'") + `)`, function(err, dbResults) {
                	con.query(`SELECT id, product_code FROM product WHERE product_code IN (` + output.map(a => "'" + a.stock_code + "'") + `)`, function(err, dbResults) {
                		if (err) throw err;

						/* // if the number of records whose stock_codes exist in the db is less than the total number of stock_codes entered
                		if(dbResults[0].record_count < output.length) {
                			// res.send('Some records do not exist in the database');
                			console.log('Some records do not exist in the database');
                			// res.json({error_code: 0, err_desc: null, data: output});

                			return;
                		} */

                		dbResults.foreach((a, i) => {
                			stockIDs[a.product_code] = a.id;

                			notExist = notExist.filter(b => b.stock_code != a.product_code);
                		});

                		con.query(`INSERT INTO product_receive(supplier, invoice_no, date_issued, date_created) VALUES (1, '', '${startDate}', CURRENT_TIMESTAMP)`, function(err, dbResults) {
                			if (err) throw err;

                			lastInsertID(con)
                				.then((id) => {
                					output.forEach((p, i) => {
                						// if(p.name !== '') { // catering for last record is always an empty row with blank values
                							con.query(`INSERT INTO product_receive_details(product_receive, product, quantity, amount_per_unit) VALUES
                								(${id}, ${stockIDs[p.stock_code]}, ${p.quantity}, ${p.amount_per_unit})`, (err, dbResults) => {
                									if (err) throw err;

                									// if all records have been inserted return sucess message
                									if(i == output.length-1) { // -2 because have extra row that is blank
                										con.release();
                										res.json({results: 'success'});
                									}
                								});
                						// }
                					});
                				}).catch(err => {throw err;});
                		});
                	});
                });

                res.json({error_code: 0, err_desc: null, data: output});
            });
        } catch (e) {
            res.json({error_code: 1, err_desc: "Corupted excel file"});
        }
    })
});

app.get('/',function(req,res){
    res.sendFile(__dirname + "/index.html");
});
app.listen('4000', function(){
    console.log('running on 4000...');
});