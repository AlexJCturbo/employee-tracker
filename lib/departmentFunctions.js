const db = require('../db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');

//View all departments
const viewDepartments = () => {
  const sqlViewD = `SELECT * FROM departments;`;

  db.query(sqlViewD, (err, res) => {
    if (err) {
      throw err;
    } else {
      console.table(`

      DEPARTMENTS`, res
      );
    }
  });
};

//Adding a department
function addDepartment() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'newDepartment',
      message: 'What is the name of the new department?',
      validate: response => {
        if (response) {
          return true;
        } else {
          console.log('Please enter the name of the new department.');
          return false;
        }
      }
    }
  ])
  .then((answer) => {
    const sqlAddD = `INSERT INTO departments (name)
    VALUES (?);`;
    const params = [answer.newDepartment];

    db.query(sqlAddD, params, (err, res) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      console.log(`
      
Added ${answer.newDepartment} to the database.

`
      );
    })
  })
};

module.exports = { viewDepartments, addDepartment };
