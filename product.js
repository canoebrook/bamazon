var mysql = require("mysql");
var inquirer = require("inquirer");

var Product = function() {
  this.item_id;
  this.product_name;
  this.department_name;
  this.price;
  this.stock_quantity;
  this.product_sales;
  
  this.insertRec = function() {
    var query = connection.query(
      "INSERT INTO products SET ?",
      {
        item_id:         this.item_id,
        product_name:    this.product_name,
        department_name: this.department_name,
        price:           this.price,
        stock_quantity:  this.stock_quantity,
        product_sales:   this.product_sales
      },
      function(err, res) {
        console.log(res.affectedRows + " Product inserted!\n");
      }
    )};


  this.deleteRec = function() {
    connection.query(
      "DELETE FROM products WHERE ?",
      {
        item_id: this.item_id
      },
      function(err, res) {
        if (err) throw err;
        return res;
      }
    ) 
  };

  this.selectRec = function(connection, v_where) {
    if (v_where) { 
      var q = "SELECT * FROM products WHERE " + v_where;
    } else {
      var q = "SELECT * FROM products"; 
    }; 
    // console.log(q);
    connection.query(q, function(err, res) {
      if (err) throw err;
      console.log('Item   Product  Dept   Price  Quantity\n');
      var rowArr = [];
      Object.keys(res).forEach(function(key) {
        var row = res[key];
        console.log(row.item_id +" "+ row.product_name + " "+ row.department_name+" "+row.price+" "+row.stock_quantity);
        rowArr.push(row);
        });
        inquirer
        .prompt({ 
          name: "item",
          type: "input",
          message: "Enter the item you wish to order:"
        })
        .then(function(answer) { 
          inquirer
            .prompt({
              name: "quantity",
              type: "input",
              message: "Enter the quantity you want:"
            })  
            .then(function(answer1){ 
              var q_item = answer.item;
              var q_qty  = answer1.quantity;
              console.log(q_item);
              console.log(q_qty);
              if (rowArr[q_item-1].stock_quantity < q_qty) {
                console.log("Insufficient quantity!");
                connection.end();
              } else {
                this.stock_quantity = rowArr[q_item-1].stock_quantity - q_qty;
                this.item_id = rowArr[q_item-1].item_id;
                var updRec = Product.updateRec(); 
                  if (updRec.affectedRows ===1) {
                    console.log('')
                  }
                  var orderTotal = q_qty * rowArr[q_item].price;
                  console.log('Your Order Total is ' + orderTotal );
                  connection.end();
                
              };

            });  
      });

    });
  };
  
  this.updateRec = function() {
    var query = connection.query(
      "UPDATE products SET ? WHERE ?",
      [
        {
          stock_quantity: this.stock_quantity
        },
        {
          item_id: this.item_id
        }
      ],
      function(err, res) {
        if (err) {throw err};
        return res;
        }
  )};
  
}

module.exports = Product;

