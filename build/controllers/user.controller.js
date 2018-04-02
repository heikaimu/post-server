"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../models/user.model");
const secret_1 = require("../controllers/libs/secret");
class UserController {
    // 登录
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body.account && req.body.password) {
                const data = {
                    account: req.body.account,
                    password: req.body.password
                };
                const row = yield user_model_1.default.login(data);
                if (row.length === 0) {
                    return {
                        state: false,
                        message: '账户或者密码错误'
                    };
                }
                else {
                    req.session.user = row; // 保存session
                    return {
                        state: true,
                        message: '登录成功'
                    };
                }
            }
            else {
                return {
                    state: false,
                    message: '账户及密码不能为空'
                };
            }
        });
    }
    // 注销
    static logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.session.user = {};
            return {
                state: true,
                message: '注销成功'
            };
        });
    }
    // 获取某id的用户信息（不带id获取当前登录用户，带id获取对应id的用户信息）
    static getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body.uid) {
                return {
                    state: true,
                    message: '获取成功',
                    data: '这是别的用户信息'
                };
            }
            else {
                if (req.session.user && req.session.user[0]) {
                    let userIfo = JSON.parse(JSON.stringify(req.session.user[0]));
                    delete userIfo.password;
                    return {
                        state: true,
                        message: '获取成功',
                        data: userIfo
                    };
                }
                else {
                    return {
                        state: false,
                        message: '请登录'
                    };
                }
            }
        });
    }
    // 注册
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body.account && req.body.password && req.body.nickname && req.body.gender) {
                const data = {
                    account: req.body.account,
                    password: req.body.password,
                    nickname: req.body.nickname,
                    gender: req.body.gender
                };
                const row = yield user_model_1.default.register(data);
                if (row.affectedRows === 1) {
                    return {
                        state: true,
                        message: '注册成功'
                    };
                }
                else {
                    return {
                        state: false,
                        message: '注册失败'
                    };
                }
            }
            else {
                return {
                    state: false,
                    message: '内容不能有空'
                };
            }
        });
    }
    // 判断是否注册
    static chargeIsRegister(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = {
                account: req.body.account
            };
            const row = yield user_model_1.default.chargeIsRegister(data);
            if (row.length !== 0) {
                return {
                    state: false,
                    message: '账户已经存在'
                };
            }
            else {
                return {
                    state: true,
                    message: '可以使用'
                };
            }
        });
    }
    // 修改密码
    static updatePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body.oldPwd && req.body.newPwd) {
                if (req.session.user && req.session.user[0]) {
                    if (req.session.user[0].password === secret_1.md5(req.body.oldPwd)) {
                        const userId = req.session.user[0].ID;
                        const password = secret_1.md5(req.body.newPwd);
                        const row = yield user_model_1.default.updatePassword(password, userId);
                        if (row.affectedRows === 1) {
                            return {
                                state: true,
                                message: '修改成功'
                            };
                        }
                        else {
                            return {
                                state: false,
                                message: '修改失败'
                            };
                        }
                    }
                    else {
                        return {
                            state: false,
                            message: '旧密码错误'
                        };
                    }
                }
                else {
                    return {
                        state: false,
                        message: '请先登录'
                    };
                }
            }
            else {
                return {
                    state: false,
                    message: '新旧密码均必填'
                };
            }
        });
    }
    // 修改头像
    static updateHeadThumb(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.user && req.session.user[0]) {
                const userId = req.session.user[0].ID;
                const headThumb = req.body.headThumb;
                const row = yield user_model_1.default.updateHeadThumb(headThumb, userId);
                if (row.affectedRows === 1) {
                    return {
                        state: true,
                        message: '修改成功'
                    };
                }
                else {
                    return {
                        state: false,
                        message: '修改失败'
                    };
                }
            }
            else {
                return {
                    state: false,
                    message: '请先登录'
                };
            }
        });
    }
    // 修改昵称
    static updateNickname(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.user && req.session.user[0]) {
                const userId = req.session.user[0].ID;
                const nickname = req.body.nickname;
                const row = yield user_model_1.default.updateNickname(nickname, userId);
                if (row.affectedRows === 1) {
                    return {
                        state: true,
                        message: '修改成功'
                    };
                }
                else {
                    return {
                        state: false,
                        message: '修改失败'
                    };
                }
            }
            else {
                return {
                    state: false,
                    message: '请先登录'
                };
            }
        });
    }
    // 修改背景
    static updateBackground(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.user && req.session.user[0]) {
                const userId = req.session.user[0].ID;
                const background = req.body.background;
                const row = yield user_model_1.default.updateBackground(background, userId);
                if (row.affectedRows === 1) {
                    return {
                        state: true,
                        message: '修改成功'
                    };
                }
                else {
                    return {
                        state: false,
                        message: '修改失败'
                    };
                }
            }
            else {
                return {
                    state: false,
                    message: '请先登录'
                };
            }
        });
    }
}
exports.default = UserController;
