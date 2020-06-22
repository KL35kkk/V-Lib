const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./expressPath/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'expressViews');

const adminRoutes = require('./expressRoutes/admin');
const shopRoutes = require('./expressRoutes/shop');

const sequelize = require('./expressPath/database');

const errorController = require('./expressControllers/404');

const Product = require('./expressModels/productModel');
const User = require('./expressModels/userModel');
const Cart = require('./expressModels/cartModel');
const CartItem = require('./expressModels/cartItemModel');
const Order = require('./expressModels/orderModel');
const OrderItem = require('./expressModels/orderItemModel');

app.use(bodyParser.urlencoded({extended: false}));
// grant access to the public folder
// if we want to put files like css inside the public folder, we'll grant its access here
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
})

app.use('/admin', adminRoutes); // to replace other routes
app.use(shopRoutes); // to replace the general routes

app.use(errorController.get404Page);

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
Product.belongsToMany(Cart, {through: CartItem});
Product.belongsToMany(Order, {through: OrderItem});
User.hasMany(Product);
User.hasMany(Order);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through: CartItem});
Order.belongsTo(User);
Order.belongsToMany(Product, {through: OrderItem});

// sync the models to the database and create corresponding tables
sequelize
    .sync()
    // .sync({ force: true })
    .then(result => {
        return User.findByPk(1);
        // console.log(result);
    })
    .then(returnedUser => {
        if (!returnedUser) {
            return User.create({ name: 'Kevin', email: 'kevin@test.com' });
        }
        return returnedUser;
    })
    .then(returnedUser => {
        return returnedUser.createCart();
    })
    .then(cart => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });
