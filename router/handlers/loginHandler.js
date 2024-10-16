import { readFile, appendFile } from 'node:fs/promises';
import  qs from 'node:querystring';
import { authenticateUser } from '../../DBModule.js';



const loginHandler = (req, res) => {
    
    const logFile = './log.txt';
    const bookDetailsHtmlPath = './html/bookDetails.html'
    
    // retrieve data from request
    let data = '';
    req.on('data', (chunk) => data += chunk);

    // handle request when all request data is retrieved
    req.on('end', async () => {

        // get data from request body
        const reqData = qs.parse(data);
        const username = reqData['username'];
        const password = reqData['password'];
        console.log(`Username: ${username}\nPassword: ${password}`);

        // authenticate user
        const userStatus = authenticateUser(username, password) 
        // variable to hold page content
        let content;
    
        // set page content
        if(userStatus === 'Valid User') {
            // log user login
            appendFile(logFile, `User ${username} logged in at ${new Date()}\n`);
            // get book details html         
            content = await readFile(bookDetailsHtmlPath, { encode: 'utf-8' });
        } else {
            content = `
                <html><body><h2>Invalid User Credentials</h2>
                <button><a href="./home">Try Logging In Again</a></button>
                </body></html>
            `
        }
    
        // send response
        res.writeHead(200, { ContentType: 'text/html' });
        res.write(content);
        res.end();
    })    
}

export default loginHandler;

