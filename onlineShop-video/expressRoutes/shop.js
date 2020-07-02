// For the General Route
const express = require('express');
const path = require('path');
const rootDir = require('../expressPath/path');

const shopController = require('../expressControllers/shopController');

const router = express.Router();

// General Route
// We need to use GET method here to ensure it exactly matches the '/' route.
// If we don't use GET method here, we can't go to the other routes (like 404 page) after this route.
router.get('/', shopController.getIndex);

// Products page and single product detail page
router.get('/products', shopController.getProducts);
router.get('/products/:productID', shopController.getProduct);

// Cart page
router.get('/cart', shopController.getCart);
router.post('/cart', shopController.postCart);
// Also add delete-item in the cart page
// router.post('/cart-delete-item', shopController.postCartDelete);

// Orders
// router.get('/orders', shopController.getOrders);
// router.post('/create-order', shopController.postOrders);

// Checkout
// router.get('/checkout', shopController.getCheckout);

module.exports = router;