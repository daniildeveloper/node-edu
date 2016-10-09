var http = require('http');
http.createServer(function (req, res) {
    var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();

    switch (path) {
        case '':
            res.writeHead(200, { 'content-type': 'text/plain' });
            res.end('Homepage');
            break;
        case '/about':
            res.writeHead(200, { 'content-type': 'text/plain' });
            res.end('about');
            break;
        default:
            res.writeHead(404, { 'content-type': 'text-plain' });
            res.end('Not found! Ohhh!');
            break;
    }


}).listen(3000);

console.log("Сервер запущен");