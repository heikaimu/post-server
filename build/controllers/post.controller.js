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
const post_model_1 = require("../models/post.model");
const reply_model_1 = require("../models/reply.model");
class PostController {
    // 新增
    static addOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.user && req.session.user[0]) {
                const userId = req.session.user[0].ID;
                const themeId = req.body.themeId;
                const title = req.body.title;
                const content = req.body.content;
                const imgList = req.body.imgList;
                if (title && content) {
                    const row = yield post_model_1.default.addOne(userId, themeId, title, content, imgList);
                    if (row.affectedRows === 1) {
                        return {
                            state: true,
                            message: '发帖成功'
                        };
                    }
                    else {
                        return {
                            state: false,
                            message: '发帖失败'
                        };
                    }
                }
                else {
                    return {
                        state: false,
                        message: '标题及内容均不能为空'
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
    // 删除
    static deleteOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.user && req.session.user[0]) {
                const postId = req.body.postId;
                const userId = req.session.user[0].ID;
                // 首先判断是否有权限删除
                const postBasic = yield post_model_1.default.getBasic(postId);
                if (postBasic[0].user_id === userId) {
                    const row = yield post_model_1.default.deleteOne(postId);
                    if (row.affectedRows === 1) {
                        // 删除对应的回复
                        yield reply_model_1.default.deleteAll(postId);
                        return {
                            state: true,
                            message: '删帖成功'
                        };
                    }
                    else {
                        return {
                            state: false,
                            message: '删帖失败'
                        };
                    }
                }
                else {
                    return {
                        state: false,
                        message: '权限不够啊兄弟'
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
    // 获取列表
    static getList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const themeId = req.body.themeId;
            const pageId = parseInt(req.body.pageId);
            const pageSize = parseInt(req.body.pageSize);
            const start = (pageId - 1) * pageSize;
            const end = pageId * pageSize;
            const twoRow = yield post_model_1.default.getList(themeId, start, end);
            const count = twoRow.all.length;
            const list = twoRow.need;
            for (let i = 0; i < list.length; i++) {
                const item = list[i];
                const { state, data } = yield this.getGodReply(item.ID);
                if (state) {
                    item.god_reply = data;
                }
            }
            const data = {
                count: count,
                list: list,
                pageId: pageId,
                pageSize: pageSize
            };
            return {
                state: true,
                message: '获取成功',
                data: data
            };
        });
    }
    // 获取推荐列表
    static getPublish(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pageId = parseInt(req.body.pageId);
            const pageSize = parseInt(req.body.pageSize);
            const start = (pageId - 1) * pageSize;
            const end = pageId * pageSize;
            const twoRow = yield post_model_1.default.getPublish(start, end);
            const count = twoRow.all.length;
            const list = twoRow.need;
            for (let i = 0; i < list.length; i++) {
                const item = list[i];
                const { state, data } = yield this.getGodReply(item.ID);
                if (state) {
                    item.god_reply = data;
                }
            }
            const data = {
                count: count,
                list: list,
                pageId: pageId,
                pageSize: pageSize
            };
            return {
                state: true,
                message: '获取成功',
                data: data
            };
        });
    }
    // 获取当前用户发布的
    static getMine(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.user && req.session.user[0]) {
                const userId = req.session.user[0].ID;
                const pageId = parseInt(req.body.pageId);
                const pageSize = parseInt(req.body.pageSize);
                const start = (pageId - 1) * pageSize;
                const end = pageId * pageSize;
                const twoRow = yield post_model_1.default.getMine(userId, start, end);
                const count = twoRow.all.length;
                const list = twoRow.need;
                const data = {
                    count: count,
                    list: list,
                    pageId: pageId,
                    pageSize: pageSize
                };
                return {
                    state: true,
                    message: '获取成功',
                    data: data
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
    // 获取帖子详情
    static getDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const postId = req.body.postId;
            const row = yield post_model_1.default.getDetails(postId);
            return {
                state: true,
                message: '获取成功',
                data: row[0]
            };
        });
    }
    // 帖子基本信息
    static getBasic(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const row = yield post_model_1.default.getBasic(postId);
            return {
                state: true,
                message: '获取成功',
                data: row[0]
            };
        });
    }
    // 回复数+1
    static replyCountAddOne(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const row = yield post_model_1.default.replyCountAddOne(postId);
            if (row.affectedRows === 1) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    // 获取神回复
    static getGodReply(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const row = yield reply_model_1.default.getBasicList(postId);
            if (row.length === 0) {
                return {
                    state: false,
                    message: '没有神回复',
                    data: ''
                };
            }
            else {
                const godReply = row[0];
                if (godReply.sub_reply_count === 0) {
                    return {
                        state: false,
                        message: '没有神回复',
                        data: ''
                    };
                }
                else {
                    return {
                        state: true,
                        message: '神回复有了吗？',
                        data: godReply
                    };
                }
            }
        });
    }
}
exports.default = PostController;
