var inquirer = require("inquirer");
var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});
var Table = require("cli-table");

function validatePositiveInteger(input) {
  var reg = /^\d+$/;
  var isValid = reg.test(input) && input > 0;
  return isValid || "Please enter an integer greater than zero.";
}

function prompt() {
  var promptName = {
    message: "Please enter the ID of the product you'd like to buy:",
    name: "id",
    validate: validatePositiveInteger
  };
  
  var promptQuantity = {
    message: "Please enter the quantity you'd like to buy:",
    name: "quantity",
    validate: validatePositiveInteger
  };
  
  inquirer.prompt([
    promptName,
    promptQuantity
  ]).then(function(user) {
    buyProduct(user.id, user.quantity);
  });
}

function buyProduct(id, quantity) {
  connection.query("SELECT item_id, product_name, price, stock_quantity FROM products WHERE item_id=" + id, function(err, res) {
    var stockQuantity = res[0].stock_quantity;
    var price = res[0].price;
    var totalPrice;
    if (err) throw err;
    if (quantity > stockQuantity) {
      console.log("We do not have sufficient stock. Please choose a smaller quantity or a different product.");
    } else {
      var newQuantity = stockQuantity - quantity;
      connection.query("UPDATE products SET stock_quantity=" + newQuantity + " WHERE item_id=" + id, function(err, res2) {});
      totalPrice = price * quantity;
      var message = "Purchased " + quantity + " item";
      quantity > 1 ? message += "s" : null;
      message += " at $" + price + " each for a total of $" + totalPrice + ".";
      console.log(message);
    }
    prompt();
  });
}

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
});