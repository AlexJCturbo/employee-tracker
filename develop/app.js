const db = require('../db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');

const {viewDepartments, addDepartment} = require('../lib/departmentFunctions');
const {viewRoles, addRole} = require('../lib/roleFunctions');
const {viewEmployees, addEmployee} = require('../lib/employeeFunctions');

const menuOptions = [{
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
}];

//Adding a department
const getNewDepartment = () => {
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
      
Added ${answer.newDepartment} to the database.`
        );
      })
      viewDepartments();
      setTimeout(employeeTrackerApp, 1500);
    })
};

//Adding a role
const getNewRole = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'newRole',
      message: 'What is the name of the new role?',
      validate: response => {
        if (response) {
          return true;
        } else {
          console.log('Please enter the name of the new role.');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'newSalary',
      message: 'What is the salary of the new role?',
      validate: response => {
        if (!response || isNaN(response)) {
          return 'Please enter the salary of the new role.';
        } else {
          return true;
        }
      }
    }
  ])
    .then((answers) => {
      const newRole = answers.newRole;
      const newSalary = answers.newSalary;

      const sqlViewD = `SELECT id, name FROM departments;`;
      db.query(sqlViewD, (err, res) => {
        if (err) throw err;
        const allDepartments = [];

        inquirer.prompt([
          {
            type: 'list',
            name: 'findDepartment',
            message: 'Which department does the role belong to?',
            choices: function () {
              for (i = 0; i < res.length; i++) {
                allDepartments.push(res[i].id + "  " + res[i].name);
              }
              return allDepartments;
            }
          }
        ])
          .then((response) => {
            const newRoleDep = response.findDepartment;
            let extractId = newRoleDep.substr(0,2);
            const sqlAddR = `INSERT INTO roles (title, salary, department_id)
                          VALUES (?, ?, ?);`;
            const params = [newRole, newSalary, extractId];

            db.query(sqlAddR, params, (err, res) => {
              if (err) {
                throw err;
              } else {
              console.log(`
      
Added ${answers.newRole} to the database.`
              );
              viewRoles();
              setTimeout(employeeTrackerApp, 1500);
            }
            });
          });
      });
    });
};

//Main function that runs the main menu with a switch
function employeeTrackerApp() {
  inquirer.prompt(menuOptions)
    .then((selection) => {
      switch (selection.menu) {
        case 'View all departments':
          viewDepartments()
          setTimeout(employeeTrackerApp, 1500);
          break;
        case 'View all roles':
          viewRoles();
          setTimeout(employeeTrackerApp, 1500);
          break;
        case 'View all employees':
          viewEmployees();
          setTimeout(employeeTrackerApp, 1500);
          break;
        case 'Add a department':
          getNewDepartment();
          break;
        case 'Add a role':
          getNewRole();
          break;


        case 'Add an employee':
          getNewRole();
          break;

        case 'Update employee role':
          getNewRole();
          break;


        case "Exit":
          process.exit();
        default:
          process.exit();
      }
    })
    .catch((err) => console.error(err));
};

module.exports = { employeeTrackerApp };