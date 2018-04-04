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
const post_model_1 = require("./post.model");
class ReplyModel {
    // 获取最初二次回复的回复
    static getBasicList(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT * FROM reply WHERE post_id = ?`;
            const row = yield database_1.default(sql, [
                postId
            ]).catch((err) => {
                console.log(err);
            });
            return row;
        });
    }
    // 获取基本信息
    static getBasic(replyId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT * FROM reply WHERE ID = ?`;
            const row = yield database_1.default(sql, [
                replyId
            ]).catch((err) => {
                console.log(err);
            });
            return row;
        });
    }
    // 新增回复
    static addOne(postId, userId, content, imgList) {
        return __awaiter(this, void 0, void 0, function* () {
            const row = yield post_model_1.default.getBasic(postId);
            const buildingCount = row[0].building_count + 1;
            const addTime = new Date().getTime();
            const sql = `INSERT INTO reply 
        (user_id, post_id, content, images, add_time, sub_reply_count, building_num) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`;
            const row2 = yield database_1.default(sql, [
                userId,
                postId,
                content,
                imgList,
                addTime,
                0,
                buildingCount
            ]).catch((err) => {
                console.log(err);
            });
            return row2;
        });
    }
    // 获取回复详情
    static getDetails(replyId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT A.*, B.nickname AS user_nickname, B.head_thumb AS user_head_thumb
        FROM reply AS A
        LEFT JOIN user AS B ON B.ID = A.user_id
        WHERE A.ID = ?`;
            const row = yield database_1.default(sql, [
                replyId
            ]).catch((err) => {
                console.log(err);
            });
            return row;
        });
    }
    // 删除回复
    static deleteOne(replyId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `DELETE FROM reply WHERE ID = ?`;
            const row = yield database_1.default(sql, [
                replyId
            ]).catch((err) => {
                console.log(err);
            });
            return row;
        });
    }
    // 删除某贴的全部回复
    static deleteAll(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `DELETE FROM reply WHERE post_id = ?`;
            const row = yield database_1.default(sql, [
                postId
            ]).catch((err) => {
                console.log(err);
            });
            return row;
        });
    }
    // 获取回复列表
    static getList(postId, start, end) {
        return __awaiter(this, void 0, void 0, function* () {
            const postList = yield post_model_1.default.getBasic(postId);
            const themeId = postList[0].theme_id;
            const sql = `SELECT A.*, B.nickname AS user_nickname, B.head_thumb AS user_head_thumb, C.level
        FROM reply AS A
        LEFT JOIN user AS B ON B.ID = A.user_id
        LEFT JOIN (SELECT user_id, level FROM focus WHERE theme_id = ?) AS C ON C.user_id = A.user_id
        WHERE A.post_id = ?
        ORDER BY add_time ASC
        limit ?, ?
        `;
            const row = yield database_1.default(sql, [
                themeId,
                postId,
                start,
                end
            ]).catch((err) => {
                console.log(err);
            });
            const sql2 = `SELECT ID FROM reply WHERE post_id = ?`;
            const row2 = yield database_1.default(sql2, [
                postId
            ]).catch((err) => {
                console.log(err);
            });
            return {
                need: row,
                all: row2
            };
        });
    }
    // 回复数+1
    static replyCountAddOne(replyId) {
        return __awaiter(this, void 0, void 0, function* () {
            const row = yield this.getBasic(replyId);
            const replyCount = row[0].sub_reply_count | 0;
            console.log(replyCount);
            const currentReplyCount = replyCount + 1;
            const sql2 = `UPDATE reply SET sub_reply_count = ? WHERE ID = ?`;
            const row2 = yield database_1.default(sql2, [
                currentReplyCount,
                replyId
            ]).catch((err) => {
                console.log(err);
            });
            return row2;
        });
    }
}
exports.default = ReplyModel;
