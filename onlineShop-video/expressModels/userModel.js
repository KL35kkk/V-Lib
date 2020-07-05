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
            .findOne({ _id: new mongoDb.ObjectId(userID) })
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
        // use ... to spread over all the products
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
        const updatedCart = {
            items: updatedCartItems,
        };
        const db = getDb();
        return db.collection('users')
            .updateOne(
                { _id: new mongoDb.ObjectId(this._id) },
                { $set: { cart: updatedCart } }
            );
    }

    getCart() {
        const db = getDb();
        // mapping an array of items into an array of just the productID
        const productIDs = this.cart.items.map(i => {
            return i.productID;
        });
        return db
            .collection('products')
            // return all products with one of the IDs mentioned in the array
            .find({ _id: { $in: productIDs } })
            .toArray()
            .then(products => {
                // converting every product into a new form
                return products.map(p => {
                    return {
                        // distribute all the existing properties
                        ...p,
                        // add a new quantity field to denote every product's quantity in cart
                        quantity: this.cart.items.find(i => {
                            return i.productID.toString() === p._id.toString();
                        }).quantity
                    };
                });
            });
    }

    deleteItemFromCart(productID) {
        // return a new filtered array with items
        // we can keep all the items except for the products we're deleting
        const updatedCartItems = this.cart.items.filter(item => {
            return item.productID.toString() !== productID.toString();
        });
        const db = getDb();
        return db.collection('users')
            .updateOne(
                { _id: new mongoDb.ObjectId(this._id) },
                { $set: { cart: { items: updatedCartItems } } }
            );
    }

    addOrder() {
        const db = getDb();
        return this.getCart()
            .then(products => {
                const order = {
                    items: products,
                    user: {
                        _id: new mongoDb.ObjectId(this._id),
                        name: this.name,
                    },
                };
                return db.collection('orders').insertOne(order);
            })
            .then(result => {
                // clear the existing cart
                this.cart = { items: [] };
                return db.collection('users')
                    .updateOne(
                        { _id: new mongoDb.ObjectId(this._id) },
                        { $set: { cart: { items: [] } } }
                    );
            });
    }

    getOrders() {
        const db = getDb();
        return db.collection('orders')
            .find({'user._id': new mongoDb.ObjectId(this._id)})
            .toArray();
    }
}

module.exports = User;