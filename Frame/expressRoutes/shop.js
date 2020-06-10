// For the General Route
const express = require('express');
const path = require('path');
const rootDir = require('../expressPath/path');

const router = express.Router();

// General Route
// We need to use GET method here to ensure it exactly matches the '/' route.
// If we don't use GET method here, we can't go to the other routes (like 404 page) after this route.
router.get('/', (req, res, next) => {
    // since sendFile() method points to the global system path of the PC, we'll need path.join() method to find the current directory
    res.sendFile(path.join(rootDir, 'expressViews', 'shop.html')); 
    //res.sendFile(path.join(__dirname, '../', 'expressViews', 'shop.html')); 
});

module.exports = router;