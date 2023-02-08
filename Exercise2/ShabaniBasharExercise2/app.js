const http = require('http');
const fs = require('fs');
const viewsPath = './views/';

http.createServer((req, res) => {
    const url = req.url.toLowerCase();
    const fileName = url === '/about' ? 'about.html' : url === '/contact' ? 'contact.html' : '404.html';
    const filePath = viewsPath + fileName;

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500);
            res.end('Error');
            return;
        }

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
    });
}).listen(8080, 'localhost', () => {
    console.log('Server is listening on http://localhost:8080');
});
