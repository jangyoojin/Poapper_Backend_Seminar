const http = require('http');

const server = http.createServer((req, res) => {
    var split_url = req.url.split("/");
    var num1 = split_url[2];
    var num2 = split_url[3];
    console.log(split_url[1], num1, num2);
    if (split_url[1] == 'add') {
        var ans = parseInt(num1) + parseInt(num2);
        console.log(ans);
        res.write(ans.toString());
        res.end();
    }
    else if (split_url[1] == 'sub') {
        var ans = parseInt(num1) - parseInt(num2);
        console.log(ans);
        res.write(ans.toString());
        res.end();
    }
    else if (split_url[1] == 'mul') {
        var ans = parseInt(num1) * parseInt(num2);
        console.log(ans);
        res.write(ans.toString());
        res.end();
    }
    else if (split_url[1] == 'div') {
        var ans = parseInt(num1) / parseInt(num2);
        console.log(ans);
        res.write(ans.toString());
        res.end();
    }
    else if (split_url[1] == 'time') {
        var time = new Date();

        res.write(time.getFullYear() + '-' + time.getMonth() + '-' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds());
        res.end()

    }
}).listen(8080, () => {
    console.log("server is running on 8080 port.");
})