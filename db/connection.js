const mysql = require('mysql2');

const db = mysql.createConnection(
  {
  host: 'localhost',
  user: 'root',
  password: 'Luz3%E&NB/x.ENS',
  database: 'employee_tracker'
  },
  console.log('Connected to the employee tracker database.')
);

module.exports = db;
