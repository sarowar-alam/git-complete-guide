# ecommerce-app

A simple Node.js/Express e-commerce API. Use this repo to practice branching, merging, conflict resolution, and deployment.

## Stack

- Node.js v18+
- Express 4.x
- In-memory data store (no database required)

## Run Locally

```bash
cd sample-repositories/ecommerce-app
npm install
node app.js
# API running at http://localhost:3000
```

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Health check |
| GET | `/products` | List all products |
| GET | `/products/:id` | Get product by ID |
| POST | `/products` | Add a product |
| GET | `/orders` | List all orders |
| POST | `/orders` | Create an order |

## Project Structure

```
ecommerce-app/
├── app.js              # Express app entry point
├── package.json
├── .gitignore
├── routes/
│   ├── products.js     # Product routes
│   └── orders.js       # Order routes
├── models/
│   └── product.js      # Product data model
└── public/
    └── index.html      # Simple frontend
```

## Deploy to Render

See [Lab 10](../../labs/lab-10-deployment/README.md) for deployment instructions.

Build command: `npm install`
Start command: `node app.js`
Environment variable: `PORT=3000`
