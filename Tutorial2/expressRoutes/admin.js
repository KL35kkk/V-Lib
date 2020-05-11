// For all the other routes
const express = require('express');
const path = require('path');
const rootDir = require('../expressPath/path');

const productsController = require('../expressControllers/productController');

const router = express.Router();

// /admin/add-product  => GET
router.get('/add-product', productsController.getAddProductPage);

// /admin/product  => POST
router.post('/add-product', productsController.postAddProductPage);

module.exports = router;