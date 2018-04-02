import query from '../controllers/DB/database';
import { md5 } from '../controllers/libs/secret';

interface loginIfoInter {
    account: string;
    password: string;
}
interface chargeIsRegisterInter {
    account: string;
}
interface registerIfoInter {
    account: string;
    password: string;
    nickname: string;
    gender: string;
}
interface updateIfoInter {
    ID: number,
    account: string,
    password: string,
    nickname: string,
    gender: string,
    head_thumb: string,
    add_time: number
}
export default class UserModel {
    // 登录
    static async login(loginIfo: loginIfoInter) {
        const sql = 'SELECT * FROM user where account = ? && password = ?';
        const row = await query(sql, [
            loginIfo.account,
            md5(loginIfo.password)
        ]).catch((err) => {
            console.log(err)
        })
        return row;
    }
    // 注册
    static async register(registerIfo: registerIfoInter) {
        const sql = `INSERT INTO user
 	(account, password, nickname, gender, add_time, head_thumb, background)
 	VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const row = await query(sql, [
            registerIfo.account,
            md5(registerIfo.password),
            registerIfo.nickname,
            registerIfo.gender,
            new Date().getTime(),
            '',
            ''
        ]).catch((err) => {
            console.log(err)
        })
        return row;
    }
    // 判断是否已经注册
    static async chargeIsRegister(loginIfo: chargeIsRegisterInter) {
        const sql = 'SELECT * FROM user where account = ?';
        const row = await query(sql, [
            loginIfo.account
        ]).catch((err) => {
            console.log(err)
        })
        return row;
    }
    // 修改头像
    static async updateHeadThumb(headThumb: string, userId: number) {
        const sql = `UPDATE user
 	SET head_thumb = ?
 	WHERE ID = ?`;
        const row = await query(sql, [
            headThumb,
            userId
        ]).catch((err) => {
            console.log(err)
        })
        return row;
    }
    // 修改用户
    static async updateNickname(nickname: string, userId: number) {
        const sql = `UPDATE user
 	SET nickname = ?
 	WHERE ID = ?`;
        const row = await query(sql, [
            nickname,
            userId
        ]).catch((err) => {
            console.log(err)
        })
        return row;
    }
    // 修改密码
    static async updatePassword(password: string, userId: number) {
        const sql = `UPDATE user
 	SET password = ?
 	WHERE ID = ?`;
        const row = await query(sql, [
            password,
            userId
        ]).catch((err) => {
            console.log(err)
        })
        return row;
    }
    // 修改背景
    static async updateBackground(background: string, userId: number) {
        const sql = `UPDATE user
 	SET background = ?
 	WHERE ID = ?`;
        const row = await query(sql, [
            background,
            userId
        ]).catch((err) => {
            console.log(err)
        })
        return row;
    }
}