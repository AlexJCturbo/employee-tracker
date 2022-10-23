const db = require('../db/connection');
const cTable = require('console.table');

//View all employees
const viewEmployees = () => {
  const sqlViewE = `SELECT employees.id, employees.first_name, employees.last_name, roles.title,
  departments.name AS department, roles.salary, 
  CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employees
  INNER JOIN roles ON employees.role_id = roles.id
  INNER JOIN departments on roles.department_id = departments.id
  LEFT JOIN employees manager on manager.id = employees.manager_id;`
  
  db.query(sqlViewE, (err, res) => {
    if (err) {
      throw err;
    } else {
      console.table(`

      EMPLOYEES`, res);
    }
  });
};

//Adding an employee
const addEmployee = () => {
  const sqlAddE = `INSERT INTO employees (first_name, last_name, role_id, is_manager, manager_id)
              VALUES (?, ?, ?, ?, ?);`;
  const params = [body.first_name, body.last_name, body.role_id, body.is_manager, body.manager_id];

  db.query(sqlAddE, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });
};

module.exports = { viewEmployees, addEmployee };