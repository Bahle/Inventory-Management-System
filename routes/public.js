const router = require('express').Router();
const mysql = require('mysql');
const crypto = require('crypto');
const multer  = require('multer');
const xlstojson = require("xls-to-json-lc");
const xlsxtojson = require("xlsx-to-json-lc");
const pool = require('../connection');
const nodemailer = require('nodemailer');
const Airtable = require('airtable');

const csv = require('csv-parser');
const fs = require('fs')

var base = new Airtable({apiKey: 'keyJwCDt3JmVW28wW'}).base('appP5TeDKWPkSz84h');

/*console.log(base)
console.log("-------------------")
console.log(base('User Accounts'))*/

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
        if (['csv'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1].toLowerCase()) === -1) {
            return callback(new Error('Wrong extension type'));
        }
        callback(null, true);
    }
}).single('file');

/*var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "pharmacy"
});*/

function signIn(req, res, next) {
	var username = req.body.username,
		password = crypto.createHash('sha1').update(req.body.password, 'utf8').digest('hex');

	var loginStatus = 0;

	// old code that would get the data from the mysql database
	/*pool.getConnection(function(err, con) {
		con.query(`SELECT * FROM admin WHERE email = \'${username}\' AND password = \'${password}\'`, function(err, dbResults) {
			con.release();
			if (err) throw err;\

			if(dbResults.length !== 0) {
				loginStatus = 1;
			}

			res.json({status: loginStatus});
		});
	});*/

	let privileges;

	base('User Accounts').select({
	    // Selecting the first 3 records in Grid view:
	    // maxRecords: 3,
	    view: "Grid view"
	}).eachPage(function page(records, fetchNextPage) {
	    // This function (`page`) will get called for each page of records.

	    for(const record of records) {
	        console.log('Retrieved', record.get('Email'), record.get('Password'), record.get('Privileges'));
	        if(username == record.get('Email') && password == record.get('Password')) {
	        	loginStatus = 1;
	        	privileges = record.get('Privileges');
	        }
	    }

	    // To fetch the next page of records, call `fetchNextPage`.
	    // If there are more records, `page` will get called again.
	    // If there are no more records, `done` will get called.
	    fetchNextPage();

	}, function done(err) {
	    if (err) { console.error(err); return; }

	    res.json({status: loginStatus, privileges});
	});
}

function signOut(req, res) {  }

function importExcel(req, res) {
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
	        }, async function(err,result){
	            if(err) {
	                return res.json({error_code:1,err_desc:err, data: null});
	            }

	            // res.json({error_code:0,err_desc:null, data: result});

	            /*productcode	""
	            barcode	"39"
	            descripition	"Acnelak"
	            additional info	""
	            strength	""
	            form	"Soap"
	            pack size	"75gm"
	            price	"47.20"*/

	            // product_id	product_code	name	price	quantity	description	strength	types	pack_size	mark_up	min_stock_level	barcode	date_created	date_updated

	            console.log('results length: ' + result.length);

	            
            	/*const connection = await pool.getConnection();

            	await Promise.all(result.map((rec, i) => {
            	    const newRecord = {
            	    	product_code: rec.productcode,
            	    	barcode: rec.barcode,
            	    	name: rec.descripition,
            	    	description: rec['additional info'],
            	    	strength: rec.strength,
            	    	types: rec.form,
            	    	pack_size: rec['pack size'],
            	    	price: rec.price
            	    }

            	    con.query(`INSERT INTO product SET ?`, newRecord, function(err, dbResults) { // SELECT * FROM admin WHERE email = \'${username}\' AND password = \'${password}\'
            	    	if (err) throw err;

            	    	console.log('rec.descripition: ' + rec.descripition);
            	    });

            	    console.log('query.sql' + query.sql);
            	}));*/
	            
            	/*async.each(result, function(rec, callback) {
            		pool.getConnection(function(err, con) {
            			var newRecord = {
            				product_code: rec.productcode,
            				barcode: rec.barcode,
            				name: rec.descripition,
            				description: rec['additional info'],
            				strength: rec.strength,
            				types: rec.form,
            				pack_size: rec['pack size'],
            				price: rec.price
            			}

            			var query = con.query(`INSERT INTO product SET ?`, newRecord, function(err, dbResults) { // SELECT * FROM admin WHERE email = \'${username}\' AND password = \'${password}\'
            				con.release();
            				if (err) throw err;

            				console.log('rec.descripition: ' + rec.descripition);

            				callback('query is ' + query.sql);
            			});
            		});
            	}, function(err) {
            		if( err ) {
            			console.log('A file failed to process ' );
            		} else {
            			console.log('All files have been processed successfully')
            		}
            	});*/

		        pool.getConnection(function(err, con) {
	            	result.forEach((rec, i) => {
		            	if (err) throw err;

		            	var newRecord = {
		            		product_code: rec.productcode,
		            		barcode: rec.barcode,
		            		name: rec.descripition,
		            		description: rec['additional info'],
		            		strength: rec.strength,
		            		types: rec.form,
		            		pack_size: rec['pack size'],
		            		price: rec.price
		            	}

		            	con.query(`SELECT * FROM product WHERE barcode = ?`, [rec.barcode], function(err, dbResults) {
		            		if (err) throw err;
				            
				            // do not allow duplicate records with the same barcode
		            		if( dbResults.length == 0 ) {
				            	var query = con.query(`INSERT INTO product SET ?`, newRecord, function(err, dbResults) { // SELECT * FROM admin WHERE email = \'${username}\' AND password = \'${password}\'
				            		// con.release();
				            		
				            		console.log('rec.descripition: ' + rec.descripition);

				            		if(i == result.length-1) {
				            			con.release();
				            			res.json({status: 'success'});
				            			// res.json({error_code:0, err_desc:null, data: null});
				            		}
				            	});
				            } else {
				            	// con.release();
				            	if(i == result.length-1) {
				            		con.release();
				            		res.json({status: 'success'});
				            	}
				            }
			            });
		            });
		        });
	        });
	    } catch (e){
	        res.json({error_code:1,err_desc:"Corupted excel file"});
	    }
	})
}

