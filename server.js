"use strict"

const http = require('http'),
      url = require('url'),
      fs = require('fs'),
      mime = require('mime-types');

const hostname = '127.0.0.1';
const port = 9999;

const server = http.createServer((req, res) => {
    const q = url.parse(req.url, true);
    let status = 200;
    let file = q.pathname.substr(1);
    let mimeType = mime.lookup(file);

    if(q.pathname === "/"){
        file = "index.html";
        mimeType = "text/html; charset=utf-8";
    }

    // if(q.pathname != "/" && q.pathname.endsWith(".html") ){
    //     status = 404;
    //     file = "404.html";
    // }

    fs.readFile(file, function(err, data) {
        if (err || !mimeType) {
             res.writeHead(500, {'Content-Type': 'text/html'});
            return res.end("500 Server Error");
        }  
        res.writeHead(status, {'Content-Type': mimeType});
        res.write(data);
        return res.end();
      });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});