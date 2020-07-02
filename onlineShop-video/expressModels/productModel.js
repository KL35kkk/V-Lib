const mongoDb = require('mongodb');
const getDb = require('../expressPath/database').getDb;

class Product {
    constructor(title, price, description, imageUrl, id, userID) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        // better approach to set the mongoDB object ID here to avoid changing type
        // but we need to check if it exists first to avoid err in dataType when saving it
        this._id = id ? new mongoDb.ObjectId(id) : null;
        // we don't need to set dataType here since req.user would give us the ObjectId
        this.userID = userID;
    }

    save() {
        const db = getDb();
        let dbOp;
        if (this._id) {
            // update the product
            dbOp = db.collection('products')
                    // first find the product using _id
                    // then use mongoDB feature $set to reset the product
                    .updateOne({_id: this._id}, {$set: this});
        } else {
            dbOp = db.collection('products')
                    .insertOne(this);
        }
        return dbOp
            .then(result => {
                console.log(result);
            })
            .catch(err => console.log(err));
    }

    static fetchAll() {
        const db = getDb();
        return db.collection('products')
            .find()
            .toArray()
            .then(products => {
                console.log(products);
                return products;
            })
            .catch(err => console.log(err))
    }

    static findByID(productID) {
        const db = getDb();
        return db.collection('products')
            // mongoDB uses special objectId to store different types of data
            .find({_id: new mongoDb.ObjectId(productID)})
            .next()
            .then(product => {
                console.log(product);
                return product;
            })
            .catch(err => console.log(err))
    }

    static deleteById(productID) {
        const db = getDb();
        return db.collection('products')
            .deleteOne({_id: new mongoDb.ObjectId(productID)})
            .then(result => {
                console.log('DELETED!')
            })
            .catch(err => console.log(err))

    }
}

module.exports = Product;