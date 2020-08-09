const mysql = require("mysql2/promise");

async function main() {
  // get the client
  // create the connection
  const connection = await mysql
    .createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "rootuser",
      database: "staffDB",
    })
    .catch((err) => {
      console.log(err);
    });
  return connection;
}

module.exports = main;
