const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extende: false}));

// we use get() method here as the same reason as below
app.get('/add-product', (req, res, next) => {
    res.send('<form action = "/product" method = "POST"><input type = "text" name = "title"><button type = "submit">Add Product</button></form>');
    // Cannot call next() here, since it would cause 2 responses in different middlewaresnode
});

// we use post method here to only deal with "POST" requests and not for "GET" requests
// Avoid getting empty body parser if we inaccidentally come to this page without submitting form in advance
app.post('/product', (req, res, next) => {  // parsing the incoming requests from the previous middleware
    console.log(req.body);
    res.redirect('/');
});

// General Route
app.use('/', (req, res, next) => {
    console.log('Here it is.')
    res.send('<h1>Hello from Express.js</h1>')
});

app.listen(3000);
/*
const server = http.createServer((app));

server.listen(3000);
*/