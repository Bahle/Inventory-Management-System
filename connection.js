var mysql = require('mysql');
require('dotenv').config();

// module.exports = mysql.createPool({
//   host: process.env.DB_HOST, //"localhost",
//   user: process.env.DB_USER, //"root",
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// }) 

 module.exports = mysql.createPool({
  host: "--------------------",
  user: "--------------------",
  password: "--------------------",
  database: "--------------------",
  connectionLimit : 50
}) 
