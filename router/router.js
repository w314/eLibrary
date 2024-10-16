import url from 'url';
// import handlers
import loginHandler from './handlers/loginHandler.js';
import homePageHandler from './handlers/homePageHandler.js';
import booksHandler from './handlers/booksHandler.js';
import imageHandler from './handlers/imageHandler.js';

const router = (req, res) => {

    const reqUrl = url.parse(req.url);
    const path = reqUrl.path;
    console.log(path);

    switch(path) {
        case `/home`:
            homePageHandler(req, res);
            break;
        case `/login`:
            loginHandler(req, res);
            break;
        // used when looking for book details
        // in the books.json file
        case `/books`:
            booksHandler(req, res);
            break;
        // serving images
        case `/node1.jpg`:
        case `/node2.jpg`:
        case `/node3.jpg`:
            imageHandler(req, res);
            break;
        default:
            homePageHandler(req, res);
    }
}

export default router;