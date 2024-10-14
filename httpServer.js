
// load required modules
const dbModule = require('./DBModule');
const http = require('http');
const querystring = require('querystring');
// load custom event handler module
const eventModule = require('./EventHandlerModule');

const server = http.createServer((req, res) => {

    // RETRIEVE DATA FROM REQUEST BODY

    // create variable to store incoming data chunks
    let data = '';
    req.on('data', (chunk) => data += chunk);
    req.on('end', () => {

        // parse received request data with querystring
        const reqData = querystring.parse(data);
        // get username and password from parsed request data
        const username = reqData['username'];
        const password = reqData['password'];
        console.log(`Username: ${username}\nPassword: ${password}`);
         
        // authenticate user
        const userStatus = dbModule.authenticateUser(username, password);
        // get visitor count
        const visitorCount = eventModule.visitorCountEvent();
        
        // write response
        res.writeHead(200, { ContentType: "text/html" });
        // stops browsers creating requests for favicon 
        // and therefore adding additional visitor counts
        res.write(`<html><head><link rel="icon" href="data:,"></head>`);
        res.write(`<body><h1>${userStatus}</h1>`);
        res.write(`<p>The number of visitors whe visited the site: ${visitorCount}</p>`);
        res.write(`</body></html>`);
        res.end();
    })


});

// start server
const port = 3000;
server.listen(port);
console.log(`Server is listening on port ${port}`);