const Product = require('../expressModels/productModel');

exports.getAddProductPage = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product', 
        path: '/admin/add-product',
        editing: false,
    });
};

exports.postAddProductPage = (req, res, next) => {  // parsing the incoming requests from the previous middleware
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    req.user
        .createProduct({
            title: title,
            price: price,
            imageUrl: imageUrl,
            description: description,
            userID: req.user.id
        })
        .then(result => {
            // console.log(result);
            console.log('CREATE PRODUCT!');
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        });

};

exports.getEditProductPage = (req, res, next) => {
    // we use query here to distinguish add-product/edit-product
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/admin/products');
    }
    const productID = req.params.productID;
    // Product.findByPk(productID)
    req.user.getProducts({where: {id: productID}})
        .then(products => {
            const product = products[0];
            if (!product) {
                return res.redirect('/admin/products');
            }
            res.render('admin/edit-product', {
                pageTitle: 'Edit Product', 
                path: '/admin/edit-product',
                editing: editMode,
                product: product
            });
        })
        .catch(err => console.log(err));

};

exports.postEditProductPage = (req, res, next) => {
    const productID = req.body.productID;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDescription = req.body.description;
    const updatedPrice = req.body.price;

    Product.findByPk(productID)
        .then(product => {
            product.title = updatedTitle;
            product.imageUrl = updatedImageUrl;
            product.description = updatedDescription;
            product.price = updatedPrice;
            return product.save();
        })
        // handles responses from the product.save() promise
        .then(result => {
            console.log('UPDATED PRODUCT!');
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
}

exports.postDeleteProductPage = (req, res, next) => {
    const productID = req.body.productID;
    Product.findByPk(productID)
        .then(product => {
            return product.destroy();
        })
        .then(result => {
            console.log('DESTROYED PRODUCT!');
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));

}

exports.getProducts = (req, res, next) => {
    req.user.getProducts()
        .then(products => {
            // renders to the templating engine
            res.render('admin/products', {
                cart: products, 
                pageTitle: 'All Products', 
                path: '/admin/products',
            });
        })
        .catch(err => console.log(err));
}