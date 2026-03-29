const express = require('express');
const router = express.Router();
const pool = require('../db/pool');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

// POST /api/orders — place an order
router.post('/', async (req, res) => {
  const client = await pool.connect(); // use a transaction
  try {
    const { cartItems, paymentMethod, address, total } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    await client.query('BEGIN');

    // Create the order
    const orderResult = await client.query(
      `INSERT INTO orders (user_id, total, payment_method, address)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [req.user.userId, total, paymentMethod, address]
    );

    const order = orderResult.rows[0];

    // Insert each cart item into order_items
    for (const item of cartItems) {
      await client.query(
        `INSERT INTO order_items (order_id, product_id, name, price, quantity, image)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [order.id, item.id, item.name, item.price, item.quantity, item.image]
      );

      // Reduce stock
      await client.query(
        'UPDATE products SET stock = stock - $1 WHERE id = $2',
        [item.quantity, item.id]
      );
    }

    // Clear the user's cart
    await client.query(
      'DELETE FROM cart_items WHERE user_id = $1',
      [req.user.userId]
    );

    await client.query('COMMIT');

    res.status(201).json({
      message: 'Order placed successfully',
      orderId: 'ORD-' + String(order.id).padStart(6, '0'),
      order
    });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ error: 'Failed to place order' });
  } finally {
    client.release();
  }
});

// GET /api/orders — get user's order history
router.get('/', async (req, res) => {
  try {
    const orders = await pool.query(
      'SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.userId]
    );

    // For each order, get its items
    const ordersWithItems = await Promise.all(
      orders.rows.map(async (order) => {
        const items = await pool.query(
          'SELECT * FROM order_items WHERE order_id = $1',
          [order.id]
        );
        return { ...order, items: items.rows };
      })
    );

    res.json(ordersWithItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/orders/:id — get single order
router.get('/:id', async (req, res) => {
  try {
    const order = await pool.query(
      'SELECT * FROM orders WHERE id = $1 AND user_id = $2',
      [req.params.id, req.user.userId]
    );

    if (order.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const items = await pool.query(
      'SELECT * FROM order_items WHERE order_id = $1',
      [req.params.id]
    );

    res.json({ ...order.rows[0], items: items.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;