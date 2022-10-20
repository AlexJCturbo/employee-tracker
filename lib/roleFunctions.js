const db = require('../db/connection');
const cTable = require('console.table');

//View all roles
const viewRoles = () => {
  db.query(`SELECT roles.id, roles.title, departments.name AS department , roles.salary
  FROM roles INNER JOIN departments ON roles.department_id = departments.id;`, (err,res) => {
  if(err) throw err;
  console.table(`
  ROLES`, res);
  setTimeout(employeeTrackerApp, 2000);
  });
};

//Adding a role
const addRole = () => {
  const sql = `INSERT INTO roles (title, salary, department_id)
              VALUES (?, ?, ?);`;
  const params = [body.title, body.salary, body.department_id];

  db.query(sql, params, (err, result) => {
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

module.exports = { viewRoles, addRole };
