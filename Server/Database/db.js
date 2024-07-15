const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config()

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER
});

module.exports = pool.promise();
