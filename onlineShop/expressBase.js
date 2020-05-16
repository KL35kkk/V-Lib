const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'expressViews');

const adminRoutes = require('./expressRoutes/admin');
const shopRoutes = require('./expressRoutes/shop');

const errorController = require('./expressControllers/404');

app.use(bodyParser.urlencoded({extended: false}));
// grant access to the public folder
// if we want to put files like css inside the public folder, we'll grant its access here
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes); // to replace other routes
app.use(shopRoutes); // to replace the general routes

app.use(errorController.get404Page);

app.listen(3000);