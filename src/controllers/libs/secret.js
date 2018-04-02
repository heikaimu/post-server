"use strict";
exports.__esModule = true;
// 加密模块
var crypto = require("crypto");
exports.md5 = function (str) {
    var md5sum = crypto.createHash('md5');
    md5sum.update(str);
    str = md5sum.digest('hex');
    return str;
};
