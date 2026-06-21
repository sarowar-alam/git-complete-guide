const express = require('express');
const router = express.Router();

// In-memory product store
const products = [
  { id: 1, name: 'Nexus Pro Subscription', price: 99, category: 'software', stock: 999 },
  { id: 2, name: 'Nexus Team License', price: 299, category: 'software', stock: 500 },
  { id: 3, name: 'Developer Toolkit', price: 49, category: 'tools', stock: 200 },
  { id: 4, name: 'Cloud Storage Add-on', price: 19, category: 'addons', stock: 999 }
];
let nextId = 5;

// GET /products — list all
router.get('/', (req, res) => {
  const { category } = req.query;
  if (category) {
    return res.json(products.filter(p => p.category === category));
  }
  res.json(products);
});

// GET /products/:id — get one
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ error: `Product ${req.params.id} not found` });
  }
  res.json(product);
});

// POST /products — create
router.post('/', (req, res) => {
  const { name, price, category, stock } = req.body;
  if (!name || !price) {
    return res.status(400).json({ error: 'name and price are required' });
  }
  const product = { id: nextId++, name, price, category: category || 'general', stock: stock || 0 };
  products.push(product);
  res.status(201).json(product);
});

// PUT /products/:id — update
router.put('/:id', (req, res) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  products[index] = { ...products[index], ...req.body, id: products[index].id };
  res.json(products[index]);
});

// DELETE /products/:id — remove
router.delete('/:id', (req, res) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  products.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
