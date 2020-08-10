const db = require("./models");
const questions = require("./utils/questions.js");
const validation = require("./utils/validation.js");
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
    switch (answer.menu) {
      case "viewAllEmps":
        await db.findAllEmployees();
        init();
        clear();
        break;

      case "viewAllDeps":
        await db.findAllDepartments();
        init();
        clear();
        break;

      case "viewAllRoles":
        await db.findAllRoles();
        init();
        clear();
        break;
      
      case "addNewEmployee":
        await db.addEmployee();

      case "addNewDepartment":
        await db.addDepartment();
        init();
        clear();
        break;
      
      case "addNewRole":
        await db.addRole();
        init();
        clear();
        break;
    }
  });
}

init();
