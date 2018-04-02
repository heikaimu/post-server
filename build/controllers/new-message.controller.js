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
class NewMessageController {
    // 获取当前用户未读信息
    static getList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.user && req.session.user[0]) {
                const userId = parseInt(req.session.user[0].ID);
                const row = yield new_message_model_1.default.getList(userId);
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
