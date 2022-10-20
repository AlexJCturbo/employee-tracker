const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection(
  {
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'employee_tracker'
  },
  console.log(`
You are now connected to the Employee Tracker database
         ============================
         EMPLOYEE MANAGER APPLICATION
         ============================
  `)
);

module.exports = db;