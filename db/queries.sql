-- DEPARTMENTS
-- SELECT id, name FROM departments;
-- INSERT INTO departments (name) VALUES (?);


-- ROLES
-- SELECT id, title FROM roles;
-- SELECT roles.id, roles.title, departments.name AS department , roles.salary
-- FROM roles INNER JOIN departments ON roles.department_id = departments.id ORDER BY roles.id;

-- INSERT INTO roles (title, department_id, salary)
-- VALUES ("asdfghjkl", 7, 65000);
-- SELECT * FROM roles;


-- EMPLOYEES
-- SELECT id, first_name, last_name FROM employees;
-- INSERT INTO employees (first_name, last_name, role_id, is_manager, manager_id)
-- VALUES ('Peter', 'Kramer', 5, false, 4);
-- VALUES ('Lorena', 'Fields', 7, false, 7);
-- DELETE FROM employees WHERE id = 12;

-- UPDATE employees SET role_id=1 WHERE id=2;
-- UPDATE employees SET manager_id = 4 WHERE id_employee = 13;
-- UPDATE employees SET role_id = 8 WHERE id = 1;

-- SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, 
-- CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employees
-- INNER JOIN roles ON employees.role_id = roles.id
-- INNER JOIN departments on roles.department_id = departments.id
-- LEFT JOIN employees manager on manager.id = employees.manager_id
-- ORDER BY employees.id;

-- SELECT employees.manager_id,
-- CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employees
-- LEFT JOIN employees manager on manager.id = employees.manager_id;

-- SELECT employees.id, employees.first_name, employees.last_name, 
-- SELECT employees.id, CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employees
-- LEFT JOIN employees manager on manager.id = employees.manager_id WHERE manager IS NOT NULL;
