"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var database_1 = require("../controllers/DB/database");
var ReplyModel = /** @class */ (function () {
    function ReplyModel() {
    }
    // 新增回复
    ReplyModel.addOne = function (postId, userId, content) {
        return __awaiter(this, void 0, void 0, function () {
            var addTime, sql, row;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        addTime = new Date().getTime();
                        sql = "INSERT INTO reply \n        (user_id, post_id, content, add_time) \n        VALUES (?, ?, ?, ?)";
                        return [4 /*yield*/, database_1["default"](sql, [
                                userId,
                                postId,
                                content,
                                addTime
                            ])["catch"](function (err) {
                                console.log(err);
                            })];
                    case 1:
                        row = _a.sent();
                        console.log(row);
                        return [2 /*return*/, row];
                }
            });
        });
    };
    // 获取回复详情
    ReplyModel.getDetails = function (replyId) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, row;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "SELECT * FROM reply WHERE ID = ?";
                        return [4 /*yield*/, database_1["default"](sql, [
                                replyId
                            ])["catch"](function (err) {
                                console.log(err);
                            })];
                    case 1:
                        row = _a.sent();
                        return [2 /*return*/, row];
                }
            });
        });
    };
    // 删除回复
    ReplyModel.deleteOne = function (replyId) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, row;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "DELETE FROM reply WHERE ID = ?";
                        return [4 /*yield*/, database_1["default"](sql, [
                                replyId
                            ])["catch"](function (err) {
                                console.log(err);
                            })];
                    case 1:
                        row = _a.sent();
                        return [2 /*return*/, row];
                }
            });
        });
    };
    // 删除某贴的全部回复
    ReplyModel.deleteAll = function (postId) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, row;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "DELETE FROM reply WHERE post_id = ?";
                        return [4 /*yield*/, database_1["default"](sql, [
                                postId
                            ])["catch"](function (err) {
                                console.log(err);
                            })];
                    case 1:
                        row = _a.sent();
                        return [2 /*return*/, row];
                }
            });
        });
    };
    // 获取回复列表
    ReplyModel.getList = function (postId, start, end) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, row, sql2, row2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "SELECT A.*, B.nickname AS user_nickname, B.head_thumb AS user_head_thumb\n        FROM reply AS A\n        LEFT JOIN user AS B ON B.ID = A.user_id\n        WHERE post_id = ?\n        limit ?, ?\n        ";
                        return [4 /*yield*/, database_1["default"](sql, [
                                postId,
                                start,
                                end
                            ])["catch"](function (err) {
                                console.log(err);
                            })];
                    case 1:
                        row = _a.sent();
                        sql2 = "SELECT ID FROM reply WHERE post_id = ?";
                        return [4 /*yield*/, database_1["default"](sql2, [
                                postId
                            ])["catch"](function (err) {
                                console.log(err);
                            })];
                    case 2:
                        row2 = _a.sent();
                        return [2 /*return*/, {
                                need: row,
                                all: row2
                            }];
                }
            });
        });
    };
    return ReplyModel;
}());
exports["default"] = ReplyModel;
