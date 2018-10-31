var inquirer = require("inquirer");
var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});

// display items for sale
// ids, names, prices

// prompt for ID of product to buy
// prompt for quantity

// check if there's enough
// if not, "Insufficient quantity!"
// if so, update quantity remaining
// show customer total cost of purchase