DROP DATABASE IF EXISTS employeesDB;

CREATE DATABASE employeesDB;

use employeesDB;

CREATE TABLE
IF NOT EXISTS departments
(
id INT AUTO_INCREMENT NOT NULL UNIQUE,
name VARCHAR
(30),
PRIMARY KEY
(id)
);

CREATE TABLE
IF NOT EXISTS roles
(
id INT AUTO_INCREMENT NOT NULL UNIQUE,
title VARCHAR
(30) NOT NULL,
salary DECIMAL
(10, 4) NOT NULL,
department_id INT NOT NULL,
PRIMARY KEY
(id),
FOREIGN KEY department_id
(department_id) REFERENCES departments
(id)
);

CREATE TABLE
IF NOT EXISTS employees
(
    id INT AUTO_INCREMENT NOT NULL UNIQUE,
    first_name VARCHAR
(30),
    last_name VARCHAR
(30),
    role_id INT NOT NULL, 
    manager_id INT NOT NULL,
    PRIMARY KEY
(id),
    FOREIGN KEY role_id
(role_id) REFERENCES roles
(id),
    FOREIGN KEY manager_id
(manager_id) REFERENCES roles
(id)
);

