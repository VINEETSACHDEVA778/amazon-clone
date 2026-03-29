const express = require('express');
const cors = require('cors');
require('dotenv').config();

require('./db/pool');

const app = express();

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://amazon-clone-psi-lilac.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/auth',     require('./routes/authRoutes'));
app.use('/api/cart',     require('./routes/cartRoutes'));
app.use('/api/orders',   require('./routes/orderRoutes'));

app.get('/', (req, res) => {
  res.json({ message: 'Amazon Clone API is running! 🚀' });
});

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
});