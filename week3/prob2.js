const http = require('http');

const server = http.createServer((req, res) => {
    const cal = req.url.split('/');
    const oper = String(cal[1]);
    const num1 = Number(cal[2]);
    const num2 = Number(cal[3]);

    if (oper == 'add') {
        res.write(String(num1 + num2));
    } else if (oper == 'sub') {
        res.write(String(num1 - num2));
    } else if (oper == 'mul') {
        res.write(String(num1 * num2));
    } else if (oper == 'div') {
        res.write(String(num1 / num2));
    }
    res.end();
})

server.listen(8080);