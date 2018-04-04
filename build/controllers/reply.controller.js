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
const reply_model_1 = require("../models/reply.model");
const sub_reply_model_1 = require("../models/sub-reply.model");
const new_message_model_1 = require("../models/new-message.model");
const post_model_1 = require("../models/post.model");
class ReplyController {
    // 新增回复
    static addOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.user && req.session.user[0]) {
                const postId = parseInt(req.body.postId);
                const userId = parseInt(req.session.user[0].ID);
                const content = req.body.content;
                const imgList = req.body.imgList;
                const row = yield reply_model_1.default.addOne(postId, userId, content, imgList);
                const replyId = row.insertId;
                const postBasic = yield post_model_1.default.getBasic(postId);
                const postUserId = postBasic[0].user_id;
                const subReplyId = -1;
                if (row.affectedRows === 1) {
                    post_model_1.default.replyCountAddOne(postId);
                    post_model_1.default.buildingCountAddOne(postId);
                    new_message_model_1.default.addReply(userId, postUserId, postId, replyId, subReplyId);
                    return {
                        state: true,
                        message: '回复成功'
                    };
                }
                else {
                    return {
                        state: false,
                        message: '回复失败'
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
    // 删除回复
    static deleteOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.user && req.session.user[0]) {
                const replyId = req.body.replyId;
                const userId = req.session.user[0].ID;
                const replyDetails = yield reply_model_1.default.getBasic(replyId);
                if (replyDetails.length == 0) {
                    return {
                        state: true,
                        message: '该数据不存在'
                    };
                }
                else {
                    const postId = replyDetails[0].post_id;
                    const postBasic = yield post_model_1.default.getBasic(postId);
                    if (replyDetails[0].user_id === userId || postBasic[0].user_id === userId) {
                        const row = yield reply_model_1.default.deleteOne(replyId);
                        if (row.affectedRows === 1) {
                            return {
                                state: true,
                                message: '删除成功'
                            };
                        }
                        else {
                            return {
                                state: false,
                                message: '删除失败'
                            };
                        }
                    }
                    else {
                        return {
                            state: false,
                            message: '你没有权限这么做'
                        };
                    }
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
    // 获取回复列表
    static getList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const postId = req.body.postId;
            const pageId = parseInt(req.body.pageId);
            const pageSize = parseInt(req.body.pageSize);
            const start = (pageId - 1) * pageSize;
            const end = pageId * pageSize;
            const twoRow = yield reply_model_1.default.getList(postId, start, end);
            const count = twoRow.all.length;
            const list = twoRow.need;
            for (let i = 0; i < list.length; i++) {
                const item = list[i];
                const replyId = item.ID;
                const sub = yield sub_reply_model_1.default.getTwoList(replyId);
                item['sub_reply'] = sub;
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
    // 获取回复详情
    static getDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const replyId = req.body.replyId;
            const replyDetails = yield reply_model_1.default.getDetails(replyId);
            return {
                state: true,
                message: '获取成功',
                data: replyDetails[0]
            };
        });
    }
}
exports.default = ReplyController;
