import { readFile } from 'node:fs/promises';
import  qs from 'node:querystring';
import { authenticateUser } from '../../DBModule.js';

const loginHandler = (req, res) => {

    // retrieve data from request
    let data = '';
    req.on('data', (chunk) => data += chunk);

    // handle request when all request data is retrieved
    req.on('end', async () => {

        // get data from request body
        const reqData = qs.parse(data);
        console.log(reqData);
        const username = reqData['username'];
        const password = reqData['password'];
        console.log(`Username: ${username}\nPassword: ${password}`);

        // authenticate user
        const userStatus = authenticateUser(username, password)
    
        // variable to hold page content
        let content;
    
        // set page content
        if(userStatus === 'Valid User') {
            // get book details html
            const bookDetailsHtmlPath = './html/bookDetails.html'
            content = await readFile(bookDetailsHtmlPath, { encode: 'utf-8' });
            // content = 'Valid User';
        } else {
            content = 'Invalid User'
        }
    
        // send response
        res.writeHead(200, { ContentType: 'text/html' });
        res.write(content);
        res.end();
    })    
}

export default loginHandler;

