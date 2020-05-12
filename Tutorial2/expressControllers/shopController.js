const Product = require('../expressModels/productModel');

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

exports.getCart = (req, res, next) => {
    // the data will be put into products by applying callback() as parameter to fetchAll()
    res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart'
    })
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