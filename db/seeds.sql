INSERT INTO departments (name)
VALUES
('Engineering'),
('Finance'),
('Sales'),
('Legal'),
('Marketing');

INSERT INTO roles (title, salary, department_id)
VALUES
('Operations Manager', 210000, 1),
('Account Manager', 155000, 2),
('Account', 110000, 2),
('Lead Engineer', 150000, 1),
('Software Engineer', 115000, 1),
('Sales Lead', 100000, 3),
('Salesperson', 75000, 3),
('Lawyer', 150000, 4),
('Marketing Lead', 150000, 5),
('Marketing analyst', 90000, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Thomas', 'Brown', 1, NULL),
('Katya', 'Andrews', 2, NULL),
('Larissa', 'Fernandez', 3, 2),
('Egemen', 'Erol', 4, NULL),
('Alex', 'Castillo', 5, 4),
('Victor', 'Chan', 5, 4),
('Emma', 'Lourd', 6, 1),
('Robert', 'Medvedev', 7,6),
('Jacob', 'Murphy', 8, NULL),
('Sophia', 'Smorodina', 9, 1),
('Mila', 'Cameron', 10, 9),
('Donna', 'Lewis', 10, 9);
