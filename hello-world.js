var http = require('http'),
    fs = require('fs');
/**
 * function get file
 */
function serveStaticFile(res, path, contentType, responseCode) {
    if (!responseCode) {
        responseCode = 200;
    }
    fs.readFile(__dirname + path, function (err, data) {
        if (err) {
            res.writeHead(500, { 'content-type': 'text/plain' });
            res.end('500 - Internal error');
        } else {
            res.writeHead(responseCode, { 'content-type': contentType });
            res.end(data);
        }
    });
}

http.createServer(function (req, res) {
    var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();

    switch (path) {
        case '':
            serveStaticFile(res, '/public/html/home.html', 'text/html');
            break;
        case '/about':
            serveStaticFile(res, '/public/html/about.html', 'text/html');
            break;
        default:
            serveStaticFile(res, '/public/html/home.html', 'text/html');
            break;
    }


}).listen(3000);

console.log("Сервер запущен");