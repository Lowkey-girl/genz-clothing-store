-- create database
CREATE DATABASE genz_clothing_db;
USE genz_clothing_db;

-- Users Table (Admin & User Roles)
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Category table
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL
);

-- Dummy category
INSERT INTO categories (category_name) VALUES
('T-Shirts'),
('Hoodies'),
('Jeans'),
('Streetwear'),
('Accessories');

-- Product table
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    image VARCHAR(255),
    description TEXT,
    category_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Dummy genz product
INSERT INTO products (name, price, image, description, category_id) VALUES
-- T-SHIRTS (1)
('Oversized Black Tee', 15.99, 'tee1.jpg', 'Minimal oversized black t-shirt', 1),
('Graphic Anime Tee', 17.50, 'tee2.jpg', 'Anime graphic print tee', 1),
('White Basic Tee', 12.99, 'tee3.jpg', 'Clean white daily wear tee', 1),
('Vintage Wash Tee', 18.99, 'tee4.jpg', 'Vintage washed street tee', 1),
('Smile Face Tee', 16.50, 'tee5.jpg', 'Gen Z smiley print t-shirt', 1),
('Skull Print Tee', 17.99, 'tee6.jpg', 'Dark skull aesthetic tee', 1),
('Pastel Pink Tee', 14.99, 'tee7.jpg', 'Soft pastel pink tee', 1),
-- HOODIES (2)
('Anime Hoodie', 29.99, 'hoodie1.jpg', 'Anime inspired hoodie', 2),
('Oversized Hoodie Black', 32.50, 'hoodie2.jpg', 'Oversized black hoodie', 2),
('Zip-Up Hoodie', 28.99, 'hoodie3.jpg', 'Casual zip-up hoodie', 2),
('Pastel Hoodie Blue', 30.99, 'hoodie4.jpg', 'Pastel blue hoodie', 2),
('Street Logo Hoodie', 34.99, 'hoodie5.jpg', 'Street logo print hoodie', 2),
('Skeleton Hoodie', 35.50, 'hoodie6.jpg', 'Skeleton print hoodie', 2),
('Minimal Grey Hoodie', 27.99, 'hoodie7.jpg', 'Minimal grey hoodie', 2),
-- JEANS (3)
('Baggy Jeans', 34.50, 'jeans1.jpg', 'Street-style baggy jeans', 3),
('Light Blue Denim', 32.99, 'jeans2.jpg', 'Light wash denim jeans', 3),
('Ripped Jeans', 36.99, 'jeans3.jpg', 'Ripped knee jeans', 3),
('Wide Leg Jeans', 38.50, 'jeans4.jpg', 'Wide leg street jeans', 3),
('Black Cargo Jeans', 40.99, 'jeans5.jpg', 'Cargo style jeans', 3),
('Vintage Denim', 35.99, 'jeans6.jpg', 'Vintage style denim', 3),
('High Waist Jeans', 33.50, 'jeans7.jpg', 'High waist fit jeans', 3),
-- STREETWEAR (4)
('Street Jacket', 49.99, 'street1.jpg', 'Urban street jacket', 4),
('Bomber Jacket', 45.50, 'street2.jpg', 'Classic bomber jacket', 4),
('Cargo Pants', 39.99, 'street3.jpg', 'Street cargo pants', 4),
('Techwear Vest', 44.99, 'street4.jpg', 'Techwear utility vest', 4),
('Oversized Flannel', 29.50, 'street5.jpg', 'Oversized flannel shirt', 4),
('Street Shorts', 24.99, 'street6.jpg', 'Casual street shorts', 4),
('Windbreaker', 41.99, 'street7.jpg', 'Light windbreaker jacket', 4),
-- ACCESSORIES (5)
('Street Chain', 9.99, 'acc1.jpg', 'Silver streetwear chain', 5),
('Bucket Hat', 12.99, 'acc2.jpg', 'Trendy bucket hat', 5),
('Beanie', 8.99, 'acc3.jpg', 'Warm minimalist beanie', 5),
('Crossbody Bag', 18.99, 'acc4.jpg', 'Street crossbody bag', 5),
('Rings Set', 7.99, 'acc5.jpg', 'Gen Z ring set', 5),
('Sunglasses', 14.99, 'acc6.jpg', 'Y2K sunglasses', 5),
('Street Cap', 11.99, 'acc7.jpg', 'Street style cap', 5),
('Chain Bracelet', 6.99, 'acc8.jpg', 'Silver chain bracelet', 5),
('Mini Backpack', 22.99, 'acc9.jpg', 'Mini street backpack', 5),
('Shoes', 4.99, 'acc10.jpg', 'Comfort Shoes', 5);

-- Order table
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    total_price DECIMAL(10,2),
    status ENUM('pending', 'paid', 'shipped') DEFAULT 'pending',
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Oreder item table
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT,
    price DECIMAL(10,2),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  role ENUM('admin','user') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Admin account
INSERT INTO users (name,email,password,role)
VALUES ('Admin','admin@genz.com','password','admin');
