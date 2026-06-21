const { Product } = require('./product');

class Order {
  constructor(id, items, customerName) {
    this.id = id;
    this.items = items; // [{ productId, quantity }]
    this.customerName = customerName;
    this.status = 'pending';
    this.createdAt = new Date().toISOString();
    this.total = this.calculateTotal();
  }

  calculateTotal() {
    return this.items.reduce((sum, item) => {
      const product = Product.findById(item.productId);
      return product ? sum + (product.price * item.quantity) : sum;
    }, 0);
  }
}

// In-memory store
const orders = [];
let nextId = 1;

module.exports = { Order, orders, getNextId: () => nextId++ };
