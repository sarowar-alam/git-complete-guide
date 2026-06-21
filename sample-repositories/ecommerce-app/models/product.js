class Product {
  constructor(id, name, price, category, stock) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
    this.stock = stock;
  }
}

// In-memory product store
const products = [
  new Product(1, 'Laptop Stand', 49.99, 'accessories', 120),
  new Product(2, 'Mechanical Keyboard', 89.99, 'electronics', 75),
  new Product(3, 'USB-C Hub', 34.99, 'electronics', 200),
  new Product(4, 'Desk Lamp', 24.99, 'accessories', 300)
];
let nextId = 5;

Product.findById = (id) => products.find(p => p.id === id);

module.exports = { Product, products, getNextId: () => nextId++ };
