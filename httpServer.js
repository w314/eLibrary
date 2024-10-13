
// load required modules
const dbModule = require('./DBModule');
const http = require('http');

const server = http.createServer((req, res) => {

    // authenticate user
    const userStatus = dbModule.authenticateUser('admin', 'admin');

    // write response
    res.writeHead(200, { ContentType: "text/html" });
    res.write(`<html><body<h1>${userStatus}</h1></boyd></html>`);
    res.end();
});

// start server
const port = 3000;
server.listen(port);
console.log(`Server is listening on port ${port}`);