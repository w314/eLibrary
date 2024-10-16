import url from 'url';
import { readFile } from 'node:fs/promises'

const imageHandler = async (req, res) => {

    // get request path
    const reqUrl = url.parse(req.url);
    const path = reqUrl.path;

    // read image from file
    const filePath = `./books/images${path}`
    const img = await readFile(filePath);

    // write response
    res.writeHead(200, { "Content-Type": "image/jpg" });
    res.write(img);
    res.end();
}

export default imageHandler;