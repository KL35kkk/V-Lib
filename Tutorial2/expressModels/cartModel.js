const fs = require('fs');
const path = require('path');
const rootDir = require('../expressPath/path');

const p = path.join(
    rootDir, 
    'expressData', 
    'products.json'
);

module.exports = class Cart {
    static addProducts(id, productPrice) {
        // fetch the previous cart
        fs.readFile(p, (err, fileContent) => {
            let cart = {products: [], totalPrice: 0};
            // Analyze the cart => find the existing product
            if (!err) {
                cart = JSON.parse(fileContent);
            }
            // add new product => increase quantity/add brand new one
            const existingProductsIndex = cart.products.findIndex(product => product.id === id);
            const existingProducts = cart[existingProductsIndex];
            let updatedProduct;
            if(existingProducts) {
                // if existed, +1
                updatedProduct = { ...existingProducts};
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductsIndex] = updatedProduct;
            } else {
                // if doesn't exist, create new product
                updatedProduct = {id: id, qty: 1};
            }
            // convert productPrice from string to number
            cart.totalPrice = cart.totalPrice + +productPrice;
            cart.products = [...cart.products];
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            })
        });

    }
}