const express = require('express');

const ware = express();

/*
ware.use('/', (req, res, next) => {
    console.log('/ middleware');
    next(); // Allows the request to continue to the next middleware
}); 

ware.use('/users', (req, res, next) => {
    console.log('/ users middleware');
    res.send('<p>This works!</p>');
});
*/

ware.use('/users', (req, res, next) => {
    console.log('/ users middleware');
    res.send('<p>This works!</p>');
});

ware.use('/', (req, res, next) => {
    console.log('/ middleware');
    res.send('<p>This works?</p>');
});


ware.listen(3000);
