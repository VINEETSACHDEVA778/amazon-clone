Amazon Clone (Full Stack PERN Application)

A full-stack Amazon-style e-commerce platform built using the PERN stack (PostgreSQL, Express, React, Node.js).
The application supports product browsing, search, authentication, cart management, and order placement with a responsive Amazon-like UI.

Live Demo

Frontend (Deployed on Vercel)

https://amazon-clone-psi-lilac.vercel.app

Backend (Deployed on Render)

https://amazon-clone-1-2wgs.onrender.com
Features
User Features
User Registration & Login (JWT Authentication)
Browse products by category
Search products by name
View detailed product page
Add products to cart
Update cart quantity
Checkout and place orders
Order confirmation page
Product Features
Product listing grid
Product detail page
Product image gallery
Price and stock availability
Category filters
Search functionality
Cart & Order Management
Add items to cart
Update quantity
Remove items from cart
Order placement
Order confirmation with order ID
Tech Stack
Frontend
React
React Router
Axios
CSS
Backend
Node.js
Express.js
JWT Authentication
bcrypt password hashing
Database
PostgreSQL
Deployment

Frontend: Vercel
Backend: Render
Database: PostgreSQL (Render)

Project Architecture
Frontend (React)
       │
       │ HTTP API
       ▼
Backend (Node.js + Express)
       │
       │ SQL Queries
       ▼
PostgreSQL Database
Folder Structure
amazon-clone
│
├── backend
│   ├── routes
│   ├── middleware
│   ├── db
│   ├── server.js
│   └── package.json
│
├── src
│   ├── components
│   ├── pages
│   ├── context
│   ├── data
│   └── App.js
│
├── public
└── README.md
Installation (Local Setup)
Clone Repository
git clone https://github.com/VINEETSACHDEVA778/amazon-clone.git
cd amazon-clone
Install Frontend
npm install
npm start

Frontend runs on

http://localhost:3000
Install Backend
cd backend
npm install
npm run dev

Backend runs on

http://localhost:5000
Environment Variables

Create .env inside backend:

DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_secret_key
PORT=5000
API Endpoints
Auth
POST /api/auth/register
POST /api/auth/login
Products
GET /api/products
GET /api/products/:id
Cart
GET /api/cart
POST /api/cart
PUT /api/cart/:id
DELETE /api/cart/:id
Orders
POST /api/orders
GET /api/orders
Future Improvements
Wishlist functionality
Product reviews
Admin dashboard
Payment gateway integration
Order history page
Product recommendations
Author

Vineet Kumar

BE CSE – Chandigarh University

GitHub
https://github.com/VINEETSACHDEVA778

License

This project is built for educational and learning purposes
