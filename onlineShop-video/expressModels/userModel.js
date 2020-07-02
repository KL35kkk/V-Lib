const mongoDb = require('mongodb');
const getDb = require('../expressPath/database').getDb;


class User {
    constructor(name, email, cart, id) {
        this.name = name;
        this.email = email;
        this.cart = cart;
        this._id = id;
    }

    save() {
        const db = getDb();
        return db.collection('users')
                .insertOne(this)
                .then(result => {
                    console.log('USER CREATED!');
                })
                .catch(err => console.log(err));

    }

    static findById(userID) {
        const db = getDb();
        return db.collection('users')
                .findOne({_id: new mongoDb.ObjectId(userID)})
                .then(user => {
                    console.log(user);
                    return user;
                })
                .catch(err => console.log(err));

    }

    addToCart(product) {
        const cartProductIndex = this.cart.items.findIndex(cp => {
            // we have to convert the retrieved ObjectId to a string for comparison
            return cp.productID.toString() === product._id.toString();
        });
        let newQuantity = 1;
        const updatedCartItems = [...this.cart.items];

        if (cartProductIndex >= 0) {
            newQuantity = this.cart.items[cartProductIndex].quantity + 1;
            updatedCartItems[cartProductIndex].quantity = newQuantity;
        } else {
            updatedCartItems.push({
                productID: new mongoDb.ObjectId(product._id), 
                quantity: newQuantity
            });
        }
        // use ... to spread over all the products
        const updatedCart = {
            items: updatedCartItems,
        };
        const db = getDb();
        return db.collection('users')
                .updateOne({_id: new mongoDb.ObjectId(this._id)}, {$set: {cart: updatedCart}});
    }

    getCart() {
        const db = getDb();
        const productIDs = this.cart.items.map(i => {
            return i.productID;
        });
        return db
                .collection('products')
                .find({ _id: { $in: productIDs } })
                .toArray()
                .then(products => {
                    return products.map(p => {
                        return {
                            ...p,
                            quantity: this.cart.items.find(i => {
                                return i.productID.toString() === p._id.toString();
                            }).quantity
                        };
                    });
                });
    }
}

module.exports = User;