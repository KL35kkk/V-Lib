const Product = require('../expressModels/productModel');
const Cart = require('../expressModels/cartModel');

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
            if (product) {
                const oldQty = product.cartItem.quantity;
                updatedQty = oldQty + 1;
                return product;
            }
            return Product.findByPk(id);
        })
        .then(product => {
            return fetchedCart.addProduct(product, {
                through: {quantity: updatedQty}
            });
        })
        .then(() => {
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