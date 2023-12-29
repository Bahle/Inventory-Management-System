var mysql = require('mysql');
require('dotenv').config();

// module.exports = mysql.createPool({
//   host: process.env.DB_HOST, //"localhost",
//   user: process.env.DB_USER, //"root",
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// }) 

 module.exports = mysql.createPool({
  host: "us-cdbr-iron-east-04.cleardb.net",
  user: "bb0981c7c6fcc0",
  password: "7ed34ca0",
  database: "heroku_6c2a2cfdeb5cf35",
  connectionLimit : 50
}) 