const http = require('http');

let database = {};

const server = http.createServer((req, res) => {
    const url_parsed = req.url.split('/');
    const method = url_parsed[1];

    console.log(url_parsed);
    console.log(database)

    if (method == 'create') {
        database.push(url_parsed[2]);
        res.end();
    } else if (method == 'read') {
        //push 안 한 index를 읽으려고 하면 error 발생
        res.write(database[url_parsed[2]]);
    } else if (method == 'update') {
        //push 안 한 index를 업데이트 하려고 하면 error 발생
        database[url_parsed[2]] = url_parsed[3];
        res.end();
    } else if (method == 'delete') {
        database.pop();
    }
    res.end();
});

server.listen(8080, () => {
    console.log('8080 port');
})