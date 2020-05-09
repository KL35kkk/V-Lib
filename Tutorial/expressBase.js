const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const adminRoutes = require('./expressRoutes/admin');
const shopRoutes = require('./expressRoutes/shop');

app.use(bodyParser.urlencoded({extended: false}));
// grant access to the public folder
// if we want to put files like css inside the public folder, we'll grant its access here
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes); // to replace other routes
app.use(shopRoutes); // to replace the general routes

app.use((req, res, next) => { // dealing with all the other Not Found routes
    res.status(404).sendFile(path.join(__dirname, 'expressViews', '404.html'));
});

app.listen(3000);