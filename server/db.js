const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "genz_store"
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed");
  } else {
    console.log("Connected to MySQL");
  }
});

module.exports = db;
