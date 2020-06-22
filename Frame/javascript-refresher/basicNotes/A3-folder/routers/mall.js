const express = require('express');
const path = require('path');
const Rootdir = require('../path/dir');

const router = express.Router();


router.get('/', (req, res, next) => {
    res.sendFile(path.join(Rootdir, 'A3-folder', 'html', 'mall.html'));

});

module.exports = router;