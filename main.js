const db = require("./models");
const questions = require("./utils/questions.js");
const { prompt } = require("inquirer");
const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");

clear();
console.log(
  chalk.red(figlet.textSync("Staff Database", { horizontalLayout: "full" }))
);

function init() {
  prompt(questions.startQuestions).then(async (answer) => {
    clear();
    switch (answer.menu) {
      case "viewAllEmps":
        await db.findAllEmployees();
       
        init();
        break;

      case "viewAllDeps":
        await db.findAllDepartments();
        init();
        break;

      case "viewAllRoles":
        await db.findAllRoles();
        init();
        break;

      case "addNewEmployee":
        await db.addEmployee();
        init();
        break;

      case "addNewDepartment":
        await db.addDepartment();
        init();
        break;

      case "addNewRole":
        await db.addRole();
        init();
        break;
      
      case "updateEmpRole":
        await db.updateEmployeeRole();
        init();
        break;
      
      case "updateEmpMgr":
        await db.updateEmployeeMgr();
        init();
        break;
      
      case "endApp":
        await db.endApplication();
        break;
    
    }
  });
}

init();