function excelTest(req, res) {
	// res.sendFile(__dirname + "/../index.html");	
	res.send('Hello world');
}

function sendMail(req, res) {
	var transporter = nodemailer.createTransport({
	  service: 'gmail',
	  auth: {
	    user: 'bahle.makhaya@gmail.com',
	    pass: '' // my password -> should be .env variable
	  }
	});

	var mailOptions = {
	  from: 'bahle.makhaya@gmail.com',
	  to: 'mopelintabe@live.com,remnnis.scion@gmail.com',
	  subject: 'Automated warehouse order',
	  text: 'Please find attached'//,
	  // attachments: ['../assets/Husteds_Order_List.pdf']
	};

	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
	    console.log('Sending email failed: ', error);
	  } else {
	    console.log('Email sent: ' + info.response);
	  }
	}); 
}

function trimProductListFile(filename) {
	let promise = new Promise(function(resolve, reject) {
		let startDate;

		fs.readFile(filename + '.csv', 'utf8', function(err, data) {
		    if (err) {
		        // console.log(`Error occured ${err}`);
		        reject(`Error occured ${err}`);
		        return;
		    }
		    // data is the file contents as a single unified string
		    // .split('\n') splits it at each new-line character and all splits are aggregated into an array (i.e. turns it into an array of lines)
		    // .slice(1) returns a view into that array starting at the second entry from the front (i.e. the first element, but slice is zero-indexed so the "first" is really the "second")
		    // .join() takes that array and re-concatenates it into a string
		    if(~data.indexOf('STARTDATE')) {
			    startDate = data.split(',')[1];
			    var linesExceptFirst = data.split('\n').slice(2).join('\n');
			    console.log({linesExceptFirst})
			    fs.writeFile(filename + '_formatted.csv', linesExceptFirst, (err) => { if(err) console.log(`Error occured while writing to file: ${err}`) });
			    resolve(startDate);
			} else {
				var linesExceptFirst = data;
				fs.writeFile(filename + '_formatted.csv', linesExceptFirst, (err) => { if(err) console.log(`Error occured while writing to file: ${err}`) });
			    resolve(new Date().toISOString().slice(0,10)); // if no date was provided use the current one
			}
		});
	});

	return promise;
}

async function test(req, res) {
	let duck = await base('Products').select({view: "Stock Overview"}).all()
	console.log(duck.length)

	res.send('testing...')
}

