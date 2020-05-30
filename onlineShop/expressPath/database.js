const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'onlineShop-complete', 
    'root', 
    'nodecomplete123', 
    {dialect: 'mysql', host: 'localhost'}
);
// create a pool of connections
module.exports = sequelize;

