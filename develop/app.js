const inquirer = require('inquirer');
const cTable = require('console.table');
const department = require('../routes/apiRoutes/departmentRoutes')

const employeeTrackerApp = () => {
  console.log(`
============================
EMPLOYEE MANAGER APPLICATION
============================
`
  );
  
  inquirer.prompt({
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
      'Update employee role'
    ]
  })
  // .then(selection => {
  //   console.log(selection.menu);
  //   if (selection.menu === 'View all departments') {
  //     this.department();
  //   }
  // })


};

employeeTrackerApp();