const { Product } = require("../models");

const productData = [
  {
    product_name: "T-Shirt",
    price: 12.99,
    stock: 20,
    category_id: 1,
  },
  {
    product_name: "Surfing Board Emblem T-Shirt",
    price: 19.99,
    stock: 25,
    category_id: 1,
  },
  {
    product_name: "Running Sneakers",
    price: 120.0,
    stock: 20,
    category_id: 5,
  },
  {
    product_name: "Toe Shoes",
    price: 59.99,
    stock: 15,
    category_id: 5,
  },
  {
    product_name: "Baseball Hat",
    price: 12.99,
    stock: 20,
    category_id: 4,
  },
  {
    product_name: "Popular CDs",
    price: 15.99,
    stock: 50,
    category_id: 3,
  },
  {
    product_name: "Laser Disks",
    price: 20.99,
    stock: 30,
    category_id: 3,
  },
  {
    product_name: "Shorts",
    price: 24.99,
    stock: 16,
    category_id: 2,
  },
  {
    product_name: "Board Shorts",
    price: 35.99,
    stock: 30,
    category_id: 2,
  },
];

const seedProducts = () => Product.bulkCreate(productData);

module.exports = seedProducts;
