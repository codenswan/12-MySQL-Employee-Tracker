const connection = require("./connection.js");

class DB {
  // Keeping a reference to the connection on the class in case we need it later
  constructor(connection) {
    this.connection = connection;
  }

  // Find all employees, join with roles and departments to display their roles, salaries, departments, and managers
  findAllEmployees() {
    const query =
      "SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employees LEFT JOIN roles on employees.roles_id = roles.id LEFT JOIN department on roles.department_id = department.id LEFT JOIN employees manager on manager.id = employees.manager_id;";
    return this.connection.query(query, (err, res) => {
      if (err) throw err;
      console.table(res);
      init();
    });
  }

  // addEmployee() {
  //   return this.connection.query(
  //     "INSERT INTO..."
  //   );
  // }
}

module.exports = new DB(connection);
