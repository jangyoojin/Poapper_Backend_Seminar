const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if (req.url == '/') {
        res.end()
    }
    else if (req.url == '/timer') {
        require('date-utils');
        let time = new Date();
        let d = time.toFormat('YYYY-MM-DD HH24:MI:SS');

        res.write(d);
        res.end()

    }


}).listen(8080, () => {
    console.log("server is running on 8080 port.");
})