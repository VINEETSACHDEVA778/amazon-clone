import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './context/AuthContext';

import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Checkout from './pages/Checkout/Checkout';
import OrderConfirmation from './pages/OrderConfirmation/OrderConfirmation';
import Auth from './pages/Auth/Auth';
import './App.css';

function App() {
  const { token } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch cart from backend when user logs in
  useEffect(() => {
    if (token) {
      axios.get('http://localhost:5000/api/cart', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        // Map backend response to match frontend shape
        const mapped = res.data.map(item => ({
          id: item.product_id,
          name: item.name,
          price: parseFloat(item.price),
          image: item.image,
          quantity: item.quantity,
          stock: item.stock,
        }));
        setCartItems(mapped);
      }).catch(() => setCartItems([]));
    } else {
      setCartItems([]);
    }
  }, [token]);

  const addToCart = async (product) => {
    // Update UI immediately
    setCartItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    // Sync to backend if logged in
    if (token) {
      try {
        await axios.post('http://localhost:5000/api/cart',
          { product_id: product.id, quantity: 1 },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (err) {
        console.error('Failed to sync cart:', err);
      }
    }
  };

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <Router>
      <Navbar cartCount={cartCount}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm} 
      />
      <Routes>
        <Route path="/"        element={<Home onAddToCart={addToCart} searchTerm={searchTerm}
      setSearchTerm={setSearchTerm} />} />
        <Route path="/auth"    element={<Auth />} />
        <Route path="/product/:id" element={<ProductDetail onAddToCart={addToCart} searchTerm={searchTerm}
      setSearchTerm={setSearchTerm} />} />
        <Route path="/cart"    element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/checkout" element={<Checkout cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
      </Routes>
    </Router>
  );
}

export default App;