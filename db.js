var mysql = require('mysql2');

exports.db = mysql.createConnection({
    connectionLimit: 500,
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.db,
    port: process.env.portt,
    insecureAuth: true
  });
