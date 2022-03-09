var mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

var pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.host,
    user: process.env.dbuser,
    password: process.env.password,
    database: process.env.db
});

module.exports = pool;