const express = require('express');
const path = require('path');
const productsRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);

// Health check
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    app: 'ecommerce-app',
    version: require('./package.json').version,
    endpoints: ['/products', '/orders']
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`ecommerce-app running on http://localhost:${PORT}`);
});

module.exports = app;
