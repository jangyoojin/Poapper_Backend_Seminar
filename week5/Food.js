const http = require('http');
const mysql = require('mysql');
require('dotenv').config();

var db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

const server = http.createServer((req, res) => {
    const method = req.method;

    //localhost:8080/food(/int)의 형태로만 url이 발생한다고 가정
    if (method == 'GET') {
        const query_id = req.url.split('/')[2];
        if (query_id == '') {
            db.query('SELECT * FROM foods', (err, results) => {
                if (err) throw err;
                res.write(JSON.stringify(results));
                res.end();
            });
        } else if (query_id == 'isVegan') {
            db.query(`SELECT * FROM foods WHERE isVegan=1`, (err, results) => {
                if (err) throw err;
                res.write(JSON.stringify(results));
                res.end();
            });
        } else {
            db.query(`SELECT * FROM foods WHERE id=${query_id}`, (err, results) => {
                if (err) throw err;
                res.write(JSON.stringify(results));
                res.end();
            });
        }
    } else if (method == 'DELETE') {
        const query_id = req.url.split('/')[2];
        db.query(`DELETE FROM foods WHERE id=${query_id}`, (err, results) => {
            res.end();
        })
    }

    req.on('data', data => {
        const body = JSON.parse(data);
        console.log(body);

        if (method == 'POST') {
            if (body.hasOwnProperty('isVegan')) {
                db.query(`INSERT INTO foods (name, kcal, isVegan) VALUES ('${body.name}', '${body.kcal}','${body.isVegan}')`, (err, results) => {
                    if (err) throw err;
                    res.end();
                });
            } else {
                db.query(`INSERT INTO foods (name, kcal) VALUES ('${body.name}', '${body.kcal}')`, (err, results) => {
                    if (err) throw err;
                    res.end();
                });
            }
        } else if (method == 'PUT') {
            const query_id = req.url.split('/')[2];
            db.query(`UPDATE foods SET name='${body.name}', kcal='${body.kcal}', isVegan='${body.isVegan}' WHERE id=${query_id}`, (err, results) => {
                if (err) throw err;
                res.end();
            });
        }
    })
})

server.listen(8080);

