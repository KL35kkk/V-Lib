const fs = require('fs');
const path = require('path');
const rootDir = require('../expressPath/path');

const Cart = require('../expressModels/cartModel');

const p = path.join(
    rootDir, 
    'expressData', 
    'products.json'
);

const getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        // here we'll finally put the data into cb()
        // and the data we put into cb() will be the 'products'
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    });
}


module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        getProductsFromFile(products => {
            // if we need to edit a product, we will replace the older version with the newer one
            if (this.id) {
                const existingProductIndex = products.findIndex(product => product.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    console.log(err);
                });
            } else {
                // create new id for a new product
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    console.log(err);
                });
            }
        });
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }

    static findById(id, cb) {
        getProductsFromFile(products => {
            // find() returns the element for which this function passed returns true
            const product = products.find(p => p.id === id);
            cb(product);
        });
    }

    static deleteById(id) {
        getProductsFromFile(products => {
            // reverse the logic by maintaining all the products other than the one we delete
            const product = products.find(product => product.id === id);
            const updatedProducts = products.filter(p => p.id !== id);
            fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                // if no err exists, also remove it from the cart
                if (!err) {
                    Cart.deleteProduct(id, product.price);
                }
            })
        });
    }

}