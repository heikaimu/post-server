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
const theme_model_1 = require("../models/theme.model");
class ThemeController {
    // 新增主题
    static addOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.user && req.session.user[0]) {
                if (req.body.name && req.body.headThumb) {
                    const data = {
                        name: req.body.name,
                        head_thumb: req.body.headThumb,
                        creator_id: req.session.user[0].ID,
                        administrator: ''
                    };
                    const row = yield theme_model_1.default.addOne(data);
                    if (row.affectedRows === 1) {
                        return {
                            state: true,
                            message: '新建成功',
                            data: row
                        };
                    }
                    else {
                        return {
                            state: false,
                            message: '新建失败'
                        };
                    }
                }
                else {
                    return {
                        state: false,
                        message: '主题名字和封面均不能为空'
                    };
                }
            }
            else {
                return {
                    state: false,
                    message: '请登录'
                };
            }
        });
    }
    // 删除主题
    static deleteOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.user && req.session.user[0]) {
                if (req.body.themeId) {
                    const row = yield theme_model_1.default.deleteOne(req.body.themeId);
                    if (row.length !== 0) {
                        return {
                            state: true,
                            message: '删除主题成功'
                        };
                    }
                    else {
                        return {
                            state: false,
                            message: '你还未关注，不能取消关注'
                        };
                    }
                }
                else {
                    return {
                        state: false,
                        message: '主题id不能为空'
                    };
                }
            }
            else {
                return {
                    state: false,
                    message: '请登录'
                };
            }
        });
    }
    // 获取主题列表
    static getList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const keyword = req.body.keyword;
            const row = yield theme_model_1.default.getListByKeyword(keyword);
            return {
                state: true,
                message: '获取成功',
                data: row
            };
        });
    }
    // 获取主题详情
    static getDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.user && req.session.user[0]) {
                const themeId = req.body.themeId;
                const userId = req.session.user[0].ID;
                const row = yield theme_model_1.default.getDetails(themeId, userId);
                return {
                    state: true,
                    message: '获取成功',
                    data: row[0]
                };
            }
            else {
                const themeId = req.body.themeId;
                const row = yield theme_model_1.default.getDetailsOutLine(themeId);
                return {
                    state: true,
                    message: '获取成功',
                    data: row[0]
                };
            }
        });
    }
    // 关注的主题列表
    static focusList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.user && req.session.user[0]) {
                const userId = req.session.user[0].ID;
                const row = yield theme_model_1.default.focusList(userId);
                return {
                    state: true,
                    message: '获取成功',
                    data: row
                };
            }
            else {
                return {
                    state: false,
                    message: '请登录'
                };
            }
        });
    }
    // 关注主题
    static focus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.user && req.session.user[0]) {
                if (req.body.themeId) {
                    const themeId = req.body.themeId;
                    const userId = req.session.user[0].ID;
                    const row = yield theme_model_1.default.isFocus(themeId, userId);
                    if (row.length === 0) {
                        const row = yield theme_model_1.default.focus(themeId, userId);
                        if (row.affectedRows === 1) {
                            return {
                                state: true,
                                message: '关注成功'
                            };
                        }
                        else {
                            return {
                                state: false,
                                message: '关注失败'
                            };
                        }
                    }
                    else {
                        return {
                            state: false,
                            message: '请勿重复关注'
                        };
                    }
                }
                else {
                    return {
                        state: false,
                        message: '贴吧不能为空'
                    };
                }
            }
            else {
                return {
                    state: false,
                    message: '请登录'
                };
            }
        });
    }
    // 取消关注主题
    static unFocus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.user && req.session.user[0]) {
                if (req.body.themeId) {
                    const themeId = req.body.themeId;
                    const userId = req.session.user[0].ID;
                    const row = yield theme_model_1.default.isFocus(themeId, userId);
                    if (row.length !== 0) {
                        const row = yield theme_model_1.default.unFocus(themeId, userId);
                        if (row.affectedRows === 1) {
                            const isDel = yield theme_model_1.default.deleteSign(themeId, userId);
                            if (isDel) {
                                return {
                                    state: true,
                                    message: '取消关注成功'
                                };
                            }
                            else {
                                return {
                                    state: false,
                                    message: '取消关注失败'
                                };
                            }
                        }
                        else {
                            return {
                                state: false,
                                message: '取消关注失败'
                            };
                        }
                    }
                    else {
                        return {
                            state: false,
                            message: '你还未关注，不能取消关注'
                        };
                    }
                }
                else {
                    return {
                        state: false,
                        message: '贴吧不能为空'
                    };
                }
            }
            else {
                return {
                    state: false,
                    message: '请登录'
                };
            }
        });
    }
    // 签到
    static signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const themeId = req.body.themeId;
            if (req.session.user && req.session.user[0]) {
                const userId = req.session.user[0].ID;
                const row = yield theme_model_1.default.myFocus(themeId, userId);
                if (row.length !== 0) {
                    const row = yield theme_model_1.default.isSignIn(themeId, userId);
                    if (row.length === 0) {
                        const row = yield theme_model_1.default.signIn(themeId, userId);
                        if (row.affectedRows === 1) {
                            const row = yield theme_model_1.default.levelUp(themeId, userId);
                            if (row.affectedRows === 1) {
                                return {
                                    state: true,
                                    message: '签到成功，经验值+1'
                                };
                            }
                            else {
                                return {
                                    state: true,
                                    message: '签到失败'
                                };
                            }
                        }
                        else {
                            return {
                                state: false,
                                message: '签到失败'
                            };
                        }
                    }
                    else {
                        return {
                            state: false,
                            message: '今日已签到'
                        };
                    }
                }
                else {
                    return {
                        state: false,
                        message: '你还未关注'
                    };
                }
            }
            else {
                return {
                    state: false,
                    message: '请登录'
                };
            }
        });
    }
}
exports.default = ThemeController;
