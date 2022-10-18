-- Create database
DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS department;

CREATE TABLE department (
  id_department INTEGER AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  id_role INTEGER AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(9,2) NOT NULL,
  department_id INTEGER NOT NULL,
  
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id_department)
);

CREATE TABLE employee (
  id_employee INTEGER AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER NOT NULL,
  is_manager BOOLEAN,
  manager_id INTEGER NULL,
  PRIMARY KEY(id_employee),
  
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id_role),
  CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id_employee)
);
