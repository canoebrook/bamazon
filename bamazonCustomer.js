var mysql      = require("mysql");
var inquirer   = require("inquirer");
var Product    = require("./product.js");

var BamazonCustomer = function() { 
  this.launchMenu = function () {
    var connection = mysql.createConnection({
      host: "localhost",
      port: 3306,
    
      // Your username
      user: "root",
    
      // Your password
      password: "",
      database: "bamazon_DB"
    });

    connection.connect(function(err) {
      if (err) throw err;    
      var product = new Product;
      product.selectRec(connection, "1=1");

    });
  }
  
};

module.exports = BamazonCustomer;