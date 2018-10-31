var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require("cli-table");
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});

function prompt() {
  var promptName = {
    name: "buyName",
    message: "Please enter the ID of the product you'd like to buy:"
  };
  
  var promptQuantity = {
    name: "buyQuantity",
    message: "Please enter the quantity you'd like to buy:"
  };
  
  inquirer.prompt([
    promptName,
    promptQuantity
  ]).then(function(user) {
    // check if there's enough
  // if not, "Insufficient quantity!"
  // if so, update quantity remaining
  // show customer total cost of purchase
  });
}

// display items for sale
connection.query("SELECT * FROM products", function(err, res) {
  if (err) throw err;
  var table = new Table({
    head: ["ID", "Name", "Price"],
    colWidths: [6, 40, 20]
  });
  res.forEach(function(item, index) {
    table.push([res[index].item_id, res[index].product_name, res[index].price]);
  });
  console.log(table.toString());
  prompt();
  connection.end();
});