import { readFile } from 'node:fs/promises';

const booksHandler = async (req, res) => {

    const booksFilePath = './books.json';
    try {
        // read JSON from file
        const books = await readFile(booksFilePath, { "encode": "utf-8" });
        // make sure to add {"Content-Type": "application/json"}
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(books);
        res.end();
    } catch (err) {
        console.log(err);
    }

}

export default booksHandler;