const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    url = req.url;
    method = req.method;

    if (url == '/') {
        res.setHeader('ContentType', 'text/html');
        res.write('<html>');
        res.write('<head><title>Welcome to the basics</title></head>');
        res.write('<body><form action = "/create-user" method = "POST"><input type = "text" name = "message"><button type = "submit">Send</button></form></body>');
        res.write('</html>')
    }

    if (url == '/users') {
        res.setHeader('ContentType', 'text/html');
        res.write('<html>');
        res.write('<head><title>Here are some user examples</title></head>');
        res.write('<ul><li>User1</li><li>User 2</li></ul>');
        res.write('</html>')
    }

    if (url == '/create-user' && method == 'POST') {
        const body = [];

        req.on('data', (input) => {
            body.push(input);
        });

        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            console.log(message);

        });
        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end;
    }

});

server.listen(3000);