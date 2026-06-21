const express = require('express');
const router = express.Router();

// In-memory order store
const orders = [];
let nextId = 1;

// GET /orders — list all
router.get('/', (req, res) => {
  res.json(orders);
});

// GET /orders/:id
router.get('/:id', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) {
    return res.status(404).json({ error: `Order ${req.params.id} not found` });
  }
  res.json(order);
});

// POST /orders — create
router.post('/', (req, res) => {
  const { customerName, items } = req.body;
  if (!customerName || !items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'customerName and items[] are required' });
  }
  const order = {
    id: nextId++,
    customerName,
    items,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  orders.push(order);
  res.status(201).json(order);
});

// PATCH /orders/:id/status
router.patch('/:id/status', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
  if (!validStatuses.includes(req.body.status)) {
    return res.status(400).json({ error: `Status must be one of: ${validStatuses.join(', ')}` });
  }
  order.status = req.body.status;
  res.json(order);
});

module.exports = router;
