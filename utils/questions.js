const startQuestions = [
  {
    type: "list",
    name: "menu",
    message: "What would you like to do?",
    choices: [
      { name: "view all employees", value: "viewAllEmps" },
      { name: "view all departments", value: "viewAllDeps" },
      { name: "view all roles", value: "viewAllRoles" },
      { name: "update existing employee's role", value: "updateEmpRole" },
      { name: "update existing employee's manager", value: "updateEmpMgr" },
      { name: "add a new employee", value: "addNewEmployee" },
      { name: "add a new department", value: "addNewDepartment" },
      { name: "add a new role", value: "addNewRole" },
      { name: "End the application", value: "endApp" },
    ],
  },
];

module.exports = { startQuestions };
