const http = require('http');

let database = {};
let idx = 0;

const server = http.createServer((req, res) => {
    const method = req.method;
    const url_parsed = req.url.split('/');

    console.log(method);
    console.log(url_parsed);

    if (method == 'POST') {
        database[idx] = url_parsed[1];
        idx += 1;
        res.write('POST');
        res.end();
    }
    else if (method == 'GET') {
        if (url_parsed[1] == '') {
            res.write(JSON.stringify(database));
            res.end();
        } else {
            const url_idx = Number(url_parsed[1]);
            res.write(database[url_idx]);
            res.end();
        }
    }
    else if (method == 'PUT') {
        const url_idx = Number(url_parsed[1]);
        const url_data = url_parsed[2];
        database[url_idx] = url_data;
        res.write("put success");
        res.end();
    }
    else if (method == 'DELETE') {
        const url_idx = Number(url_parsed[1]);
        database[url_idx] = undefined;
        res.write("delete success");
        res.end();
    }
});

server.listen(8080, () => {
    console.log('8080');
});