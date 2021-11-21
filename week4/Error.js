const http = require('http');

let database = [];

const server = http.createServer((req, res) => {
    const url_parsed = req.url.split('/');
    const method = url_parsed[1];

    if (method == 'create') {
        //create할 data를 적지 않으면 url_parsed[2]를 읽어올 때 오류가 발생
        database.push(url_parsed[2]);
        res.end();
    }
    else if (method == 'read') {
        //url_parsed[2]가 입력되지 않으면 오류 발생
        //database에 url_idx에 해당하는 데이터가 없으면 오류 발생
        const url_idx = Number(url_parsed[2]);
        res.write(database[url_idx]);
    }
}).listen(8080);