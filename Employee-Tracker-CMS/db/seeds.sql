-- Insert initial data into department
INSERT INTO department (name) VALUES ('Engineering');
INSERT INTO department (name) VALUES ('Sales');
INSERT INTO department (name) VALUES ('Finance');

-- Insert initial data into role
INSERT INTO role (title, salary, department_id) VALUES ('Software Engineer', 80000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Sales Manager', 60000, 2);
INSERT INTO role (title, salary, department_id) VALUES ('Accountant', 70000, 3);

-- Insert initial data into employee
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('John', 'Doe', 1, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Jane', 'Smith', 2, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Robert', 'Brown', 3, NULL);