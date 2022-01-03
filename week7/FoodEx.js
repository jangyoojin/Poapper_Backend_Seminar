const http = require('http');
const mysql = require('mysql');
const express = require('express');
require('dotenv').config();

var db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

const app = express();

//localhost:8080/food인 경우 food 테이블의 모든 정보 불러오기
app.get('/food', (req, res) => {
    db.query('SELECT * FROM foods', (err, results) => {
        if (err) throw err;
        res.write(JSON.stringify(results));
        res.end();
    });
});
//비건 음식 정보만 불러오기
app.get('/food/isVegan', (req, res) => {
    db.query(`SELECT * FROM foods WHERE isVegan=1`, (err, results) => {
        if (err) throw err;
        res.write(JSON.stringify(results));
        res.end();
    });
});
//특정 id인 음식 정보를 불러오기
app.get('/food/:id', (req, res) => {
    let id = req.params.id;
    db.query(`SELECT * FROM foods WHERE id=${id}`, (err, results) => {
        if (err) throw err;
        res.write(JSON.stringify(results));
        res.end();
    });
});
//특정 id 음식 정보 삭제
app.delete('/food/:id', (req, res) => {
    let query_id = req.params.id;
    db.query(`DELETE FROM foods WHERE id=${query_id}`, (err, results) => {
        res.end();
    });
});

app.post('/food', (req, res) => {
    const body = req.body;
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
});

app.put('/food', (req, res) => {
    const body = req.body;
    let query_id = req.params.id;
    db.query(`UPDATE foods SET name='${body.name}', kcal='${body.kcal}', isVegan='${body.isVegan}' WHERE id=${query_id}`, (err, results) => {
        if (err) throw err;
        res.end();
    });
})




app.listen(8080);

