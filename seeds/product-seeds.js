const { Product } = require("../models");

// Product data
const productData = [
  {
    product_name: "T-Shirts",
    price: 12.99,
    stock: 14,
    category_id: 1,
  },
  {
    product_name: "Sneakers",
    price: 120.0,
    stock: 25,
    category_id: 5,
  },
  {
    product_name: "Fitted Hats",
    price: 24.99,
    stock: 12,
    category_id: 4,
  },
  {
    product_name: "Music Compilation Discs",
    price: 15.99,
    stock: 50,
    category_id: 3,
  },
  {
    product_name: "Board Shorts",
    price: 24.99,
    stock: 22,
    category_id: 2,
  },
];

const seedProducts = () => Product.bulkCreate(productData);

module.exports = seedProducts;
