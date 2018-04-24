var inquirer   = require("inquirer");
var customer   = require("./bamazonCustomer.js");
var manager    = require("./bamazonManager");
var supervisor = require("./bamazonSupervisor");

(function main() {
  
  console.log("****** BAMAZON ******\n");
    inquirer
      .prompt({
        name: "role",
        type: "rawlist",
        message: "Dave, who do you want to be today?",
        choices: ["Customer","Manager","Supervisor","EXIT"]
      })
      .then(function(answer) {
        if (answer.role.toUpperCase() === "CUSTOMER") {
          var BamazonCustomer = require("./bamazonCustomer.js");
          var customer = new BamazonCustomer();
          customer.launchMenu();          
        } else if (answer.role.toUpperCase() === "SUPERVISOR") {
          console.log("Unimplemented");
        } else if (answer.role.toUpperCase() === "MANAGER") {
          console.log("Unimplemented");
        };
        
      });
})();
