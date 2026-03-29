CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE,
  password TEXT
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  title TEXT,
  price NUMERIC,
  image TEXT,
  rating INTEGER
);

CREATE TABLE cart (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  product_id INTEGER,
  quantity INTEGER
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  total NUMERIC,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (title, price, image, rating) VALUES
('Laptop', 75000, 'laptop.jpg', 4),
('Phone', 30000, 'phone.jpg', 5),
('Headphones', 2000, 'headphones.jpg', 4);