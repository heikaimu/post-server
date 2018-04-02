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
const date_1 = require("../controllers/libs/date");
class ThemeModel {
    // 新增主题
    static addOne(themeIfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `INSERT INTO theme
 	(name, head_thumb, creator_id, administrator, add_time)
 	VALUES (?, ?, ?, ?, ?)`;
            const row = yield database_1.default(sql, [
                themeIfo.name,
                themeIfo.head_thumb,
                themeIfo.creator_id,
                themeIfo.administrator,
                new Date().getTime()
            ]).catch((err) => {
                console.log(err);
            });
            return row;
        });
    }
    // 删除主题
    static deleteOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `DELETE FROM theme WHERE ID = ?`;
            const row = yield database_1.default(sql, [
                id
            ]).catch((err) => {
                console.log(err);
            });
            yield this.deleteFocus(id);
            return row;
        });
    }
    // 删除关注的主题
    static deleteFocus(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `DELETE FROM focus WHERE theme_id = ?`;
            const row = yield database_1.default(sql, [
                id
            ]).catch((err) => {
                console.log(err);
            });
            return row;
        });
    }
    // 根据关键字获取所有的主题
    static getListByKeyword(keyword) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT * FROM theme WHERE name LIKE '%${keyword}%'`;
            const row = yield database_1.default(sql, []).catch((err) => {
                console.log(err);
            });
            return row;
        });
    }
    // 获取我关注的主题列表
    static focusList(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT A.*, B.name, B.head_thumb
        FROM focus AS A
        LEFT JOIN theme AS B ON A.theme_id = B.ID
        WHERE user_id = ?
        ORDER BY add_time desc
        `;
            const row = yield database_1.default(sql, [
                userId
            ]).catch((err) => {
                console.log(err);
            });
            return row;
        });
    }
    // 获取详情
    static getDetails(themeId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT A.*, B.nickname AS creator_name, B.head_thumb AS creator_head_thumb, C.count AS focus_count, D.count AS post_count
        FROM theme AS A
        LEFT JOIN user AS B ON A.creator_id = B.ID
        LEFT JOIN (SELECT theme_id, COUNT(*) AS count FROM focus GROUP BY theme_id) AS C ON C.theme_id = A.ID
        LEFT JOIN (SELECT theme_id, COUNT(*) as count FROM post GROUP BY theme_id) AS D ON D.theme_id = A.ID
        WHERE A.ID = ?`;
            const row = yield database_1.default(sql, [
                themeId
            ]).catch((err) => {
                console.log(err);
            });
            const sql2 = `SELECT * FROM focus WHERE user_id = ? && theme_id = ?`;
            const row2 = yield database_1.default(sql2, [
                userId,
                themeId
            ]).catch((err) => {
                console.log(err);
            });
            if (row2.length === 0) {
                row[0]['is_focus'] = false;
                row[0]['level'] = 0;
            }
            else {
                row[0]['is_focus'] = true;
                row[0]['level'] = row2[0].level;
            }
            return row;
        });
    }
    // 获取不登录时候的详情
    static getDetailsOutLine(themeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT A.*, B.nickname AS creator_name, B.head_thumb AS creator_head_thumb, C.count AS focus_count, D.count AS post_count
        FROM theme AS A
        LEFT JOIN user AS B ON A.creator_id = B.ID
        LEFT JOIN (SELECT theme_id, COUNT(*) AS count FROM focus GROUP BY theme_id) AS C ON C.theme_id = A.ID
        LEFT JOIN (SELECT theme_id, COUNT(*) as count FROM post GROUP BY theme_id) AS D ON D.theme_id = A.ID
        WHERE A.ID = ?`;
            const row = yield database_1.default(sql, [
                themeId
            ]).catch((err) => {
                console.log(err);
            });
            return row;
        });
    }
    // 是否关注
    static isFocus(themeId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT * FROM focus 
        WHERE user_id = ? && theme_id = ?`;
            const row = yield database_1.default(sql, [
                userId,
                themeId
            ]).catch((err) => {
                console.log(err);
            });
            return row;
        });
    }
    // 我的关注列表
    static myFocus(themeId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT * FROM focus WHERE theme_id = ? && user_id = ?`;
            const row = yield database_1.default(sql, [
                themeId,
                userId
            ]).catch((err) => {
                console.log(err);
            });
            return row;
        });
    }
    // 关注
    static focus(themeId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `INSERT INTO focus
        (theme_id, user_id, level) VALUES (?, ?, ?)`;
            const row = yield database_1.default(sql, [
                themeId,
                userId,
                1
            ]).catch((err) => {
                console.log(err);
            });
            return row;
        });
    }
    // 取消关注
    static unFocus(themeId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `DELETE FROM focus 
        WHERE theme_id = ? && user_id = ?`;
            const row = yield database_1.default(sql, [
                themeId,
                userId,
                1
            ]).catch((err) => {
                console.log(err);
            });
            return row;
        });
    }
    // 是否签到
    static isSignIn(themeId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const nowDate = date_1.getNowDate();
            const sql = `SELECT * FROM sign WHERE theme_id = ? && user_id = ? && sign_time = ?`;
            const row = yield database_1.default(sql, [
                themeId,
                userId,
                nowDate
            ]).catch((err) => {
                console.log(err);
            });
            return row;
        });
    }
    // 签到
    static signIn(themeId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const nowDate = date_1.getNowDate();
            const sql = `INSERT INTO sign 
        (theme_id, user_id, sign_time)
        VALUES (?, ?, ?)
        `;
            const row = yield database_1.default(sql, [
                themeId,
                userId,
                nowDate
            ]).catch((err) => {
                console.log(err);
            });
            return row;
        });
    }
    // 贴吧等级升级
    static levelUp(themeId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const row = yield this.myFocus(themeId, userId);
            const currentLevel = row[0]['level'] + 1;
            const sql2 = `UPDATE focus SET level = ?
        WHERE theme_id = ? && user_id = ?
        `;
            const row2 = yield database_1.default(sql2, [
                currentLevel,
                themeId,
                userId
            ]).catch((err) => {
                console.log(err);
            });
            return row2;
        });
    }
    // 我的签到列表
    static getSignList(themeId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT * FROM sign WHERE theme_id = ? && user_id = ?`;
            const row = yield database_1.default(sql, [
                themeId,
                userId
            ]).catch((err) => {
                console.log(err);
            });
            return row;
        });
    }
    // 删除签到
    static deleteSign(themeId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const row = yield this.getSignList(themeId, userId);
            if (row.length !== 0) {
                const sql = `DELETE FROM sign WHERE theme_id = ? && user_id = ?`;
                const row = yield database_1.default(sql, [
                    themeId,
                    userId
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
                return true;
            }
        });
    }
}
exports.default = ThemeModel;
