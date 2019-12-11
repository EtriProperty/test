const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root1234",
  port: 3306,
  database: "my_db"
});

connection.connect();

connection.query("SELECT * from Persons", function(err, rows, fields) {
  if (!err) console.log("The solution is : ", rows);
  else console.log("Error", err);
});

connection.end();
