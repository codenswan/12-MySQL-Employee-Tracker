const express = require('express');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'rootuser',
    database: 'employees'
});


const port = process.env.PORT || 3050
app.listen(port, () => {
    console.log(`Server started on ${port}`);
});