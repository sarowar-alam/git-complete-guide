const express = require('express');
const app = express();
app.use(express.json());

// In-memory product store
const products = [
  { id: 1, name: 'Nexus Pro', price: 99, category: 'software', stock: 999 },
  { id: 2, name: 'Nexus Team', price: 299, category: 'software', stock: 500 },
  { id: 3, name: 'Developer Toolkit', price: 49, category: 'tools', stock: 200 }
];
let nextId = 4;

app.get('/', (req, res) => res.json({ service: 'product-service', version: '1.0.0', status: 'ok' }));

app.get('/products', (req, res) => {
  const { category } = req.query;
  res.json(category ? products.filter(p => p.category === category) : products);
});

app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

app.post('/products', (req, res) => {
  const { name, price, category, stock } = req.body;
  if (!name || !price) return res.status(400).json({ error: 'name and price required' });
  const product = { id: nextId++, name, price, category: category || 'general', stock: stock || 0 };
  products.push(product);
  res.status(201).json(product);
});

app.delete('/products/:id', (req, res) => {
  const idx = products.findIndex(p => p.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Product not found' });
  products.splice(idx, 1);
  res.status(204).send();
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`product-service on port ${PORT}`));
