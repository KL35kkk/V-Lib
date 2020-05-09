const express = require('express');
const path = require('path');
const rootDir = require('../path/dir');

const router = express.Router();

router.get('/items', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'A3-folder', 'html', 'items.html'));
});

module.exports = router;