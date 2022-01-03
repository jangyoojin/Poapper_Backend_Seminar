const http = require('http');
const mysql = require('mysql');
const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const cookieConfig = { httpOnly: true, maxAge: 10000, signed: true };

//수정 필요
const _id = 'poapper';
const _password = '1986'

var db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

//root page에 회원가입 창
app.get('/register', (req, res) => {
    res.sendFile(__dirname + "/index.html");
})
app.get('/login', (req, res) => {
    res.sendFile(__dirname + "/login.html");
})
app.get('/', (req, res) => {

    res.sendFile(__dirname + "/afterLogin.html");
})

//회원 가입
app.post('/register', (req, res) => {
    const body = req.body;
    console.log(body);
    const query_id = body.id;
    const query_pw = body.password;

    db.query(`INSERT INTO user (login_id, login_pw) VALUES ('${query_id}', '${query_pw}')`, (err, results) => {
        if (err) throw err;
        res.end();
    });
    res.redirect(301, "/login");
})

//회원탈퇴
app.delete('/', (req, res) => {
    let query_id = req.cookies.id;
    db.query(`DELETE FROM foods WHERE id=${query_id}`, (err, results) => {
        res.end();
    });
})

//----------------------------------------login 구현----------------------------------//
app.post('/login', (req, res) => {
    const body = req.body;
    const query_id = body.id;
    const query_pw = body.password

    // 입력한 id와 pw가 동일해서 쿠키 발급
    if (query_id == _id && query_pw == _password) {
        console.log("Login success")
        res.cookie('id', _id, cookieConfig);
        res.cookie('password', _password, cookieConfig);
    } else {
        console.log("Login failed...")
    }
    res.redirect(301, "/food");
})



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
    const cookie_id = req.cookies.id;
    const cookie_pw = req.cookies.password;

    if (cookie_id == _id && cookie_pw == _password) {
        let query_id = req.params.id;
        db.query(`DELETE FROM foods WHERE id=${query_id}`, (err, results) => {
            res.end();
        });
    }
});

app.post('/food', (req, res) => {
    const cookie_id = req.cookies.id;
    const cookie_pw = req.cookies.password;

    if (cookie_id == _id && cookie_pw == _password) {
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
    }
});

app.put('/food', (req, res) => {
    const cookie_id = req.cookies.id;
    const cookie_pw = req.cookies.password;

    if (cookie_id == _id && cookie_pw == _password) {
        const body = req.body;
        let query_id = req.params.id;
        db.query(`UPDATE foods SET name='${body.name}', kcal='${body.kcal}', isVegan='${body.isVegan}' WHERE id=${query_id}`, (err, results) => {
            if (err) throw err;
            res.end();
        });
    }
})



app.listen(8080);

