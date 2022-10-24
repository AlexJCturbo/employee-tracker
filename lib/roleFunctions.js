const db = require('../db/connection');
const cTable = require('console.table');

//View all departments
const viewRoles = () => {
  const sqlViewR = `SELECT roles.id, roles.title, departments.name AS department , roles.salary
  FROM roles INNER JOIN departments ON roles.department_id = departments.id
  ORDER BY roles.id;`
  
  db.query(sqlViewR, (err, res) => {
    if (err) {
      throw err;
    } else {
      console.table(`
      ROLES`, res);
    }
  });
};

//Adding a role
// const addRole = () => {
//   const sqlAddR = `INSERT INTO roles (title, salary, department_id)
//               VALUES (?, ?, ?);`;
//   const params = [body.title, body.salary, body.department_id];

//   db.query(sqlAddR, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: 'success',
//       data: body
//     });
//   });
// };

module.exports = {
  viewRoles
  //addRole 
};