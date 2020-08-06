const validation = require("./validation.js");

const startQuestions = [
  {
    type: "list",
    name: "init",
    message: "What would you like to do?",
    choices: [
      { name: "view all employees", value: "viewAll" },
      { name: "view employees by department", value: "viewEmployeeDep" },
      { name: "view employees by role", value: "viewEmployeeRole" },
      { name: "update existing employee", value: "updateEmployeeDetails" },
      { name: "add a new employee", value: "addNewEmployee" },
      { name: "add a new department", value: "addNewDepartment" },
      { name: "add a new role", value: "addNewRole" },
      { name: "delete a department", value: "deleteDep" },
      { name: "delete a role", value: "deleteRole" },
      { name: "delete an employee", value: "deleteEmp" },
    ],
  },
];

// const addEmployee = [
//     {
//         type: "input",
//         name: "firstName",
//         message: "What is the employee's first name?"

// }
// ]

module.exports = { startQuestions };
