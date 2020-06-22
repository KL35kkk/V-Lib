// For all the other routes
const express = require('express');
const path = require('path');
const rootDir = require('../expressPath/path');

const adminController = require('../expressControllers/adminController');

const router = express.Router();

// /admin/add-product  => GET/POST
router.get('/add-product', adminController.getAddProductPage);
router.post('/add-product', adminController.postAddProductPage);

// /admin/edit-product => GET/POST
router.get('/edit-product/:productID', adminController.getEditProductPage);
router.post('/edit-product', adminController.postEditProductPage);

// /admin/delete-product => POST
// we only need POST request for delete since we don't need to retrieve any page to change input
router.post('/delete-product', adminController.postDeleteProductPage);

// /admin/products  => GET
router.get('/products', adminController.getProducts);

module.exports = router;