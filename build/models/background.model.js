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
class BackgroundModel {
    // 获取基本信息
    static getBasic(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT * FROM background WHERE ID = ?`;
            const row = yield database_1.default(sql, [
                id
            ]).catch((err) => {
                console.log(err);
            });
            return row;
        });
    }
    // 获取列表
    static getList(type) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT * FROM background WHERE bg_type = ?`;
            const row = yield database_1.default(sql, [
                type
            ]).catch((err) => {
                console.log(err);
            });
            return row;
        });
    }
    // 获取推送数据
    static getShowOne(type) {
        return __awaiter(this, void 0, void 0, function* () {
            const show = 1;
            const sql = `SELECT * FROM background WHERE bg_type = ? && bg_show = ?`;
            const row = yield database_1.default(sql, [
                type,
                show
            ]).catch((err) => {
                console.log(err);
            });
            return row;
        });
    }
    // 新增背景
    static addOne(url, describe, type, show, link) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `INSERT INTO background 
        (bg_url, bg_desc, bg_type, bg_show, bg_link, add_time) 
        VALUES (?, ?, ?, ?, ?, ?)`;
            const row = yield database_1.default(sql, [
                url,
                describe,
                type,
                show,
                link,
                new Date().getTime()
            ]).catch((err) => {
                console.log(err);
            });
            return row;
        });
    }
    // 删除背景
    static deleteOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `DELETE FROM background
        WHERE ID = ?`;
            const row = yield database_1.default(sql, [
                id
            ]).catch((err) => {
                console.log(err);
            });
            return row;
        });
    }
    // 编辑背景
    static editOne(id, url, desc, link, type) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `UPDATE background
        SET bg_url = ?, bg_desc = ?, bg_link = ?, bg_type = ?
        WHERE ID = ?`;
            const row = yield database_1.default(sql, [
                url,
                desc,
                link,
                type,
                id
            ]).catch((err) => {
                console.log(err);
            });
            return row;
        });
    }
    // 显示与否
    static isShow(id, show) {
        return __awaiter(this, void 0, void 0, function* () {
            const thisBg = yield this.getBasic(id);
            const thisType = thisBg[0].bg_type;
            const thisTypeList = yield this.getList(thisType);
            if (thisTypeList.length === 0) {
                return yield this.setShow(id, show);
            }
            else {
                // 首先将之前显示的取消掉
                yield this.removeShow(thisType);
                // 设置点击的
                return yield this.setShow(id, show);
            }
        });
    }
    // 修改显示与否
    static setShow(id, show) {
        return __awaiter(this, void 0, void 0, function* () {
            const showId = show ? 1 : 0;
            const sql = `UPDATE background
            SET bg_show = ?
            WHERE ID = ?`;
            const row = yield database_1.default(sql, [
                showId,
                id
            ]).catch((err) => {
                console.log(err);
            });
            return row;
        });
    }
    // 取消显示
    static removeShow(type) {
        return __awaiter(this, void 0, void 0, function* () {
            const show = 0;
            const sql = `UPDATE background
            SET bg_show = ?
            WHERE bg_type = ?`;
            const row = yield database_1.default(sql, [
                show,
                type
            ]).catch((err) => {
                console.log(err);
            });
            return row;
        });
    }
}
exports.default = BackgroundModel;
