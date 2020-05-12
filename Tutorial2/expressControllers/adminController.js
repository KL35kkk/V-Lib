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
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;

    const product = new Product(title, imageUrl, description, price);
    product.save(); // push into the array
    res.redirect('/');
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        // renders to the templating engine
        res.render('admin/products', {
            cart: products, 
            pageTitle: 'All Products', 
            path: '/admin/products',
        });
    });
}