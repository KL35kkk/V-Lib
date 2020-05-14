const Product = require('../expressModels/productModel');
const Cart = require('../expressModels/cartModel');

exports.getIndex = (req, res, next) => {
    // the data will be put into products by applying callback() as parameter to fetchAll()
    Product.fetchAll(products => {
        // renders to the templating engine
        res.render('shop/index', {
            cart: products, 
            pageTitle: 'Welcome!', 
            path: '/',
        });
    });
}

exports.getProducts = (req, res, next) => {
    // the data will be put into products by applying callback() as parameter to fetchAll()
    Product.fetchAll(products => {
        // renders to the templating engine
        res.render('shop/product-list', {
            cart: products, 
            pageTitle: 'Shop', 
            path: '/products',
        });
    });
}

exports.getProduct = (req, res, next) => {
    // use params method to get the productID we put in the router
    const id = req.params.productID;
    Product.findById(id, product => {
        res.render('shop/product-detail', {
            product: product,
            pageTitle: product.title,
            // this is not the router path, but the variable that marks active button
            path: '/products',

        });
    });
}

exports.getCart = (req, res, next) => {
    // the data will be put into products by applying callback() as parameter to fetchAll()
    res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart'
    })
}

exports.postCart = (req, res, next) => {
    const ID = req.body.productID;
    Product.findById(ID, product => {
        Cart.addProducts(ID, product.price);
    });
    res.redirect('/cart');
}

exports.getOrders = (req, res, next) => {
    // the data will be put into products by applying callback() as parameter to fetchAll()
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders'
    })
}

exports.getCheckout = (req, res, next) => {
    // the data will be put into products by applying callback() as parameter to fetchAll()
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    })
}