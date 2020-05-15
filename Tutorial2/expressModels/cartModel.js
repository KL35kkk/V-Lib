const fs = require('fs');
const path = require('path');
const rootDir = require('../expressPath/path');

const p = path.join(
    rootDir, 
    'expressData', 
    'cart.json'
);

module.exports = class Cart {
    // Since we don't create cart that often, we mostly need to interact with the database
    // we can just use static methods in the Cart Model

    static addProducts(id, productPrice) {
        // fetch the previous cart
        fs.readFile(p, (err, fileContent) => {
            let cart = {products: [], totalPrice: 0};
            // Analyze the cart => find the existing product
            if (!err) {
                cart = JSON.parse(fileContent);
            }
            // add new product => increase quantity/add brand new one
            const existingProductsIndex = cart.products.findIndex(
                product => product.id === id    
            );
            const existingProducts = cart.products[existingProductsIndex];
            let updatedProduct;
            if (existingProducts) {
                // if existed, +1
                updatedProduct = { ...existingProducts };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductsIndex] = updatedProduct;
            } else {
                // if doesn't exist, create new product
                updatedProduct = {id: id, qty: 1};
                cart.products = [...cart.products, updatedProduct];

            }
            // convert productPrice from string to number
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            })
        });

    }

    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                return;
            }
            const updatedCart = { ...JSON.parse(fileContent) };
            const product = updatedCart.products.find(product => product.id === id);
            if (!product) {
                return;
            }
            const productQty = product.qty;


            
            updatedCart.products = updatedCart.products.filter(
                product => product.id !== id
            );
            updatedCart.totalPrice = 
                updatedCart.totalPrice - (productPrice * productQty);

            fs.writeFile(p, JSON.stringify(updatedCart), err => {
                console.log(err);
            })
        })
    }

    static getCart(cb) {
        fs.readFile(p, (err, fileContent) => {
            const cart = JSON.parse(fileContent);
            if (err) {
                cb(null);
            } else {
                cb(cart);
            }

        })
    }
}