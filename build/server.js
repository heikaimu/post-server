"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const path = require("path");
const routes_1 = require("./routes");
const app = express();
// 获取请求(get自带，主要是post和文件)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// cookie-session
app.use(cookieParser());
(function () {
    var keys = [];
    for (let i = 0; i < 1000; i++) {
        keys[i] = 'lyw' + Math.random();
    }
    app.use(cookieSession({
        name: 'sess_id',
        keys: keys,
        maxAge: 60 * 3600 * 10000000000
    }));
})();
//使用static中间件 制定views目录为静态资源目录,其中资源不会经过任何处理
app.use(express.static(path.join(__dirname, "../views")));
// 跨域
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    next();
});
// 路由
routes_1.route(app);
// 静态测试
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.listen(5000, () => {
    console.log(`express服务已经启动:localhost:5000`);
});
