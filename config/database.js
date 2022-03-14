var mysql = require('mysql');
require('dotenv').config();

var pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.HOST,
    user: process.env.DBUSER,
    password: process.env.PASSWORD,
    database: process.env.DB
});

module.exports = pool;