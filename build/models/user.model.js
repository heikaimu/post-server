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
const secret_1 = require("../controllers/libs/secret");
class UserModel {
    // 登录
    static login(loginIfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT * FROM user where account = ? && password = ?';
            const row = yield database_1.default(sql, [
                loginIfo.account,
                secret_1.md5(loginIfo.password)
            ]).catch((err) => {
                console.log(err);
            });
            return row;
        });
    }
    // 注册
    static register(registerIfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `INSERT INTO user
 	(account, password, nickname, gender, add_time, head_thumb, background)
 	VALUES (?, ?, ?, ?, ?, ?, ?)`;
            const row = yield database_1.default(sql, [
                registerIfo.account,
                secret_1.md5(registerIfo.password),
                registerIfo.nickname,
                registerIfo.gender,
                new Date().getTime(),
                '',
                ''
            ]).catch((err) => {
                console.log(err);
            });
            return row;
        });
    }
    // 判断是否已经注册
    static chargeIsRegister(loginIfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT * FROM user where account = ?';
            const row = yield database_1.default(sql, [
                loginIfo.account
            ]).catch((err) => {
                console.log(err);
            });
            return row;
        });
    }
    // 修改头像
    static updateHeadThumb(headThumb, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `UPDATE user
 	SET head_thumb = ?
 	WHERE ID = ?`;
            const row = yield database_1.default(sql, [
                headThumb,
                userId
            ]).catch((err) => {
                console.log(err);
            });
            return row;
        });
    }
    // 修改用户
    static updateNickname(nickname, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `UPDATE user
 	SET nickname = ?
 	WHERE ID = ?`;
            const row = yield database_1.default(sql, [
                nickname,
                userId
            ]).catch((err) => {
                console.log(err);
            });
            return row;
        });
    }
    // 修改密码
    static updatePassword(password, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `UPDATE user
 	SET password = ?
 	WHERE ID = ?`;
            const row = yield database_1.default(sql, [
                password,
                userId
            ]).catch((err) => {
                console.log(err);
            });
            return row;
        });
    }
    // 修改背景
    static updateBackground(background, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `UPDATE user
 	SET background = ?
 	WHERE ID = ?`;
            const row = yield database_1.default(sql, [
                background,
                userId
            ]).catch((err) => {
                console.log(err);
            });
            return row;
        });
    }
}
exports.default = UserModel;
