var mysql = require('mysql');
var inquirer = require('inquirer');
var keys = require('./keys.js');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: keys.databaseKeys.username,
    password: keys.databaseKeys.password,
    database: "Bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    getAllProducts().then(function(result) {
        result.forEach(function(item) {
            console.log('Item ID: ' + item.item_id + ' | Product Name: ' + item.product_name + ' | Price: ' + item.price);
        });
    }).then(function() {
        return whatWouldYouLike();
    });
});

function getAllProducts() {
    return new Promise(function(resolve, reject) {
        connection.query("SELECT * FROM products", function(err, res) {
            if (err) reject(err);
            resolve(res);
        });
    });
}

function whatWouldYouLike() {
    return inquirer.prompt([{
        name: 'product_id',
        message: 'What is the ID of the product you would like to buy?',
        type: 'input',
        validate: function(value) {
            if (isNaN(value) === false) {
                return true;
            } else {
                console.log('\nPlease enter a valid ID.');
                return false;
            }
        }
    }, {
        name: 'number_of_units',
        message: 'How many units would you like to buy?',
        type: 'input',
        validate: function(value) {
            if (isNaN(value) === false) {
                return true;
            } else {
                console.log('\nPlease enter a valid quantity.');
                return false;
            }
        }
    }]).then(function(answer) {
        return new Promise(function(resolve, reject) {
            connection.query("SELECT * FROM products WHERE item_id=?", answer.product_id, function(err, res) {
                if (err) reject(err);
                resolve(res);
            });
        }).then(function(result) {
            if (answer.number_of_units > result[0].stock_quantity) {
                return "Insufficient quantity!";
            } else {
                var object = {};
                object.answer = answer;
                object.result = result;
                return object;
            }
        }).catch(function(err) {
            console.log(err);
            connection.destroy();
        }).then(function(object) {
            if (object.answer) {
                var newQuantity = object.result[0].stock_quantity - object.answer.number_of_units;
                var product = object.answer.product_id;
                var totalCost = (object.result[0].price * object.answer.number_of_units).toFixed(2);
                connection.query("UPDATE products SET stock_quantity=? WHERE item_id=?", [newQuantity, product], function(err, res) {
                    if (err) reject(err);
                    console.log('Your total cost is $' + totalCost);
                    connection.destroy();
                });
            } else {
                console.log(object);
                connection.destroy();
            }
        });
    });
}