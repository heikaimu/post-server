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
class PostModel {
    // 获取基本信息
    static getBasic(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT * FROM post WHERE ID = ?`;
            const row = yield database_1.default(sql, [
                postId
            ]).catch((err) => {
                console.log(err);
            });
            return row;
        });
    }
    // 发帖
    static addOne(userId, themeId, title, content, imgList) {
        return __awaiter(this, void 0, void 0, function* () {
            const addTime = new Date().getTime();
            const sql = `INSERT INTO post 
        (title, content, add_time, user_id, theme_id, images, reply_count, building_count)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
            const row = yield database_1.default(sql, [
                title,
                content,
                addTime,
                userId,
                themeId,
                imgList,
                0,
                0
            ]).catch((err) => {
                console.log(err);
            });
            return row;
        });
    }
    // 删帖
    static deleteOne(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `DELETE FROM post WHERE ID = ?
        `;
            const row = yield database_1.default(sql, [
                postId
            ]).catch((err) => {
                console.log(err);
            });
            return row;
        });
    }
    // 获取列表
    static getList(themeId, start, end) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT A.*, 
        B.nickname AS user_nickname, B.head_thumb AS user_head_thumb, 
        C.name AS theme_name, C.head_thumb AS theme_head_thumb, 
        D.level AS theme_level
        FROM post AS A
        LEFT JOIN user AS B ON A.user_id = B.ID
        LEFT JOIN theme AS C ON A.theme_id = C.ID
        LEFT JOIN (SELECT user_id, level FROM focus WHERE theme_id = ?) AS D ON D.user_id = A.user_id
        WHERE theme_id = ? 
        ORDER BY add_time DESC
        limit ?, ?
        `;
            const row = yield database_1.default(sql, [
                themeId,
                themeId,
                start,
                end
            ]).catch((err) => {
                console.log(err);
            });
            const sql2 = `SELECT ID FROM post WHERE theme_id = ? `;
            const row2 = yield database_1.default(sql2, [
                themeId
            ]).catch((err) => {
                console.log(err);
            });
            return {
                need: row,
                all: row2
            };
        });
    }
    // 获取推荐列表
    static getPublish(start, end) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT A.*, 
        B.nickname AS user_nickname, B.head_thumb AS user_head_thumb, 
        C.name AS theme_name, C.head_thumb AS theme_head_thumb
        FROM post AS A
        LEFT JOIN user AS B ON A.user_id = B.ID
        LEFT JOIN theme AS C ON A.theme_id = C.ID
        ORDER BY add_time DESC
        limit ?, ?
        `;
            const row = yield database_1.default(sql, [
                start,
                end
            ]).catch((err) => {
                console.log(err);
            });
            const sql2 = `SELECT ID FROM post`;
            const row2 = yield database_1.default(sql2, []).catch((err) => {
                console.log(err);
            });
            return {
                need: row,
                all: row2
            };
        });
    }
    // 获取当前用户发布的
    static getMine(userId, start, end) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT A.*, 
        B.nickname AS user_nickname, B.head_thumb AS user_head_thumb, 
        C.name AS theme_name, C.head_thumb AS theme_head_thumb
        FROM post AS A
        LEFT JOIN user AS B ON A.user_id = B.ID
        LEFT JOIN theme AS C ON A.theme_id = C.ID
        WHERE user_id = ?
        ORDER BY add_time DESC
        limit ?, ?
        `;
            const row = yield database_1.default(sql, [
                userId,
                start,
                end
            ]).catch((err) => {
                console.log(err);
            });
            const sql2 = `SELECT ID FROM post WHERE user_id = ?`;
            const row2 = yield database_1.default(sql2, [
                userId
            ]).catch((err) => {
                console.log(err);
            });
            return {
                need: row,
                all: row2
            };
        });
    }
    // 获取详情
    static getDetails(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const row = yield this.getBasic(postId);
            const themeId = row[0].theme_id;
            const sql2 = `SELECT A.*,
        B.nickname AS user_nickname, B.head_thumb AS user_head_thumb,
        C.name AS theme_name, C.head_thumb AS theme_head_thumb,
        D.level AS theme_level
        FROM post AS A
        LEFT JOIN user AS B ON A.user_id = B.ID
        LEFT JOIN theme AS C ON A.theme_id = C.ID
        LEFT JOIN (SELECT user_id, level FROM focus WHERE theme_id = ?) AS D ON D.user_id = A.user_id
        WHERE A.ID = ?
        `;
            const row2 = yield database_1.default(sql2, [
                themeId,
                postId
            ]).catch((err) => {
                console.log(err);
            });
            return row2;
        });
    }
    // 回复数+1
    static replyCountAddOne(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const row = yield this.getBasic(postId);
            const replyCount = row[0].reply_count | 0;
            const currentReplyCount = replyCount + 1;
            const sql2 = `UPDATE post SET reply_count = ? WHERE ID = ?`;
            const row2 = yield database_1.default(sql2, [
                currentReplyCount,
                postId
            ]).catch((err) => {
                console.log(err);
            });
            return row2;
        });
    }
    // 楼层数量+1
    static buildingCountAddOne(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const row = yield this.getBasic(postId);
            const buildingCount = row[0].building_count || 0;
            const currentBuildingCount = buildingCount + 1;
            const sql2 = `UPDATE post SET building_count = ? WHERE ID = ?`;
            const row2 = yield database_1.default(sql2, [
                currentBuildingCount,
                postId
            ]).catch((err) => {
                console.log(err);
            });
            return row2;
        });
    }
}
exports.default = PostModel;
