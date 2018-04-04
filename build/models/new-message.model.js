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
const sub_reply_model_1 = require("./sub-reply.model");
const reply_model_1 = require("./reply.model");
const arr_1 = require("../controllers/libs/arr");
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
    static addOne(type, userId, postId, replyId, subReplyId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `INSERT INTO new_message         (type, post_id, reply_id, user_id, sub_reply_id)         VALUES (?, ?, ?, ?, ?)        `;
            const row = yield database_1.default(sql, [
                type,
                postId,
                replyId,
                userId,
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
    // 推送回复给楼主
    static addReply(userId, postUserId, postId, replyId, subReplyId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (userId !== postUserId) {
                yield this.addOne('reply', postUserId, postId, replyId, subReplyId);
            }
        });
    }
    // 发散消息给当前回复下的所有人
    static addSubReply(postUserId, postId, replyId, subReplyId, subReplyUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            const subReply = yield sub_reply_model_1.default.getList(replyId);
            const replyIfo = yield reply_model_1.default.getBasic(replyId);
            const replyUserId = replyIfo[0].user_id;
            let userIdList = [postUserId, replyUserId];
            for (let i = 0; i < subReply.length; i++) {
                const userId = subReply[i].user_id;
                if (userId !== subReplyUserId) {
                    userIdList.push(userId);
                }
            }
            userIdList = arr_1.removeSame(userIdList);
            for (let i = 0; i < userIdList.length; i++) {
                yield this.addOne('subReply', userIdList[i], postId, replyId, subReplyId);
            }
        });
    }
    // 获取当前用户的未读列表
    static getList(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT A.*        FROM new_message AS A        WHERE A.user_id = ?`;
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
