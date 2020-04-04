const http = require('http');
// fs refers to the file system
const fs = require('fs');

const server = http.createServer((req, res) => {
    // console.log(req.url, req.method, req.headers);

    const url = req.url;
    const method = req.method;
    if (url == '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action = "/message" method = "POST"><input type = "text" name = "message"><button type = "submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    
    }

    if (url == '/message' && method == "POST") {
        const body = []; // use as an object stack holder

        // Part 1
        // We use buffer to deal with requested data before sending response

        // on() often being used as EventListener
        req.on('data', (chunk) => {
            console.log(chunk);
            // deal with different chunks separately and push them into the stack
            body.push(chunk);
        });

        req.on('end', () => {
            // concatentate all the chunks to a parsed data
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const message = parsedBody.split('=')[1];

            // fs.writeFileSync('message.txt', message); (Important: we would block the code execution here)
            fs.writeFile('message.txt', message, (error) => { // non-blocking right now
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end;
            });
        });
    }

    // Part 2
    // Also a feature of Asynchronized code
    // Execute before the internal function(listener) of the request
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello from my Node.js server</h1></body>');
    res.write('</html>');

    res.end();
    // process.exit();
});

server.listen(3000);