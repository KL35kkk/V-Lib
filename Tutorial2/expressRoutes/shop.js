// For the General Route
const express = require('express');
const path = require('path');
const rootDir = require('../expressPath/path');

const productsController = require('../expressControllers/productController');

const router = express.Router();

// General Route
// We need to use GET method here to ensure it exactly matches the '/' route.
// If we don't use GET method here, we can't go to the other routes (like 404 page) after this route.
router.get('/', productsController.getProducts);

module.exports = router;