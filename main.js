const db = require("./models"); //* db here imports the class methods
const questions = require("./utils/questions.js"); //* imports the questions for the main menu
const { prompt } = require("inquirer");
const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");

clear();
//* this module displays the app banner in conole on entry point command "npm start"
console.log(
  chalk.red(figlet.textSync("Staff Database", { horizontalLayout: "full" }))
);

//* main menu function
function init() {
  //* displays menu questions 
  prompt(questions.startQuestions).then(async (answer) => {
    clear();
    //* switch calls db methods depending on user's answer. Once promise is resolved, the main menu runs again 
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
