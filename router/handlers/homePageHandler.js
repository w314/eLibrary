import { readFile } from 'node:fs/promises';

// path from root directory of project
const homeHtmlPath = './html/home.html';

const homePageHandler = async (req, res) => {
    try {
        const html = await readFile(homeHtmlPath, { encode: 'utf-8' });
        res.writeHead(200, { ContentType: 'text/html' });
        res.write(html);
        res.end();
    } catch (err) {
        console.log(err);
        res.writeHead(500);
        res.write('Error displaying page.')
        res.end();
    }
}


export default homePageHandler;