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
const sub_reply_model_1 = require("../models/sub-reply.model");
const post_model_1 = require("../models/post.model");
const reply_model_1 = require("../models/reply.model");
const post_controller_1 = require("./post.controller");
const new_message_model_1 = require("../models/new-message.model");
class SubReplyController {
    // 新增
    static addOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.user && req.session.user[0]) {
                const content = req.body.content;
                const replyId = req.body.replyId;
                const postId = req.body.postId;
                const userId = parseInt(req.session.user[0].ID);
                const row = yield sub_reply_model_1.default.addOne(content, replyId, userId);
                const subReplyId = row.insertId;
                const postBasic = yield post_controller_1.default.getBasic(postId);
                const postUserId = postBasic.data.user_id;
                if (row.affectedRows === 1) {
                    yield post_model_1.default.replyCountAddOne(postId);
                    yield reply_model_1.default.replyCountAddOne(replyId);
                    new_message_model_1.default.addSubReply(postUserId, postId, replyId, subReplyId, userId);
                    return {
                        state: true,
                        message: '回复成功',
                        data: row
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
    // 获取列表
    static getList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const replyId = req.body.replyId;
            const row = yield sub_reply_model_1.default.getList(replyId);
            return {
                state: true,
                message: '获取成功',
                data: row
            };
        });
    }
}
exports.default = SubReplyController;
