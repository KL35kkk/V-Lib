const fs = require('fs');
const path = require('path');
const rootDir = require('../expressPath/path');

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
    constructor(title, imageUrl, description, price) {
        this.id = Math.random().toString();
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
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

}