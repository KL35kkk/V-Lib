// For all the other routes
const express = require('express');
const path = require('path');
const rootDir = require('../expressPath/path');

const adminController = require('../expressControllers/adminController');

const router = express.Router();

// /admin/add-product  => GET
router.get('/add-product', adminController.getAddProductPage);

// /admin/products  => GET
router.get('/products', adminController.getProducts);

// /admin/add-product  => POST
router.post('/add-product', adminController.postAddProductPage);

module.exports = router;