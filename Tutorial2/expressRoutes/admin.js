// For all the other routes

const express = require('express');
const path = require('path');
const rootDir = require('../expressPath/path');

const router = express.Router();

// /admin/add-product  => GET
router.get('/add-product', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'expressViews', 'add-product.html'));
});

// /admin/product  => POST
router.post('/add-product', (req, res, next) => {  // parsing the incoming requests from the previous middleware
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;