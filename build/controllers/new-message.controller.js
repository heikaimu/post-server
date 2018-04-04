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
const new_message_model_1 = require("../models/new-message.model");
const post_model_1 = require("../models/post.model");
const reply_model_1 = require("../models/reply.model");
const sub_reply_model_1 = require("../models/sub-reply.model");
class NewMessageController {
    // 获取当前用户未读信息
    static getList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.user && req.session.user[0]) {
                const userId = parseInt(req.session.user[0].ID);
                const row = yield new_message_model_1.default.getList(userId);
                for (let i = 0; i < row.length; i++) {
                    const currentMessage = row[i];
                    currentMessage.post_ifo = yield post_model_1.default.getDetails(currentMessage.post_id);
                    currentMessage.reply_ifo = yield reply_model_1.default.getDetails(currentMessage.reply_id);
                    currentMessage.sub_reply_ifo = yield sub_reply_model_1.default.getDetails(currentMessage.sub_reply_id);
                }
                return {
                    state: true,
                    message: '未读信息',
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
    // 已阅
    static deleteOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.user && req.session.user[0]) {
                const messageId = req.body.messageId;
                const result = yield new_message_model_1.default.deleteOne(messageId);
                if (result) {
                    return {
                        state: true,
                        message: '已阅'
                    };
                }
                else {
                    return {
                        state: false,
                        message: '已阅失败'
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
exports.default = NewMessageController;
