const db = require('../db/connection');
const cTable = require('console.table');

// db.connect( (err) => {
//   if (err)
//   throw err;
// });

//View all departments
//function viewDepartments() {
const viewDepartments = () => {
  db.query(`SELECT * FROM departments;`, (err,res) => {
    if(err) throw err;
    console.table(`
    DEPARTMENTS`, res);
    setTimeout(employeeTrackerApp, 2000);
    });
};

//Adding a department
//const addDepartment = () => {
function addDepartment() {

}

module.exports = { viewDepartments, addDepartment };
