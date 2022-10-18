const mysql = require('mysql2');

const db = mysql.createConnection(
  {
  host: 'localhost',
  user: 'root',
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  },
  console.log('Connected to the employee tracker database.')
);

module.exports = db;
