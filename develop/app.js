const db = require('../db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');

const {viewDepartments} = require('../lib/departmentFunctions');
const {viewRoles} = require('../lib/roleFunctions');
const {viewEmployees} = require('../lib/employeeFunctions');

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

// function newDepartment(){
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//        resolve(addDepartment())
//     }, 500)
// })
// };
// async function getNewDepartment(){
//   await newDepartment()
//   .then(()=> {
//     viewDepartments()
//     setTimeout(employeeTrackerApp, 1500);
//   })
// };

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
            let extractRoleId = newRoleDep.substr(0,2);
            const sqlAddR = `INSERT INTO roles (title, salary, department_id)
                          VALUES (?, ?, ?);`;
            const params = [newRole, newSalary, extractRoleId];

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

//Adding an employee
const getNewEmployee = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
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
      name: 'lastName',
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
  ])
    .then((answers) => {
      const firstName = answers.firstName;
      const lastName = answers.lastName;
      const sqlViewR = `SELECT id, title FROM roles;`;

      db.query(sqlViewR, (err, res) => {
        if (err) throw err;
        const allRoles = [];
        inquirer.prompt([
          {
            type: 'list',
            name: 'employeeRole',
            message: "What is the employee's role?",
            choices: function () {
              for (i = 0; i < res.length; i++) {
                allRoles.push(res[i].id + "  " + res[i].title);
              }
              return allRoles;
            }
          }
        ])
          .then((responseRole) => {
            const employeeRole = responseRole.employeeRole;
            let extractRoleId = employeeRole.substr(0,2);
            const sqlViewE = `SELECT id, first_name, last_name FROM employees;`;

            db.query(sqlViewE, (err, res) => {
              if (err) throw err;
              const possibleManagers = [];
              inquirer.prompt([
                {
                  type: 'list',
                  name: 'employeeManager',
                  message: "Who is the employee's manager?",
                  choices: function () {
                    for (i = 0; i < res.length; i++) {
                      possibleManagers.push(res[i].id + "  " + res[i].first_name + "  " + res[i].last_name);
                    }
                    return possibleManagers;
                  }
                }
              ])
              .then((responseManager) => {
                const employeeManager = responseManager.employeeManager;
                let extractManagerId = employeeManager.substr(0,2);
                const sqlAddE = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
                VALUES (?, ?, ?, ?);`;
                const params = [firstName, lastName, extractRoleId, extractManagerId];
                db.query(sqlAddE, params, (err, res) => {
                  if(err) {
                    throw err;
                  } else {
                    console.log (`

Added ${answers.firstName + ' ' + answers.lastName} to the database.`
                    );
                    viewEmployees();
                    setTimeout(employeeTrackerApp, 1500);
                  }
                });
              });
            });
          });
      });
    });
};

//Update employee Role
const updateEmployeeRole = () => {
  const sqlViewE = `SELECT id, first_name, last_name FROM employees;`;

  db.query(sqlViewE, (err, res) => {
    if (err) throw err;
    const selectedEmployee = [];
    inquirer.prompt([
      {
        type: 'list',
        name: 'selectEmployee',
        message: "Which employee's role do you want to update?",
        choices: function () {
          for (i = 0; i < res.length; i++) {
            selectedEmployee.push(res[i].id + "  " + res[i].first_name + "  " + res[i].last_name);
          }
          return selectedEmployee;
        }
      }
    ])
    .then((responseEmployee) => {
      const employeeToUpdate = responseEmployee.selectEmployee;
      let extractEmployeeId = employeeToUpdate.substr(0,2);
      const sqlViewR = `SELECT id, title FROM roles;`;

      db.query(sqlViewR, (err, res) => {
        if (err) throw err;
        const allRoles = [];
        inquirer.prompt([
          {
            type: 'list',
            name: 'employeeRole',
            message: "which role do you want to assign the selected employee?",
            choices: function () {
              for (i = 0; i < res.length; i++) {
                allRoles.push(res[i].id + "  " + res[i].title);
              }
              return allRoles;
            }
          }
        ])
        .then((responseRole) => {
          const employeeNewRole = responseRole.employeeRole;
          let extractRoleId = employeeNewRole.substr(0,2);
          const sqlUpdateR = `UPDATE employees SET role_id=? WHERE id=?;`;
          const params = [extractEmployeeId, extractRoleId];
          db.query(sqlUpdateR, [extractRoleId, extractEmployeeId], err => {
            if(err) {
              throw err;
            } else {
              console.log (`

Updated the employee's role.`
              );
              viewEmployees();
              setTimeout(employeeTrackerApp, 1500);
            }
          });
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
          getNewEmployee();
          break;
        case 'Update employee role':
          updateEmployeeRole();
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