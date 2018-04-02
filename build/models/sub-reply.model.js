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
class SubReplyModel {
    // 获取基本信息
    static getBasic(subReplyId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT user_id FROM sub_reply WHERE ID = ?`;
            const row = yield database_1.default(sql, [
                subReplyId
            ]).catch((err) => {
                console.log(err);
            });
            return row;
        });
    }
    // 新增
    static addOne(content, replyId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `INSERT INTO sub_reply 
        (content, reply_id, user_id, add_time)
        VALUES (?, ?, ?, ?)
        `;
            const row = yield database_1.default(sql, [
                content,
                replyId,
                userId,
                new Date().getTime()
            ]).catch((err) => {
                console.log(err);
            });
            return row;
        });
    }
    // 获取列表
    static getList(replyId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT A.*, B.nickname
        FROM sub_reply AS A
        LEFT JOIN user AS B ON A.user_id = B.ID
        WHERE reply_id = ?
        ORDER BY add_time ASC
        `;
            const row = yield database_1.default(sql, [
                replyId
            ]).catch((err) => {
                console.log(err);
            });
            return row;
        });
    }
    // 获取前两个
    static getTwoList(replyId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT A.*, B.nickname
        FROM sub_reply AS A
        LEFT JOIN user AS B ON A.user_id = B.ID
        WHERE reply_id = ?
        ORDER BY add_time ASC
        limit 0, 2
        `;
            const row = yield database_1.default(sql, [
                replyId
            ]).catch((err) => {
                console.log(err);
            });
            return row;
        });
    }
}
exports.default = SubReplyModel;
