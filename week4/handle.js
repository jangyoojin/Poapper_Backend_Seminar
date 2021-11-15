const http = require('http');

let database = [];

const server = http.createServer((req, res) => {
    const url_parsed = req.url.split('/');
    const method = url_parsed[1];

    console.log(url_parsed);
    console.log(database);

    if (method == 'create') {
        database.push(url_parsed[2]);
        res.end();
    } else if (method == 'read') {
        console.log(database.length)
        if (url_parsed[2] >= 0 && url_parsed[2] < database.length)
            res.write(database[url_parsed[2]]);
        else {
            console.log("wrong index");
            res.write('wrong index');
        }
    } else if (method == 'update') {
        if (url_parsed[2] >= 0 && url_parsed[2] < database.length)
            database[url_parsed[2]] = url_parsed[3];
        else {
            console.log("wrong index");
            res.write('wrong index');
        }
        res.end();
    } else if (method == 'delete') {
        database.pop();
    }
    res.end();
});

server.listen(8080, () => {
    console.log('8080 port');
})