function productList(req, res) { // later change this to post
	// console.log('calling productList')

	let results = [];

	upload(req,res,function(err){
		// console.log('uploading...')
	    if(err){
	         res.json({error_code:1,err_desc:err});
	         return;
	    }
	    /** Multer gives us file info in req.file object */
	    if(!req.file){
	        res.json({error_code:1,err_desc:"No file passed"});
	        return;
	    }

	    // console.log('We got this far: ', req.file)

	    fs.createReadStream(req.file.path) // './uploads/file-1601641945501.csv'
	      .pipe(csv({
	      	mapHeaders: ({ header, index }) => header == 'Descripition' ? 'Description' : (header == "ProductCode" ? "Product Code" : header)
	      }))
	      .on('data', (data) => results.push(data))
	      .on('end', async () => {
	      	let table = base("Products"),
	      		productCodes = {};


	      	// select all products to check for possible product code duplication
	      	base('Products').select({
	      	    // Selecting the first 3 records in Grid view:
	      	    maxRecords: 100,
	      	    view: "Stock Overview"
	      	}).eachPage(function page(records, fetchNextPage) {
	      	    // This function (`page`) will get called for each page of records.

	      	    for(const record of records) {
	      	        productCodes[record.get('Product ID')] = true;
	      	    }

	      	    // To fetch the next page of records, call `fetchNextPage`.
	      	    // If there are more records, `page` will get called again.
	      	    // If there are no more records, `done` will get called.
	      	    fetchNextPage();

	      	}, function done(err) {
	      	    if (err) { console.error(err); return; }

	      	    // filter out the existing records
	      	    results = results.filter(result => !productCodes[ result["Product Code"] ] );

	      	    results = results.map(result => {
		      		result["Product ID"] = Number(result["Product Code"]);
		      		result["Barcode"] = Number(result["Barcode"]);
		      		delete result["Price"];

		      		return { fields: result };
		      	})

	      	    console.log('Non duplicate records are: ' + results.length);

		      	for(let i = 0; i < Math.ceil(results.length / 10); i++) {
		      		// console.log('Looping ', i);
		      		base('Products').create(results.slice(i*10, (i*10) + 10), async function(err, records) {
		    		  console.log('Got ', i)
		    		  if (err) {
		    		    console.error(err);
		    		    return;
		    		  }

		    		  let warehouseBranch, kingswayBranch, lndcBranch;

		    		  //console.log('Checkisto: ' + (await base('Products').select({view: "Stock Overview"}).all()))
		    		  
		    		  //---- branch table
		    		  let branches = await base('Branch').select({view: "Grid view"}).all();
		    		  for (let branch of branches) {
		    		      if(branch.get("Name") == "Warehouse") {
		    		          warehouseBranch = branch.id;
		    		      } else if(branch.get("Name") == "Kingsway") {
		    		          kingswayBranch = branch.id;
		    		      } else if(branch.get("Name") == "LNDC") {
		    		          lndcBranch = branch.id;
		    		      }
		    		  }

		    		  console.log({warehouseBranch})
		    		  console.log({kingswayBranch})
		    		  console.log({lndcBranch})

		    		  //let pushed = {};

		    		  records.forEach(function (record) {
		    		      console.log(record.getId());
		    		      //if(!pushed[record.getId()]) {
			    		      // --------------------------
			    		      base('Inventory Quantities').create([{
				    		            fields: {
				    		                "Product": [record.getId()],
				    		                "Quantity": 0,
				    		                "Branch": [warehouseBranch]
				    		            },
				    		        },
				    		        {
				    		            fields: {
				    		                "Product": [record.getId()],
				    		                "Quantity": 0,
				    		                "Branch": [kingswayBranch]
				    		            },
				    		        },
				    		        {
				    		            fields: {
				    		                "Product": [record.getId()],
				    		                "Quantity": 0,
				    		                "Branch": [lndcBranch]
				    		            },
				    		        }
				    		    ], function(err, records) { if(err) console.log(`Error occured: ${err}`) }) //.createRecordsAsync([

			    		      	//pushed[record.getId()] = true;
			    		  //}
		    		    // --------------------------
		    		  });
		    		});
		      	}
		      	
		      	/*for(const result of results) {
		      		console.log('insert result: ', await table.create({
		      			"Product ID" : result["ProductCode"],
		      			"Barcode" : result["Barcode"],
		      			"Descripition" : result["Descripition"],
		      			"Additional Info" : result["Additional Info"],
		      			"Strength" : result["Strength"],
		      			"Form" : result["Form"],
		      			"Pack Size" : result["Pack Size"],
		      			"Price" : result["Price"],
		      			"ProductCode" : result["ProductCode"],
		      		}));
		      	}*/

		      	res.json(results);
		      	});
	      });
	});
};

