# 🛒 Amazon Clone — Full Stack PERN Application

A full-stack **Amazon-style e-commerce platform** built using the **PERN stack
(PostgreSQL, Express, React, Node.js)**.
Supports product browsing, search, JWT authentication, cart management, and
order placement with a responsive Amazon-like UI.

---

## 🌐 Live Demo

| Service              | URL                                          |
|----------------------|----------------------------------------------|
| Frontend (Vercel)    | https://amazon-clone-psi-lilac.vercel.app    |
| Backend (Render)     | https://amazon-clone-1-2wgs.onrender.com     |

---

## ✨ Features

### 👤 User
- Register & Login with JWT Authentication
- Persistent sessions using localStorage
- Secure password hashing with bcrypt

### 🛍️ Products
- Browse product grid with images, prices & ratings
- Filter by category (Electronics, Books, Clothing, Home)
- Live search by product name
- Detailed product page with image gallery & stock info

### 🛒 Cart & Orders
- Add / remove items from cart
- Update quantity with real-time total
- Place orders with delivery address & payment method
- Order confirmation with unique Order ID
- Cart synced to database for logged-in users

---

## 🧰 Tech Stack

| Layer       | Technology                          |
|-------------|-------------------------------------|
| Frontend    | React, React Router, Axios, CSS     |
| Backend     | Node.js, Express.js                 |
| Database    | PostgreSQL                          |
| Auth        | JWT + bcryptjs                      |
| Deployment  | Vercel (Frontend), Render (Backend) |

---

## 🏗️ Architecture

    React Frontend (localhost:3000)
             │
             │  HTTP REST API (axios)
             ▼
    Express.js Backend (localhost:5000)
             │
             │  SQL Queries (node-postgres / pg)
             ▼
    PostgreSQL Database

---

## 📁 Folder Structure

    amazon-clone/
    │
    ├── backend/
    │   ├── db/
    │   │   ├── pool.js               ← PostgreSQL connection
    │   │   └── schema.sql            ← Table definitions + seed data
    │   ├── middleware/
    │   │   └── authMiddleware.js     ← JWT verification
    │   ├── routes/
    │   │   ├── authRoutes.js
    │   │   ├── productRoutes.js
    │   │   ├── cartRoutes.js
    │   │   └── orderRoutes.js
    │   ├── server.js
    │   └── package.json
    │
    ├── src/
    │   ├── components/
    │   │   ├── Navbar/
    │   │   └── ProductCard/
    │   ├── context/
    │   │   └── AuthContext.js        ← Global auth state
    │   ├── pages/
    │   │   ├── Home/
    │   │   ├── Auth/
    │   │   ├── ProductDetail/
    │   │   ├── Cart/
    │   │   ├── Checkout/
    │   │   └── OrderConfirmation/
    │   ├── data/
    │   ├── App.js
    │   └── index.js
    │
    ├── public/
    └── README.md

---

## ⚙️ Local Setup

### 1. Clone the repository

    git clone https://github.com/VINEETSACHDEVA778/amazon-clone.git
    cd amazon-clone

### 2. Setup the Backend

    cd backend
    npm install

Create a .env file inside the backend/ folder:

    DB_HOST=localhost
    DB_PORT=5432
    DB_NAME=amazon_clone
    DB_USER=postgres
    DB_PASSWORD=your_postgres_password
    JWT_SECRET=your_secret_key
    PORT=5000

Create the database and tables:

    psql -U postgres -c "CREATE DATABASE amazon_clone;"
    psql -U postgres -d amazon_clone -f db/schema.sql

Start the backend:

    npm run dev

Backend runs at → http://localhost:5000

---

### 3. Setup the Frontend

Open a new terminal in the root amazon-clone/ folder:

    npm install
    npm start

Frontend runs at → http://localhost:3000

---

## 🗄️ Database Schema

    users        → id, name, email, password, created_at
    products     → id, name, price, image, category, rating,
                   review_count, description, stock
    orders       → id, user_id, total, payment_method,
                   address, status, created_at
    order_items  → id, order_id, product_id, name,
                   price, quantity, image
    cart_items   → id, user_id, product_id, quantity

---

## 📡 API Endpoints

### Auth

    POST   /api/auth/register    → Create new user
    POST   /api/auth/login       → Login + receive JWT token
    GET    /api/auth/me          → Get logged-in user info

### Products

    GET    /api/products         → Get all products
                                   (supports ?search= and ?category=)
    GET    /api/products/:id     → Get single product

### Cart  (requires Bearer token)

    GET    /api/cart             → Get user's cart
    POST   /api/cart             → Add item to cart
    PUT    /api/cart/:productId  → Update item quantity
    DELETE /api/cart/:productId  → Remove item from cart
    DELETE /api/cart             → Clear entire cart

### Orders  (requires Bearer token)

    POST   /api/orders           → Place an order
    GET    /api/orders           → Get order history
    GET    /api/orders/:id       → Get single order

---

## 🚀 Deployment

### Backend — Render
    1. Push code to GitHub
    2. Create a new Web Service on Render (https://render.com)
    3. Set root directory to backend/
    4. Add environment variables: DATABASE_URL, JWT_SECRET, PORT
    5. Start command: node server.js

### Frontend — Vercel
    1. Import GitHub repo on Vercel (https://vercel.com)
    2. Set root directory to root /
    3. Build command: npm run build
    4. Update all localhost:5000 API URLs to the Render backend URL

---

## 🔮 Future Improvements

- [ ] Wishlist / saved items
- [ ] Product reviews & ratings
- [ ] Admin dashboard
- [ ] Payment gateway (Razorpay / Stripe)
- [ ] Order history page
- [ ] Product recommendations
- [ ] Email order confirmation

---

## 👨‍💻 Author

    Name    : Vineet Kumar
    Course  : BE CSE — Chandigarh University
    GitHub  : https://github.com/VINEETSACHDEVA778

---

## 📄 License

This project is built for educational and learning purposes.
