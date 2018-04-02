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
var theme_model_1 = require("../models/theme.model");
var ThemeController = /** @class */ (function () {
    function ThemeController() {
    }
    // 新增主题
    ThemeController.addOne = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, row;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(req.session.user && req.session.user[0])) return [3 /*break*/, 4];
                        if (!(req.body.name && req.body.headThumb)) return [3 /*break*/, 2];
                        data = {
                            name: req.body.name,
                            head_thumb: req.body.headThumb,
                            creator_id: req.session.user[0].ID,
                            administrator: '',
                            add_time: new Date().getTime()
                        };
                        return [4 /*yield*/, theme_model_1["default"].addOne(data)];
                    case 1:
                        row = _a.sent();
                        if (row.affectedRows === 1) {
                            return [2 /*return*/, {
                                    state: true,
                                    message: '新建成功'
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    state: false,
                                    message: '新建失败'
                                }];
                        }
                        return [3 /*break*/, 3];
                    case 2: return [2 /*return*/, {
                            state: false,
                            message: '主题名字和封面均不能为空'
                        }];
                    case 3: return [3 /*break*/, 5];
                    case 4: return [2 /*return*/, {
                            state: false,
                            message: '请登录'
                        }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // 删除主题
    ThemeController.deleteOne = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var row;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(req.session.user && req.session.user[0])) return [3 /*break*/, 4];
                        if (!req.body.themeId) return [3 /*break*/, 2];
                        return [4 /*yield*/, theme_model_1["default"].deleteOne(req.body.themeId)];
                    case 1:
                        row = _a.sent();
                        if (row.length !== 0) {
                            return [2 /*return*/, {
                                    state: true,
                                    message: '删除主题成功'
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    state: false,
                                    message: '你还未关注，不能取消关注'
                                }];
                        }
                        return [3 /*break*/, 3];
                    case 2: return [2 /*return*/, {
                            state: false,
                            message: '主题id不能为空'
                        }];
                    case 3: return [3 /*break*/, 5];
                    case 4: return [2 /*return*/, {
                            state: false,
                            message: '请登录'
                        }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // 获取主题列表
    ThemeController.getList = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var keyword, row;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        keyword = req.body.keyword;
                        return [4 /*yield*/, theme_model_1["default"].getListByKeyword(keyword)];
                    case 1:
                        row = _a.sent();
                        return [2 /*return*/, {
                                state: true,
                                message: '获取成功',
                                data: row
                            }];
                }
            });
        });
    };
    // 获取主题详情
    ThemeController.getDetails = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var themeId, userId, row;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(req.session.user && req.session.user[0])) return [3 /*break*/, 2];
                        themeId = req.body.themeId;
                        userId = req.session.user[0].ID;
                        return [4 /*yield*/, theme_model_1["default"].getDetails(themeId, userId)];
                    case 1:
                        row = _a.sent();
                        return [2 /*return*/, {
                                state: true,
                                message: '获取成功',
                                data: row[0]
                            }];
                    case 2: return [2 /*return*/, {
                            state: false,
                            message: '请登录'
                        }];
                }
            });
        });
    };
    // 关注的主题列表
    ThemeController.focusList = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, row;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(req.session.user && req.session.user[0])) return [3 /*break*/, 2];
                        userId = req.session.user[0].ID;
                        return [4 /*yield*/, theme_model_1["default"].focusList(userId)];
                    case 1:
                        row = _a.sent();
                        return [2 /*return*/, {
                                state: true,
                                message: '获取成功',
                                data: row
                            }];
                    case 2: return [2 /*return*/, {
                            state: false,
                            message: '请登录'
                        }];
                }
            });
        });
    };
    // 关注主题
    ThemeController.focus = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var themeId, userId, row, row_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(req.session.user && req.session.user[0])) return [3 /*break*/, 7];
                        if (!req.body.themeId) return [3 /*break*/, 5];
                        themeId = req.body.themeId;
                        userId = req.session.user[0].ID;
                        return [4 /*yield*/, theme_model_1["default"].isFocus(themeId, userId)];
                    case 1:
                        row = _a.sent();
                        if (!(row.length === 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, theme_model_1["default"].focus(themeId, userId)];
                    case 2:
                        row_1 = _a.sent();
                        if (row_1.affectedRows === 1) {
                            return [2 /*return*/, {
                                    state: true,
                                    message: '关注成功'
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    state: false,
                                    message: '关注失败'
                                }];
                        }
                        return [3 /*break*/, 4];
                    case 3: return [2 /*return*/, {
                            state: false,
                            message: '请勿重复关注'
                        }];
                    case 4: return [3 /*break*/, 6];
                    case 5: return [2 /*return*/, {
                            state: false,
                            message: '贴吧不能为空'
                        }];
                    case 6: return [3 /*break*/, 8];
                    case 7: return [2 /*return*/, {
                            state: false,
                            message: '请登录'
                        }];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    // 取消关注主题
    ThemeController.unFocus = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var themeId, userId, row, row_2, isDel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(req.session.user && req.session.user[0])) return [3 /*break*/, 10];
                        if (!req.body.themeId) return [3 /*break*/, 8];
                        themeId = req.body.themeId;
                        userId = req.session.user[0].ID;
                        return [4 /*yield*/, theme_model_1["default"].isFocus(themeId, userId)];
                    case 1:
                        row = _a.sent();
                        if (!(row.length !== 0)) return [3 /*break*/, 6];
                        return [4 /*yield*/, theme_model_1["default"].unFocus(themeId, userId)];
                    case 2:
                        row_2 = _a.sent();
                        if (!(row_2.affectedRows === 1)) return [3 /*break*/, 4];
                        return [4 /*yield*/, theme_model_1["default"].deleteSign(themeId, userId)];
                    case 3:
                        isDel = _a.sent();
                        if (isDel) {
                            return [2 /*return*/, {
                                    state: true,
                                    message: '取消关注成功'
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    state: false,
                                    message: '取消关注失败'
                                }];
                        }
                        return [3 /*break*/, 5];
                    case 4: return [2 /*return*/, {
                            state: false,
                            message: '取消关注失败'
                        }];
                    case 5: return [3 /*break*/, 7];
                    case 6: return [2 /*return*/, {
                            state: false,
                            message: '你还未关注，不能取消关注'
                        }];
                    case 7: return [3 /*break*/, 9];
                    case 8: return [2 /*return*/, {
                            state: false,
                            message: '贴吧不能为空'
                        }];
                    case 9: return [3 /*break*/, 11];
                    case 10: return [2 /*return*/, {
                            state: false,
                            message: '请登录'
                        }];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    // 签到
    ThemeController.signIn = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var themeId, userId, row, row_3, row_4, row_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        themeId = req.body.themeId;
                        if (!(req.session.user && req.session.user[0])) return [3 /*break*/, 11];
                        userId = req.session.user[0].ID;
                        return [4 /*yield*/, theme_model_1["default"].myFocus(themeId, userId)];
                    case 1:
                        row = _a.sent();
                        if (!(row.length !== 0)) return [3 /*break*/, 9];
                        return [4 /*yield*/, theme_model_1["default"].isSignIn(themeId, userId)];
                    case 2:
                        row_3 = _a.sent();
                        if (!(row_3.length === 0)) return [3 /*break*/, 7];
                        return [4 /*yield*/, theme_model_1["default"].signIn(themeId, userId)];
                    case 3:
                        row_4 = _a.sent();
                        if (!(row_4.affectedRows === 1)) return [3 /*break*/, 5];
                        return [4 /*yield*/, theme_model_1["default"].levelUp(themeId, userId)];
                    case 4:
                        row_5 = _a.sent();
                        if (row_5.affectedRows === 1) {
                            return [2 /*return*/, {
                                    state: true,
                                    message: '签到成功，经验值+1'
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    state: true,
                                    message: '签到失败'
                                }];
                        }
                        return [3 /*break*/, 6];
                    case 5: return [2 /*return*/, {
                            state: false,
                            message: '签到失败'
                        }];
                    case 6: return [3 /*break*/, 8];
                    case 7: return [2 /*return*/, {
                            state: false,
                            message: '今日已签到'
                        }];
                    case 8: return [3 /*break*/, 10];
                    case 9: return [2 /*return*/, {
                            state: false,
                            message: '你还未关注'
                        }];
                    case 10: return [3 /*break*/, 12];
                    case 11: return [2 /*return*/, {
                            state: false,
                            message: '请登录'
                        }];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    return ThemeController;
}());
exports["default"] = ThemeController;
