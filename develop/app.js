const db = require('../db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');

const {viewDepartments, addDepartment} = require('../lib/departmentFunctions');


const menuOptions = {
    type: 'list',
    name: 'menu',
    message: 'What would you like to do?',
    choices: [
      'View all departments',
      'View all roles',
      'View all employees',
      'Add a department',
      'Add a role',
      'Add an employee',
      'Update employee role',
      'Exit'
    ]
};

//const employeeTrackerApp = () => {
function employeeTrackerApp() {
  inquirer.prompt(menuOptions)
  .then((selection) => {
    if (selection.menu === 'View all departments') {
      db.query(`SELECT * FROM departments;`, (err,res) => {
      if(err) throw err;
      console.table(`
      DEPARTMENTS`, res);
      setTimeout(employeeTrackerApp, 2000);
      });
    };
    if (selection.menu === 'View all roles') {
      db.query(`SELECT roles.id, roles.title, departments.name AS department , roles.salary
      FROM roles INNER JOIN departments ON roles.department_id = departments.id;`, (err,res) => {
      if(err) throw err;
      console.table(`
      ROLES`, res);
      setTimeout(employeeTrackerApp, 2000);
      });
    };
    if (selection.menu === 'View all employees') {
      db.query(`SELECT employees.id, employees.first_name, employees.last_name, roles.title,
      departments.name AS department, roles.salary, 
      CONCAT (manager.first_name, " ", manager.last_name) AS manager
      FROM employees
      INNER JOIN roles ON employees.role_id = roles.id
      INNER JOIN departments on roles.department_id = departments.id
      LEFT JOIN employees manager on manager.id = employees.manager_id;`, (err,res) => {
      if(err) throw err;
      console.table(`
      EMPLOYEES`, res);
      setTimeout(employeeTrackerApp, 2000);
      });
    };
    if (selection.menu === 'Add a department') {
      console.log('addDepartment');
      setTimeout(employeeTrackerApp, 2000);
    }
    if (selection.menu === 'Add a role') {
      console.log('addRole');
      setTimeout(employeeTrackerApp, 2000);
    }
    if (selection.menu === 'Add an employee') {
      console.log('addEmployee');
      setTimeout(employeeTrackerApp, 2000);
    }
    if (selection.menu === 'Update employee role') {
      console.log('updateRole');
      setTimeout(employeeTrackerApp, 2000);
    }
    if (selection.menu === 'Exit') {
      process.exit();
    };
  })
};


module.exports = { employeeTrackerApp };