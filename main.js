const db = require('./models');
const questions = require("./utils/questions.js");
const { prompt } = require("inquirer");

const cTable = require("console.table");
const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");

// clear();
console.log(
  chalk.yellow(figlet.textSync("Staff Database", { horizontalLayout: "full" }))
);

function init() {
  prompt(questions.startQuestions).then((answer) => {
  switch (answer) {
    case value: "viewAll";
      db.findAllEmployees(); 
    break;
    
    default: 
    break;
  }
}) 
};

// prompt(questions.addEmployee).then((answer1) => {
//   db.findAllEmployees();
// });
init();