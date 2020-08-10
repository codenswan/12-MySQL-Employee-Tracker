const connection = require("./connection.js");
const validation = require("./../utils/validation.js");
const { prompt } = require("inquirer");

class DB {
  // Keeping a reference to the connection on the class in case we need it later
  constructor(connection) {
    connection().then((connection) => {
      this.connection = connection;
    });
  }

  //* Find all employees, join with roles and departments to display their roles, salaries, departments, and managers
  async findAllEmployees() {
    const viewEmps =
      "SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employees LEFT JOIN roles on employees.role_id = roles.id LEFT JOIN departments on roles.department_id = departments.id LEFT JOIN employees manager on manager.id = employees.manager_id;";
    const res = await this.connection.query(viewEmps);
    console.table(res[0]);
  }

  //* find all departments
  async findAllDepartments() {
    const viewDeps = "SELECT * FROM departments";
    const res = await this.connection.query(viewDeps);
    console.table(res[0]);
  }

  //* find all roles and display with department id and name
  async findAllRoles() {
    const viewRoles =
      "SELECT * FROM roles LEFT JOIN departments on roles.department_id = departments.id";

    const res = await this.connection.query(viewRoles);
    console.table(res[0]);
  }

  //* method to add a new employee with corresponding mgrs and roles.
  async addEmployee() {
    let mgrQuery = `SELECT employees.id, concat(employees.first_name, ' ' ,  employees.last_name) AS Manager FROM employees ORDER BY Manager ASC;`;
    let roleQuery = `SELECT id, title FROM roles ORDER BY title ASC;`;
    let roles = await this.connection.query(roleQuery);
    let mgrs = await this.connection.query(mgrQuery);

    let rolesList = roles[0].map((row) => {
      return { name: row.title, value: row.id };
    });

    let mgrsList = mgrs[0].map((row) => {
      return { name: row.Manager, value: row.id };
    });

    return prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the first name of the employee?",
        validation: validation.stringCapital,
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the last name of the employee?",
        validation: validation.stringCapital,
      },
      {
        type: "list",
        name: "role",
        message: "What is the role of this employee?",
        choices: rolesList,
      },
      {
        type: "list",
        name: "mgr",
        message: "Who is the manager of this employee?",
        choices: mgrsList,
      },
    ]).then((answer) => {
      console.log(answer);
      let query = "INSERT INTO employees set ?;";
      let values = {
        first_name: answer.firstName,
        last_name: answer.lastName,
        role_id: answer.role,
        manager_id: answer.mgr,
      };
      this.connection.query(query, values, (err) => {
        if (err) throw err;
      });
      console.log(
        `Adding ${answer.firstName} ${answer.lastName} to employees table.`
      );
    });
  }

  //* method adds a new department.
  addDepartment() {
    return prompt([
      {
        type: "input",
        name: "newDep",
        message: "Enter the name of the new department:",
      },
    ]).then((answer) => {
      let query = `INSERT INTO departments (name) VALUES ('${answer.newDep}');`;
      this.connection.query(query, (err, res) => {
        if (err) throw err;
      });
      console.log(`Adding ${answer.newDep} into departments table.`);
    });
  }

  addRole() {
    const query = `Select id, name FROM departments ORDER BY name ASC;`;
    return this.connection.query(query, (err, departments) => {
      if (err) throw err;
      let depList = departments.map((row) => {
        return row.name;
      });

      prompt([
        {
          type: "input",
          name: "role",
          message: "Enter the title of the new role:",
          validation: validation.string,
        },
        {
          type: "input",
          name: "salary",
          message: "Enter the employee's salary",
          validation: validation.number,
        },
        {
          type: "list",
          name: "department",
          choices: depList,
        },
      ]).then((answer) => {
        for (let index = 0; index < departments.length; index++) {
          if (departments[index].name === answer.department) {
            answer.department_id = departments[index].id;
          }
        }

        let query2 = "INSERT INTO roles set ?;";
        const values = {
          title: answer.role,
          salary: answer.salary,
          department_id: answer.department_id,
        };
        this.connection.query(query2, values, (err, res) => {
          if (err) throw err;
        });
        console.log(`Adding ${answer.role} to roles table.`);
      });
    });
  }

  updateEmployee() {
    let empQuery = `SELECT employees.id, concat(employees.first_name, ' ' ,  employees.last_name) AS Employee FROM employees ORDER BY Employee ASC;`;
    let roleQuery = `SELECT id, title FROM roles ORDER BY title ASC;`;
    return this.connection.query(roleQuery, (err, roles) => {
      this.connection.query(empQuery, (err, emps) => {
        if (err) throw err;
        let rolesList = roles.map((row) => {
          return row.title;
        });
        let empsList = emps.map((row) => {
          return row.Employee;
        });
        console.table(rolesList);
        console.table(empsList);
      });
    });
  }
}

module.exports = new DB(connection);
