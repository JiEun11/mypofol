const path = require('path');
const dotenv = require('dotenv'); 
const mysql = require('mysql2/promise');

dotenv.config({path: path.join(__dirname, '../config/db.env')})

module.exports = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectTimeout: process.env.DB_CONNECTION_TIMEOUT,
    connectionLimit: process.env.DB_CONNECTION_LIMIT,
    maxIdle: process.env.DB_CONNECTION_MAXIDLE
});