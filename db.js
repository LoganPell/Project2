var mysql = require('mysql')
var connection = mysql.createConnection({
	host: process.env.DB_HOST,	
	user: process.env.DB_USER,	
	password: process.env.DB_PASSWORD,	
	database: process.env.DB_NAME,	
	socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});

connection.connect();

module.exports = connection;


