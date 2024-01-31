CREATE DATABASE IF NOT EXISTS inventory_db;

CREATE TABLE IF NOT EXISTS products(
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_sku VARCHAR(50) UNIQUE,
    product_name VARCHAR(100) NOT NULL,
    product_price DECIMAL(10,2) NOT NULL,
    product_type ENUM('DVD', 'Book', 'Furniture') NOT NULL,
    product_size DECIMAL(10,2),
    product_weight DECIMAL(10,2),
    product_height DECIMAL(10,2),
    product_width DECIMAL(10,2),
    product_length DECIMAL(10,2)
);

-- Insertion of products
INSERT INTO products (product_sku, product_name, product_price, product_type, product_size)
VALUES('JVC200123','Acme DISC',1.50,'DVD',700);

INSERT INTO products (product_sku, product_name, product_price, product_type, product_weight)
VALUES('GGWP0007','War and Peace',20,'Book',2);

INSERT INTO products (product_sku, product_name, product_price, product_type, product_height, product_width, product_length)
VALUES('TR120555','Chair',40,'Furniture',24,45,15);

INSERT INTO products (product_sku, product_name, product_price, product_type, product_height, product_width, product_length)
VALUES('TR120556','Table',55.07,'Furniture',120,75,60);

INSERT INTO products (product_sku, product_name, product_price, product_type, product_size)
VALUES('JVC200124','Xyz DISC',2.76,'DVD',300);

INSERT INTO products (product_sku, product_name, product_price, product_type, product_weight)
VALUES('GGWP0008','Harry Potter',30.5,'Book',1.5);

INSERT INTO products (product_sku, product_name, product_price, product_type, product_weight)
VALUES('GGWP0009','The Final Gambit',10,'Book',2.5);

INSERT INTO products (product_sku, product_name, product_price, product_type, product_size)
VALUES('JVC200125','Poe DISC',7,'DVD',550);

INSERT INTO products (product_sku, product_name, product_price, product_type, product_size)
VALUES('JVC200126','Lkt DISC',4.90,'DVD',1400);

INSERT INTO products (product_sku, product_name, product_price, product_type, product_height, product_width, product_length)
VALUES('TR120557','Lazy Boy',112.49,'Furniture',95,95,90);

INSERT INTO products (product_sku, product_name, product_price, product_type, product_height, product_width, product_length)
VALUES('TR120558','Desk',20.99,'Furniture',90,75,60);

INSERT INTO products (product_sku, product_name, product_price, product_type, product_weight)
VALUES('GGWP0010','BATMAN',5.99,'Book',2);





