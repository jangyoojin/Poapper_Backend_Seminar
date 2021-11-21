const http = require('http');
const date = require('date-utils');

d = new Date();

http.createServer((req, res) => {
    res.write(d.toFormat('YYYY-MM-DD HH24:MI:SS'));
    res.end();
}).listen(8080);