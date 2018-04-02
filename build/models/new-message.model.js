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
const database_1 = require("../controllers/DB/database");
class NewMessageModel {
    // 获取基本信息
    static getBasic(messageId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT A.* FROM new_message WHERE ID = messageId`;
            const row = yield database_1.default(sql, [
                messageId
            ]).catch((err) => {
                console.log(err);
            });
            return row;
        });
    }
    // 添加新消息(回复)
    static addOne(type, userId, postUserId, postId, replyId, subReplyId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (postUserId === userId)
                return true;
            const sql = `INSERT INTO new_message         (type, post_id, reply_id, user_id, sub_reply_id)         VALUES (?, ?, ?, ?, ?)        `;
            const row = yield database_1.default(sql, [
                type,
                postId,
                replyId,
                postUserId,
                subReplyId
            ]).catch((err) => {
                console.log(err);
            });
            if (row.affectedRows === 1) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    // 获取当前用户的未读列表
    static getList(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT A.* FROM new_message AS A WHERE A.user_id = ?`;
            const row = yield database_1.default(sql, [
                userId
            ]).catch((err) => {
                console.log(err);
            });
            return row;
        });
    }
    // 已阅
    static deleteOne(messageId) {
        return __awaiter(this, void 0, void 0, function* () {
            const messageList = yield this.getBasic(messageId);
            if (messageList.length !== 0) {
                const sql = `DELETE FROM new_message WHERE ID = ?`;
                const row = yield database_1.default(sql, [
                    messageId
                ]).catch((err) => {
                    console.log(err);
                });
                if (row.affectedRows !== 0) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        });
    }
}
exports.default = NewMessageModel;