function findRecords(table, filter, view = "Grid view") {
	var promise = new Promise(function(resolve, reject) {
		let record;

		base(table).select({
		    // Selecting the first 3 records in Stock Overview:
		    maxRecords: 100,
		    view
		}).eachPage(function page(records, fetchNextPage) {
		    // This function (`page`) will get called for each page of records.

		    record = records.filter(function(record) {
		        //console.log('Retrieved', record.get('Product ID'));
		        let condition = true;
		        for(const key in filter) {
		        	condition &= record.get( key ) == filter[key]
		        }

		        return condition;
		    });

		    if(record) {
		        //console.log('Retrieved', record.get('Product ID'));
		    	resolve(record);
		    	// console.log({record})
		    }

		    // To fetch the next page of records, call `fetchNextPage`.
		    // If there are more records, `page` will get called again.
		    // If there are no more records, `done` will get called.
		    fetchNextPage();

		    if(records.length < 100) {
		    	resolve(null)
		    }

		}, function done(err) {
		    if (err) { console.error(err); reject(Error("Error " + err)); return; }
		});

		return record;
		// resolve(null);
	});

	return promise;
}

async function dailySales(req, res) { // later change this to post
	/*res.json({ foundRecord: result });
	return;*/
	const branch = req.params.branch; // || 'Kingsway'; //! remove the default later

	let results = [];

	// console.log({check: req})
	/*console.log({branch})
	res.json({});
	return;*/
	
	upload(req,res, async function(err){
		 console.log('uploading...')
	    if(err){
	         res.json({error_code:1,err_desc:err});
	         return;
	    }
	    /** Multer gives us file info in req.file object */
	    if(!req.file){
	        res.json({error_code:1,err_desc:"No file passed"});
	        return;
	    }
	    console.log('No error so far')
	    const filename = './uploads/' + req.file.filename.replace('.csv', ''); //'./uploads/file-1540012984637';
	    const date = await trimProductListFile(filename).catch(console.log); // || '2018-01-01';
	    if(!date) {
	    	res.json({error: 'Error trimming product list file'});
	    	return;
	    }

	    let branchNames = {}; // warehouseBranch, kingswayBranch, lndcBranch;

		//---- branch table
		let branches = await base('Branch').select({view: "Grid view"}).all();
		for (let branch of branches) {
		  if(branch.get("Name") == "Warehouse") {
		      branchNames['Warehouse'] = branch.id;
		  } else if(branch.get("Name") == "Kingsway") {
		      branchNames['Kingsway'] = branch.id;
		  } else if(branch.get("Name") == "LNDC") {
		      branchNames['LNDC'] = branch.id;
		  }
		}

		//console.log({branchNames})
	    console.log('about to read the formatted file')
	    // return;

	    // res.json({})
	    fs.createReadStream(filename + '_formatted.csv')
	      .pipe(csv())
	      .on('data', (data) => results.push(data))
	      .on('end', async () => {
	      	console.log('WE IN NIGGA')
	      	results = results.map(async result => {
	      		if(result['QTY SOLD'] == "") return { fields: null };
	      		console.log('MAPPING NIGGA')

	      		const qtyNumbers = result['QTY SOLD'].match(/\d+/g);
	      		/*console.log({qtyNumbers});
	      		return result;*/

	      		const fullQty    = Number(qtyNumbers[0]),
	      			  partialQty    = Number(qtyNumbers[1]);

	      		//const partial = Number(result['QTY SOLD'].match(/[(]\d+[)]/).toString().replace(/[(]|[)]/g, '')); // match (number) then replace the brackets
	      		/*result['FULL QTY'] = fullQty;
	      		result['PARTIAL QTY'] = partialQty;*/

	      		console.log('sending request... ')

	      		const [productRecord] = await findRecords('Products', {'Product Code': result["STOCK CODE"]}, 'Stock Overview').catch(console.log),
	      			  branchRecord  = branchNames[branch];//await findRecords('Branch', {'Name': branch}, 'Grid view').catch(console.log);

	      		// console.log("STOCK CODE: ", result["STOCK CODE"])
	      		// console.log('productRecord.id: ', productRecord)
	      		// console.log('branchRecord.id: ', branchRecord)

	      		if(!productRecord || !branchRecord) {
	      			return null;
	      		}

	      		/*res.json({})
	      		return;*/

	      		result = {
	      			"Product": [productRecord.id],
	      			"Branch" : [branchRecord],
	      			"Quantity Sold" : fullQty,
	      			"Partial Quantity Sold" : partialQty,
	      			"Date": date
	      		};

	      		return { fields: result };
	      	})

	      	/*res.json({})
	      	return;*/

	      	Promise.all(results).then(function(ret) {
	    	    console.log('#@#####################@@@@@@@@@@@@@@@@@@@@')
	    	    //console.log({ret: JSON.stringify(ret)})
	    	    results = ret;

	    	    let insufficient = [];

	    	    // upload the results in groups of 10
	    	  	for(let i = 0; i < Math.ceil(results.length / 10); i++) {
	    	  		// console.log('Looping ', i);
	    	  		base('Daily Sales').create(results.slice(i*10, (i*10) + 10), function(err, records) {
	    			  console.log('Gotzo ', i)
	    			  if (err) {
	    			    console.error(1, err);
	    			    return;
	    			  }
	    			  records.forEach(async function (record) {
	    			    // console.log(record.getId());
	    			    console.log('record.get("Product Code (from Product)")', record.get("Product Code (from Product)")[0])
	    			    let [recordToUpdate] = await findRecords('Inventory Quantities', {
	    			    	"Product Code (from Product)": record.get("Product Code (from Product)")[0],
	    			    	"Branch": branchNames[branch]
	    			    }, 'Grid view').catch(console.log); //await (base('Inventory Quantities').select({view: "Grid view"}).all());
	    			    console.log({recordToUpdate})
	    			    /*recordToUpdate = recordToUpdate.find(current => {
	    			    	//console.log(current.get("Product")[0], ' vs/ ', record.get("Product")[0], current.get("Product")[0] == record.get("Product")[0])
	    			    	return current.get("Product")[0] == record.get("Product")[0]
	    			    });*/
	    			   // console.log('Le record to update', recordToUpdate)
	    			    console.log('Le record to update Quantity: ', recordToUpdate.get("Quantity"), ' - ', record.get("Quantity Sold"))

	    			    // res.json({finished: true});
	    			    // return;

	    			    if(recordToUpdate.get("Quantity") - recordToUpdate.get("Quantity Sold") < 0) {
	    			    	console.log('hello')
	    			    	insufficient.push(recordToUpdate.get('Name (from Product)') + ' ' + recordToUpdate.get('Description (from Product)'))
	    			    	// continue;
	    			    } else {
		    			    base('Inventory Quantities').update([
		    			      {
		    			        "id": recordToUpdate.getId(), // "recqdPBVvk0XvOh5m",
		    			        "fields": {
		    			          "Quantity": recordToUpdate.get("Quantity") - record.get("Quantity Sold"),
		    			        }
		    			      }
		    			    ], function(err, records) {
		    			      if (err) {
		    			        console.error(2, err);
		    			        return;
		    			      }
		    			      /*records.forEach(function(record) {
		    			        console.log(record.get('Branch'));
		    			      });*/
		    			    });
		    			 }
	    			  });
	    			});

	    	  		// ########################
	    	  		// for (let branch of branches) {
	    	  		//     if(branch.get("Name") == "Warehouse") {
	    	  		//         warehouseBranch = branch.id;
	    	  		//     } else if(branch.get("Name") == "Kingsway") {
	    	  		//         kingswayBranch = branch.id;
	    	  		//     } else if(branch.get("Name") == "LNDC") {
	    	  		//         lndcBranch = branch.id;
	    	  		//     }
	    	  		// }

	    			// ########################
	    	  	}

	    	    res.status(200).json(insufficient);
	    	})

	    	// if(!anyResults) res.json({})
	      	//console.log("@@@@@@@@@@@@@@@@@@@The results: ", ret)
	      	//return;
	      });
	});
}

router.route( '/excel-test' ).get( excelTest );
router.route( '/sign-in' ).post( signIn );
router.route( '/sign-out' ).post( signOut );
router.route( '/import-excel' ).post( importExcel );
router.route( '/send-email' ).get( sendMail );
router.route( '/product-list' ).post( productList );
router.route( '/daily-sales/:branch' ).post( dailySales );
router.route( '/testzozo' ).get( test );

module.exports = router;
