CREATE DATABASE Bamazon;
USE Bamazon;
CREATE TABLE products (
    item_id INT NOT NULL,
    product_name VARCHAR(250) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10 , 2 ) NOT NULL,
    stock_quantity INT NOT NULL,
    UNIQUE KEY (item_id)
);
INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES (12, 'basketball', 'sporting goods', 12.49, 10),
       (15, 'tennis racquet', 'sporting goods', 149.99, 4),
       (8, 'King Kong DVD', 'movies and tv', 9.99, 8),
       (45, 'Saving Private Ryan DVD', 'movies and tv', 5.99, 10),
       (33, 'Grapes of Wrath', 'books', 19.99, 4),
       (2, 'felt-tipped pens', 'office supplies', 59.99, 15),
       (10, 'Arm&Hammer laundry detergent', 'home goods', 10.99, 20),
       (78, 'Gatorade', 'grocery', 1.99, 25),
       (84, 'Dannon yogurt', 'grocery', 2.99, 30),
       (65, 'Boxer briefs', 'clothing', 13.99, 10);