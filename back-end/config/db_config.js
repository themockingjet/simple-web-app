//
//
//

require("dotenv").config();
const mysql = require("mysql");

const db = mysql.createConnection({
    host: process.env.dbHost,
    user: process.env.dbUser,
    password: process.env.dbPass,
    database: process.env.dbName,
    multipleStatements: true,
});

module.exports = db;
