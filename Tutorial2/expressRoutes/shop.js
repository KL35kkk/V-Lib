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

router.get('/products', shopController.getProducts);

router.get('/cart', shopController.getCart);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

module.exports = router;