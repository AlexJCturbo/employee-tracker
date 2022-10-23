// const db = require('../db/connection');
// const inquirer = require('inquirer');
// const cTable = require('console.table');

// const {viewDepartments, addDepartment} = require('../lib/departmentFunctions');

// const menuOptions = {
//     type: 'list',
//     name: 'menu',
//     message: 'What would you like to do?',
//     choices: [
//       'View all departments',
//       'View all roles',
//       'View all employees',
//       'Add a department',
//       'Add a role',
//       'Add an employee',
//       'Update employee role',
//       'Exit'
//     ]
// };




//const employeeTrackerApp = () => {
function employeeTrackerApp() {
  inquirer.prompt(menuOptions)
  .then((selection) => {

    //View all departments
    if (selection.menu === 'View all departments') {
      db.query(`SELECT * FROM departments;`, (err,res) => {
      if(err) throw err;
      console.table(`
      DEPARTMENTS`, res);
      setTimeout(employeeTrackerApp, 2000);
      });
    };

    //View all roles
    if (selection.menu === 'View all roles') {
      db.query(`SELECT roles.id, roles.title, departments.name AS department , roles.salary
      FROM roles INNER JOIN departments ON roles.department_id = departments.id;`, (err,res) => {
      if(err) throw err;
      console.table(`
      ROLES`, res);
      setTimeout(employeeTrackerApp, 2000);
      });
    };

    //View all employees
    if (selection.menu === 'View all employees') {
      db.query(`SELECT employees.id, employees.first_name, employees.last_name, roles.title,
      departments.name AS department, roles.salary, 
      CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employees
      INNER JOIN roles ON employees.role_id = roles.id
      INNER JOIN departments on roles.department_id = departments.id
      LEFT JOIN employees manager on manager.id = employees.manager_id;`, (err,res) => {
      if(err) throw err;
      console.table(`
      EMPLOYEES`, res);
      setTimeout(employeeTrackerApp, 2000);
      });
    };

    //Add a department
    if (selection.menu === 'Add a department') {
      inquirer.prompt([
        {
          type: 'input',
          name: 'newDepart',
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
      .then(answer => {
        const sql = `INSERT INTO departments (name)
        VALUES (?);`;
        const params = [answer.newDepart];
        db.query(sql, params, (err, res) => {
          if (err) {
            res.status(400).json({ error: err.message });
            return;
          }
          console.log(`
Added ${answer.newDepart} to the database.
`);
        })
      })
    };

    //Add a role
    if (selection.menu === 'Add a role') {
      //async function addingRole (roles) {
      db.query(`SELECT name FROM departments;`, (err, res) => {
        if (err) throw err;
        const allDepartments = [];

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
            type: 'list',
            name: 'findDepartment',
            message: 'Which department does the role belong to?',
            choices: function () {
              for (i = 0; i < res.length; i++) {
                allDepartments.push(res[i].name);
              }
              return allDepartments;
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
      })

      // .then(answer => {
      //   const sql = `INSERT INTO role (title, department, salary,)
      //   VALUES (?, ?, ?);`;
      //   const params = [answer.newRole, answer.newSalary ];
      //   db.query(sql, params, (err, res) => {
      //     if (err) {
      //       res.status(400).json({ error: err.message });
      //       return;
      //     }
      //   })
      //   setTimeout(employeeTrackerApp, 1000);
      // })
    //}
    };

    //Add an employee
    if (selection.menu === 'Add an employee') {
      //async function addingRole (roles) {
      db.query(`SELECT title FROM roles;`, (err, res) => {
        if (err) throw err;
        const showRoles = [];

        inquirer.prompt([
          {
            type: 'input',
            name: 'newFirstName',
            message: "What is the employee's first name?",
            validate: response => {
              if (response) {
                return true;
              } else {
                console.log("Please enter the employee's first name.");
                return false;
              }
            }
          },
          {
            type: 'input',
            name: 'newLastName',
            message: "What is the employee's last name?",
            validate: response => {
              if (response) {
                return true;
              } else {
                console.log("Please enter the employee's last name.");
                return false;
              }
            }
          },
          {
            type: 'list',
            name: 'employeeRole',
            message: "What is the employee's role",
            choices: function () {
              for (i = 0; i < res.length; i++) {
                showRoles.push(res[i].name);
              }
              return showRoles;
            }
          },
          {
            type: 'list',
            name: 'manager',
            message: "Who is the employee's manager",
            choices: function () {
              for (i = 0; i < res.length; i++) {
                allManagers.push(res[i].name);
              }
              return allManagers;
            }
          },


        ])
      })
    };

    //Update employee role
    if (selection.menu === 'Update employee role') {
      console.log('updateRole');
      setTimeout(employeeTrackerApp, 2000);
    }

    //Exit
    if (selection.menu === 'Exit') {
      process.exit();
    };
  })
};


//module.exports = { employeeTrackerApp };