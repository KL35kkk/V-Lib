const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'expressViews');

const adminRoutes = require('./expressRoutes/admin');
const shopRoutes = require('./expressRoutes/shop');

const errorController = require('./expressControllers/404');

const mongoConnect = require('./expressPath/database').mongoConnect;
const User = require('./expressModels/userModel');

app.use(bodyParser.urlencoded({extended: false}));
// grant access to the public folder
// if we want to put files like css inside the public folder, we'll grant its access here
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('5efdb7777dd00f5a93df6035')
        .then(user => {
            req.user = new User(user.name, user.email, user.cart, user._id);
            next();
        })
        .catch(err => console.log(err));
});

app.use('/admin', adminRoutes); // to replace other routes
app.use(shopRoutes); // to replace the general routes

app.use(errorController.get404Page);

mongoConnect(client => {
    app.listen(3000);
});
