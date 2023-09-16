//
//
//

"use strict";

require("dotenv").config();
const mysql = require("mysql2");

const db = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	port: process.env.DB_PORT,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	multipleStatements: true,
});

module.exports = db;
