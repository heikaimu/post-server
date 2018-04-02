"use strict";
exports.__esModule = true;
var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var cookieSession = require("cookie-session");
var path = require("path");
var routes_1 = require("./routes");
var app = express();
// 获取请求(get自带，主要是post和文件)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// cookie-session
app.use(cookieParser());
(function () {
    var keys = [];
    for (var i = 0; i < 1000; i++) {
        keys[i] = 'lyw' + Math.random();
    }
    app.use(cookieSession({
        name: 'sess_id',
        keys: keys,
        maxAge: 60 * 3600 * 10000000000
    }));
})();
//使用static中间件 制定views目录为静态资源目录,其中资源不会经过任何处理
app.use(express.static('views'));
var indexPath = path.resolve(__dirname, '../views/index.html');
app.get('/index', function (req, res) {
    res.sendFile(indexPath);
});
// 路由
routes_1.route(app);
// 静态测试
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.listen(5000, 'localhost', function () {
    console.log("express\u670D\u52A1\u5DF2\u7ECF\u542F\u52A8:localhost:5000");
});
