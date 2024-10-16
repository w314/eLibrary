
import http from 'http';
// import router
import router from './router/router.js'

const server = http.createServer((req, res) => {
    // pass requst to router
    router(req, res);
});

// start server
const port = 3000;
server.listen(port);
console.log(`Server is listening on port ${port}`);