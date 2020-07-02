const Product = require('../expressModels/productModel');

exports.getIndex = (req, res, next) => {
    Product.fetchAll()
        .then(products => {
            res.render('shop/index', {
                cart: products, 
                pageTitle: 'Welcome!', 
                path: '/',
            });
        }).catch(err => {
            console.log(err);
        });
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(products => {
            res.render('shop/product-list', {
                cart: products, 
                pageTitle: 'Shop', 
                path: '/products',
            });
        }).catch(err => {
            console.log(err);
        });
}

exports.getProduct = (req, res, next) => {
    // use params method to get the productID we put in the router
    const id = req.params.productID;
    Product.findByID(id)
        // the product returned is still an array, so we'll pass product[0] to the view
        .then((product) => {
            res.render('shop/product-detail', {
                product: product,
                pageTitle: product.title,
                // this is not the router path, but the variable that marks active button
                path: '/products',
            });
        })
        .catch(err => console.log(err));

}

exports.getCart = (req, res, next) => {
    req.user
        .getCart()
        .then(products => {
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: products
            });
        })
        .catch(err => console.log(err));

}

exports.postCart = (req, res, next) => {
    const id = req.body.productID;
    Product.findByID(id)
            .then(product => {
                return req.user.addToCart(product);
            })
            .then(result => {
                console.log(result);
                res.redirect('/cart');
            })
            .catch(err => console.log(err));


    // let fetchedCart;
    // let updatedQty = 1;
    // req.user
    //     .getCart()
    //     .then(cart => {
    //         fetchedCart = cart;
    //         return cart.getProducts({where: {id: id}});
    //     })
    //     .then(products => {
    //         let product;
    //         if (products.length > 0) {
    //             product = products[0];
    //         }
    //         // if we can find the product through {id: id}, add quantity
    //         if (product) {
    //             const oldQty = product.cartItem.quantity;
    //             updatedQty = oldQty + 1;
    //             return product;
    //         }
    //         // else, simply return the product
    //         return Product.findByPk(id);
    //     })
    //     .then(product => {
    //         return fetchedCart.addProduct(product, {
    //             through: {quantity: updatedQty}
    //         });
    //     })
    //     .then(() => {
    //         return fetchedCart.setProducts(null);
    //     })
    //     .then(result => {
    //         res.redirect('/cart');
    //     })
    //     .catch(err => console.log(err));
}

exports.postCartDelete = (req, res, next) => {
    const id = req.body.productID;
    req.user.getCart()
        .then(cart => {
            return cart.getProducts({where: {id: id}});
        })
        .then(products => {
            const product = products[0];
            return product.cartItem.destroy();
        })
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
}

exports.getOrders = (req, res, next) => {
    // applying eager loading to include product's' from the productModel
    req.user.getOrders({include: ['products']})
        .then(orders => {
            res.render('shop/orders', {
                path: '/orders',
                pageTitle: 'Your Orders',
                orders: orders
            })
        })
        .catch(err => {console.log(err)});

}

exports.postOrders = (req, res, next) => {
    let fetchedCart;
    req.user.getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts();
        })
        .then(products => {
            // create a new order based on the current cart content
            return req.user
                        .createOrder()
                        .then(order => {
                            // using method add~() created by sequelize for products
                            return order.addProducts(products.map(product => {
                                product.orderItem = {quantity: product.cartItem.quantity};
                                return product;
                            }));
                        });
        })
        .then(result => {
            res.redirect('/orders');
        })
        .catch(err => console.log(err));
}

exports.getCheckout = (req, res, next) => {
    // the data will be put into products by applying callback() as parameter to fetchAll()
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    })
}