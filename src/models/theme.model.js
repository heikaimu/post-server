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
var date_1 = require("../controllers/libs/date");
var ThemeModel = /** @class */ (function () {
    function ThemeModel() {
    }
    // 新增主题
    ThemeModel.addOne = function (themeIfo) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, row;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "INSERT INTO theme\n \t(name, head_thumb, creator_id, administrator, add_time)\n \tVALUES (?, ?, ?, ?, ?)";
                        return [4 /*yield*/, database_1["default"](sql, [
                                themeIfo.name,
                                themeIfo.head_thumb,
                                themeIfo.creator_id,
                                themeIfo.administrator,
                                new Date().getTime()
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
    // 删除主题
    ThemeModel.deleteOne = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, row;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "DELETE FROM theme WHERE ID = ?";
                        return [4 /*yield*/, database_1["default"](sql, [
                                id
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
    // 根据关键字获取所有的主题
    ThemeModel.getListByKeyword = function (keyword) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, row;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "SELECT * FROM theme WHERE name LIKE '%" + keyword + "%'";
                        return [4 /*yield*/, database_1["default"](sql, [])["catch"](function (err) {
                                console.log(err);
                            })];
                    case 1:
                        row = _a.sent();
                        return [2 /*return*/, row];
                }
            });
        });
    };
    // 获取我关注的主题列表
    ThemeModel.focusList = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, row;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "SELECT * FROM focus WHERE user_id = ?";
                        return [4 /*yield*/, database_1["default"](sql, [
                                userId
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
    // 获取详情
    ThemeModel.getDetails = function (themeId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, row, sql2, row2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "SELECT A.*, B.nickname AS creator_name, B.head_thumb AS creator_head_thumb, C.count AS focus_count\n        FROM theme AS A\n        LEFT JOIN user AS B ON A.creator_id = B.ID\n        LEFT JOIN (SELECT theme_id, COUNT(*) AS count FROM focus GROUP BY theme_id) AS C ON C.theme_id = A.ID\n        WHERE A.ID = ?";
                        return [4 /*yield*/, database_1["default"](sql, [
                                themeId
                            ])["catch"](function (err) {
                                console.log(err);
                            })];
                    case 1:
                        row = _a.sent();
                        console.log(row);
                        sql2 = "SELECT * FROM focus WHERE user_id = ? && theme_id = ?";
                        return [4 /*yield*/, database_1["default"](sql2, [
                                userId,
                                themeId
                            ])["catch"](function (err) {
                                console.log(err);
                            })];
                    case 2:
                        row2 = _a.sent();
                        if (row2.length === 0) {
                            row[0]['is_focus'] = false;
                            row[0]['level'] = 0;
                        }
                        else {
                            row[0]['is_focus'] = true;
                            row[0]['level'] = row2[0].level;
                        }
                        return [2 /*return*/, row];
                }
            });
        });
    };
    // 是否关注
    ThemeModel.isFocus = function (themeId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, row;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "SELECT * FROM focus \n        WHERE user_id = ? && theme_id = ?";
                        return [4 /*yield*/, database_1["default"](sql, [
                                userId,
                                themeId
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
    // 我的关注列表
    ThemeModel.myFocus = function (themeId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, row;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "SELECT * FROM focus WHERE theme_id = ? && user_id = ?";
                        return [4 /*yield*/, database_1["default"](sql, [
                                themeId,
                                userId
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
    // 关注
    ThemeModel.focus = function (themeId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, row;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "INSERT INTO focus\n        (theme_id, user_id, level) VALUES (?, ?, ?)";
                        return [4 /*yield*/, database_1["default"](sql, [
                                themeId,
                                userId,
                                1
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
    // 取消关注
    ThemeModel.unFocus = function (themeId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, row;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "DELETE FROM focus \n        WHERE theme_id = ? && user_id = ?";
                        return [4 /*yield*/, database_1["default"](sql, [
                                themeId,
                                userId,
                                1
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
    // 是否签到
    ThemeModel.isSignIn = function (themeId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var nowDate, sql, row;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nowDate = date_1.getNowDate();
                        sql = "SELECT * FROM sign WHERE theme_id = ? && user_id = ? && sign_time = ?";
                        return [4 /*yield*/, database_1["default"](sql, [
                                themeId,
                                userId,
                                nowDate
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
    // 签到
    ThemeModel.signIn = function (themeId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var nowDate, sql, row;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nowDate = date_1.getNowDate();
                        sql = "INSERT INTO sign \n        (theme_id, user_id, sign_time)\n        VALUES (?, ?, ?)\n        ";
                        return [4 /*yield*/, database_1["default"](sql, [
                                themeId,
                                userId,
                                nowDate
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
    // 贴吧等级升级
    ThemeModel.levelUp = function (themeId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var row, currentLevel, sql2, row2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.myFocus(themeId, userId)];
                    case 1:
                        row = _a.sent();
                        currentLevel = row[0]['level'] + 1;
                        sql2 = "UPDATE focus SET level = ?\n        WHERE theme_id = ? && user_id = ?\n        ";
                        return [4 /*yield*/, database_1["default"](sql2, [
                                currentLevel,
                                themeId,
                                userId
                            ])["catch"](function (err) {
                                console.log(err);
                            })];
                    case 2:
                        row2 = _a.sent();
                        return [2 /*return*/, row2];
                }
            });
        });
    };
    // 我的签到列表
    ThemeModel.getSignList = function (themeId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, row;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "SELECT * FROM sign WHERE theme_id = ? && user_id = ?";
                        return [4 /*yield*/, database_1["default"](sql, [
                                themeId,
                                userId
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
    // 删除签到
    ThemeModel.deleteSign = function (themeId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var row, sql, row_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getSignList(themeId, userId)];
                    case 1:
                        row = _a.sent();
                        if (!(row.length !== 0)) return [3 /*break*/, 3];
                        sql = "DELETE FROM sign WHERE theme_id = ? && user_id = ?";
                        return [4 /*yield*/, database_1["default"](sql, [
                                themeId,
                                userId
                            ])["catch"](function (err) {
                                console.log(err);
                            })];
                    case 2:
                        row_1 = _a.sent();
                        if (row_1.affectedRows !== 0) {
                            return [2 /*return*/, true];
                        }
                        else {
                            return [2 /*return*/, false];
                        }
                        return [3 /*break*/, 4];
                    case 3: return [2 /*return*/, true];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return ThemeModel;
}());
exports["default"] = ThemeModel;
