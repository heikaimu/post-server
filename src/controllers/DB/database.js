"use strict";
exports.__esModule = true;
var mysql = require("mysql");
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'post_bar'
});
exports["default"] = (function (sql, values) {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
            }
            else {
                connection.query(sql, values, function (err, rows) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(rows);
                    }
                    connection.release();
                });
            }
        });
    });
});
