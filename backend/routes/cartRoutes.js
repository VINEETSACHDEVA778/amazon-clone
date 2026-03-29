const express = require('express');
const router = express.Router();
const pool = require('../db/pool');
const authMiddleware = require('../middleware/authMiddleware');

// All cart routes require login
router.use(authMiddleware);

// GET /api/cart — get user's cart with product details
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
        ci.id, ci.quantity,
        p.id AS product_id, p.name, p.price, p.image, p.stock
       FROM cart_items ci
       JOIN products p ON ci.product_id = p.id
       WHERE ci.user_id = $1`,
      [req.user.userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/cart — add item to cart (or increase qty if already there)
router.post('/', async (req, res) => {
  try {
    const { product_id, quantity = 1 } = req.body;

    // Check product exists and has stock
    const product = await pool.query(
      'SELECT * FROM products WHERE id = $1',
      [product_id]
    );
    if (product.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Insert or update quantity using ON CONFLICT
    const result = await pool.query(
      `INSERT INTO cart_items (user_id, product_id, quantity)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, product_id)
       DO UPDATE SET quantity = cart_items.quantity + $3
       RETURNING *`,
      [req.user.userId, product_id, quantity]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/cart/:productId — set exact quantity
router.put('/:productId', async (req, res) => {
  try {
    const { quantity } = req.body;

    if (quantity < 1) {
      // If quantity is 0 or less, remove the item
      await pool.query(
        'DELETE FROM cart_items WHERE user_id = $1 AND product_id = $2',
        [req.user.userId, req.params.productId]
      );
      return res.json({ message: 'Item removed' });
    }

    const result = await pool.query(
      `UPDATE cart_items SET quantity = $1
       WHERE user_id = $2 AND product_id = $3
       RETURNING *`,
      [quantity, req.user.userId, req.params.productId]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/cart/:productId — remove one item
router.delete('/:productId', async (req, res) => {
  try {
    await pool.query(
      'DELETE FROM cart_items WHERE user_id = $1 AND product_id = $2',
      [req.user.userId, req.params.productId]
    );
    res.json({ message: 'Item removed from cart' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/cart — clear entire cart
router.delete('/', async (req, res) => {
  try {
    await pool.query(
      'DELETE FROM cart_items WHERE user_id = $1',
      [req.user.userId]
    );
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;