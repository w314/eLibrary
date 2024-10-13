
// load required modules
const dbModule = require('./DBModule');
const http = require('http');
const url = require('url');
const querystring = require('querystring');

const server = http.createServer((req, res) => {

    // retrieve data from url
    // get url
    const reqUrl = req.url;
    console.log(`Request URL: ${reqUrl}`);
    // get path from url
    const reqPath = url.parse(reqUrl).path;
    console.log(`Request path: ${reqPath}`);
    // get querystring from url
    const reqQuery = url.parse(reqUrl).query;
    console.log(`Request querystring: ${reqQuery}`);
    // get data from url
    const username = querystring.parse(reqQuery)['username'];
    const password = querystring.parse(reqQuery)['password'];
    console.log(`Username: ${username}\nPassword: ${password}`);


    // authenticate user
    const userStatus = dbModule.authenticateUser(username, password);

    // write response
    res.writeHead(200, { ContentType: "text/html" });
    res.write(`<html><body<h1>${userStatus}</h1></boyd></html>`);
    res.end();
});

// start server
const port = 3000;
server.listen(port);
console.log(`Server is listening on port ${port}`);