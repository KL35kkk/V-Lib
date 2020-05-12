const Product = require('../expressModels/productModel');

exports.getAddProductPage = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product', 
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
};

exports.postAddProductPage = (req, res, next) => {  // parsing the incoming requests from the previous middleware
    const product = new Product(req.body.title);
    product.save(); // push into the array
    console.log(req.body);
    res.redirect('/');
};

exports.getProducts = (req, res, next) => {
    // the data will be put into products by applying callback() as parameter to fetchAll()
    Product.fetchAll(products => {
        res.render('shop/product-list', {
            cart: products, 
            pageTitle: 'Shop', 
            path: '/',
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
        });
    });
    // renders to the templating engine
}