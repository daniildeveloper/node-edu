var http = require('http');
http.createServer(function (req, res) {
    var path = req.url.replace(/\/?(?:\?.*)?$/, '') / toLowerCae;

    switch (path) {
        case '':
            res.writeHead(200, { 'content-type': 'text-plain' });
            res.end('Hello, world');
            break;
        case '/about':
            

    }


}).listen(3000);

console.log("Сервер запущен");