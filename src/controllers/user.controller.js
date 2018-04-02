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
var user_model_1 = require("../models/user.model");
var secret_1 = require("../controllers/libs/secret");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    // 登录
    UserController.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, row;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(req.body.account && req.body.password)) return [3 /*break*/, 2];
                        data = {
                            account: req.body.account,
                            password: req.body.password
                        };
                        return [4 /*yield*/, user_model_1["default"].login(data)];
                    case 1:
                        row = _a.sent();
                        if (row.length === 0) {
                            return [2 /*return*/, {
                                    state: false,
                                    message: '账户或者密码错误'
                                }];
                        }
                        else {
                            req.session.user = row; // 保存session
                            return [2 /*return*/, {
                                    state: true,
                                    message: '登录成功'
                                }];
                        }
                        return [3 /*break*/, 3];
                    case 2: return [2 /*return*/, {
                            state: false,
                            message: '账户及密码不能为空'
                        }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // 注销
    UserController.logout = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                req.session.user = {};
                return [2 /*return*/, {
                        state: true,
                        message: '注销成功'
                    }];
            });
        });
    };
    // 获取某id的用户信息（不带id获取当前登录用户，带id获取对应id的用户信息）
    UserController.getUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userIfo;
            return __generator(this, function (_a) {
                if (req.body.uid) {
                    return [2 /*return*/, {
                            state: true,
                            message: '获取成功',
                            data: '这是别的用户信息'
                        }];
                }
                else {
                    if (req.session.user && req.session.user[0]) {
                        userIfo = JSON.parse(JSON.stringify(req.session.user[0]));
                        delete userIfo.password;
                        return [2 /*return*/, {
                                state: true,
                                message: '获取成功',
                                data: userIfo
                            }];
                    }
                    else {
                        return [2 /*return*/, {
                                state: false,
                                message: '请登录'
                            }];
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    // 注册
    UserController.register = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, row;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(req.body.account && req.body.password && req.body.nickname && req.body.gender)) return [3 /*break*/, 2];
                        data = {
                            account: req.body.account,
                            password: req.body.password,
                            nickname: req.body.nickname,
                            gender: req.body.gender
                        };
                        return [4 /*yield*/, user_model_1["default"].register(data)];
                    case 1:
                        row = _a.sent();
                        if (row.affectedRows === 1) {
                            return [2 /*return*/, {
                                    state: true,
                                    message: '注册成功'
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    state: false,
                                    message: '注册失败'
                                }];
                        }
                        return [3 /*break*/, 3];
                    case 2: return [2 /*return*/, {
                            state: false,
                            message: '内容不能有空'
                        }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // 判断是否注册
    UserController.chargeIsRegister = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, row;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = {
                            account: req.body.account
                        };
                        return [4 /*yield*/, user_model_1["default"].chargeIsRegister(data)];
                    case 1:
                        row = _a.sent();
                        if (row.length !== 0) {
                            return [2 /*return*/, {
                                    state: false,
                                    message: '账户已经存在'
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    state: true,
                                    message: '可以使用'
                                }];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // 修改密码
    UserController.updatePassword = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userIfo, row;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(req.body.oldPwd && req.body.newPwd)) return [3 /*break*/, 6];
                        if (!(req.session.user && req.session.user[0])) return [3 /*break*/, 4];
                        if (!(req.session.user[0].password === secret_1.md5(req.body.oldPwd))) return [3 /*break*/, 2];
                        userIfo = JSON.parse(JSON.stringify(req.session.user[0]));
                        userIfo.password = secret_1.md5(req.body.newPwd);
                        return [4 /*yield*/, user_model_1["default"].updateUser(userIfo)];
                    case 1:
                        row = _a.sent();
                        if (row.affectedRows === 1) {
                            return [2 /*return*/, {
                                    state: true,
                                    message: '修改成功'
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    state: false,
                                    message: '修改失败'
                                }];
                        }
                        return [3 /*break*/, 3];
                    case 2: return [2 /*return*/, {
                            state: false,
                            message: '旧密码错误'
                        }];
                    case 3: return [3 /*break*/, 5];
                    case 4: return [2 /*return*/, {
                            state: false,
                            message: '请先登录'
                        }];
                    case 5: return [3 /*break*/, 7];
                    case 6: return [2 /*return*/, {
                            state: false,
                            message: '新旧密码均必填'
                        }];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    // 修改头像
    UserController.updateHeadThumb = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userIfo, row;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(req.session.user && req.session.user[0])) return [3 /*break*/, 2];
                        userIfo = JSON.parse(JSON.stringify(req.session.user[0]));
                        userIfo.head_thumb = req.body.headThumb;
                        return [4 /*yield*/, user_model_1["default"].updateUser(userIfo)];
                    case 1:
                        row = _a.sent();
                        if (row.affectedRows === 1) {
                            return [2 /*return*/, {
                                    state: true,
                                    message: '修改成功'
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    state: false,
                                    message: '修改失败'
                                }];
                        }
                        return [3 /*break*/, 3];
                    case 2: return [2 /*return*/, {
                            state: false,
                            message: '请先登录'
                        }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // 修改昵称
    UserController.updateNickname = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userIfo, row;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(req.session.user && req.session.user[0])) return [3 /*break*/, 2];
                        userIfo = JSON.parse(JSON.stringify(req.session.user[0]));
                        userIfo.nickname = req.body.nickname;
                        return [4 /*yield*/, user_model_1["default"].updateUser(userIfo)];
                    case 1:
                        row = _a.sent();
                        if (row.affectedRows === 1) {
                            return [2 /*return*/, {
                                    state: true,
                                    message: '修改成功'
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    state: false,
                                    message: '修改失败'
                                }];
                        }
                        return [3 /*break*/, 3];
                    case 2: return [2 /*return*/, {
                            state: false,
                            message: '请先登录'
                        }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return UserController;
}());
exports["default"] = UserController;
// /**
//  * 登录
//  * @param req
//  * @param res
//  */
// /**
//  * 注册
//  * @param req
//  * @param res
//  */
// export const register = (req: Request, res: Response) => {
//     res.send('我是注册');
// }
//
// /**
//  * 注销
//  * @param req
//  * @param res
//  */
// export const logout = (req: Request, res: Response) => {
//     res.send('我是注销');
// }
//
// /**
//  * 修改密码
//  * @param req
//  * @param res
//  */
// export const updatePassword = (req: Request, res: Response) => {
//     res.send('我是修改密码');
// }
//
// /**
//  * 编辑用户
//  * @param req
//  * @param res
//  */
// export const updateUser = (req: Request, res: Response) => {
//     res.send('我是编辑用户');
// }
