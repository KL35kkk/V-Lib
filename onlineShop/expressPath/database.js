const mysql = require('mysql2');

// create a pool of connections
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'onlineShop-complete',
    password: 'nodecomplete123'
})

module.exports = pool.promise();

