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

  // Find all employees, join with roles and departments to display their roles, salaries, departments, and managers
  findAllEmployees() {
    const query =
      "SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employees LEFT JOIN roles on employees.role_id = roles.id LEFT JOIN departments on roles.department_id = departments.id LEFT JOIN employees manager on manager.id = employees.manager_id;";
    return this.connection.query(query, (err, res) => {
      if (err) throw err;
      console.table(res);
    });
  }

  // find all departments
  findAllDepartments() {
    const query = "SELECT * FROM departments";
    return this.connection.query(query, (err, res) => {
      if (err) throw err;
      console.table(res);
    });
  }

  //find all roles and display with department id and name
  findAllRoles() {
    const query =
      "SELECT * FROM roles LEFT JOIN departments on roles.department_id = departments.id";

    this.connection.query(query, (err, res) => {
      if (err) throw err;
      console.table(res);
    });
  }

  addEmployee() {
    let [rows, fields] = this.connection
      .execute(`Select id, name FROM departments ORDER BY name ASC;`)
    
    let depList = rows.map((row) => {
          return row.name;
        });
    
    console.log(depList);

    // return prompt([
    //   {
    //     type: "input",
    //     name: "firstName",
    //     message: "What is the first name of the employee?",
    //     validation: validation.stringCapital,
    //   },
    //   {
    //     type: "input",
    //     name: "lastName",
    //     message: "What is the last name of the employee?",
    //     validation: validation.stringCapital,
    //   },
    //   {
    //     type: "list",
    //     name: "department",
    //     choices: depList,
    //   },
    // ]);
  }

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
}

module.exports = new DB(connection);
