const Product = require('../expressModels/productModel');

exports.getIndex = (req, res, next) => {
    Product.findAll()
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
    Product.findAll()
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
/*    
    Product.findAll({where: {id: id}})
        .then(products => {
            res.render('shop/product-detail', {
                product: products[0],
                pageTitle: products[0].title,
                // this is not the router path, but the variable that marks active button
                path: '/products',
            });
        })    
        .catch(err => console.log(err));
*/
    Product.findByPk(id)
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
        .then(cart => {
            return cart.getProducts()
                    .then(products => {
                        res.render('shop/cart', {
                            path: '/cart',
                            pageTitle: 'Your Cart',
                            products: products
                        });
                    })
                    .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
/*
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for (product of products) {
                const cartProductData = cart.products.find(p => p.id === product.id);
                if (cartProductData) {
                    cartProducts.push({productData: product, qty: cartProductData.qty});
                }
            }
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: cartProducts
            });
        });
    });
*/

}

exports.postCart = (req, res, next) => {
    const id = req.body.productID;
    let fetchedCart;
    let updatedQty = 1;
    req.user
        .getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts({where: {id: id}});
        })
        .then(products => {
            let product;
            if (products.length > 0) {
                product = products[0];
            }
            // if product exists in the cart, add quantity
            if (product) {
                const oldQty = product.cartItem.quantity;
                updatedQty = oldQty + 1;
                return product;
            }
            // else, simply return the product
            return Product.findByPk(id);
        })
        .then(product => {
            return fetchedCart.addProduct(product, {
                through: {quantity: updatedQty}
            });
        })
        .then(() => {
            return fetchedCart.setProducts(null);
        })
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
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