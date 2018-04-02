import query from '../controllers/DB/database';
import { md5 } from '../controllers/libs/secret';
import { getNowDate } from '../controllers/libs/date';

interface focusInter {
    ID: number;
    level: number;
    theme_id: number;
    user_id: number;
}
interface addToDbInter {
    affectedRows: number;
}
interface signInter {
    ID: number;
    theme_id: number;
    user_id: number;
    sign_time: string;
}
interface addInter {
    name: string;
    head_thumb: string;
    creator_id: number;
    administrator: string;
}
export default class ThemeModel {
    // 新增主题
    static async addOne(themeIfo: addInter) {
        const sql = `INSERT INTO theme
 	(name, head_thumb, creator_id, administrator, add_time)
 	VALUES (?, ?, ?, ?, ?)`;
        const row = await query(sql, [
            themeIfo.name,
            themeIfo.head_thumb,
            themeIfo.creator_id,
            themeIfo.administrator,
            new Date().getTime()
        ]).catch((err) => {
            console.log(err)
        })
        return row;
    }
    // 删除主题
    static async deleteOne(id: number) {
        const sql = `DELETE FROM theme WHERE ID = ?`;
        const row = await query(sql, [
            id
        ]).catch((err) => {
            console.log(err)
        })
        await this.deleteFocus(id);
        return row;
    }
    // 删除关注的主题
    static async deleteFocus(id: number) {
        const sql = `DELETE FROM focus WHERE theme_id = ?`;
        const row = await query(sql, [
            id
        ]).catch((err) => {
            console.log(err)
        })
        return row;
    }
    // 根据关键字获取所有的主题
    static async getListByKeyword(keyword: string) {
        const sql = `SELECT * FROM theme WHERE name LIKE '%${keyword}%'`;
        const row = await query(sql, []).catch((err) => {
            console.log(err)
        })
        return row;
    }
    // 获取我关注的主题列表
    static async focusList(userId: number) {
        const sql = `SELECT A.*, B.name, B.head_thumb
        FROM focus AS A
        LEFT JOIN theme AS B ON A.theme_id = B.ID
        WHERE user_id = ?
        ORDER BY add_time desc
        `;
        const row = await query(sql, [
            userId
        ]).catch((err) => {
            console.log(err)
        })
        return row;
    }
    // 获取详情
    static async getDetails(themeId: number, userId: number) {
        const sql = `SELECT A.*, B.nickname AS creator_name, B.head_thumb AS creator_head_thumb, C.count AS focus_count, D.count AS post_count
        FROM theme AS A
        LEFT JOIN user AS B ON A.creator_id = B.ID
        LEFT JOIN (SELECT theme_id, COUNT(*) AS count FROM focus GROUP BY theme_id) AS C ON C.theme_id = A.ID
        LEFT JOIN (SELECT theme_id, COUNT(*) as count FROM post GROUP BY theme_id) AS D ON D.theme_id = A.ID
        WHERE A.ID = ?`;
        const row = await query(sql, [
            themeId
        ]).catch((err) => {
            console.log(err)
        })
        const sql2 = `SELECT * FROM focus WHERE user_id = ? && theme_id = ?`;
        const row2 = await query(sql2, [
            userId,
            themeId
        ]).catch((err) => {
            console.log(err)
        })
        if ((<focusInter[]>row2).length === 0) {
            row[0]['is_focus'] = false;
            row[0]['level'] = 0;
        } else {
            row[0]['is_focus'] = true;
            row[0]['level'] = row2[0].level;
        }
        return row;
    }
    // 获取不登录时候的详情
    static async getDetailsOutLine(themeId: number) {
        const sql = `SELECT A.*, B.nickname AS creator_name, B.head_thumb AS creator_head_thumb, C.count AS focus_count, D.count AS post_count
        FROM theme AS A
        LEFT JOIN user AS B ON A.creator_id = B.ID
        LEFT JOIN (SELECT theme_id, COUNT(*) AS count FROM focus GROUP BY theme_id) AS C ON C.theme_id = A.ID
        LEFT JOIN (SELECT theme_id, COUNT(*) as count FROM post GROUP BY theme_id) AS D ON D.theme_id = A.ID
        WHERE A.ID = ?`;
        const row = await query(sql, [
            themeId
        ]).catch((err) => {
            console.log(err)
        })
        return row;
    }
    // 是否关注
    static async isFocus(themeId: number, userId: number) {
        const sql = `SELECT * FROM focus 
        WHERE user_id = ? && theme_id = ?`;
        const row = await query(sql, [
            userId,
            themeId
        ]).catch((err) => {
            console.log(err)
        })
        return row;
    }
    // 我的关注列表
    static async myFocus(themeId: number, userId: number) {
        const sql = `SELECT * FROM focus WHERE theme_id = ? && user_id = ?`;
        const row = await query(sql, [
            themeId,
            userId
        ]).catch((err) => {
            console.log(err)
        })
        return row;
    }
    // 关注
    static async focus(themeId: number, userId: number) {
        const sql = `INSERT INTO focus
        (theme_id, user_id, level) VALUES (?, ?, ?)`;
        const row = await query(sql, [
            themeId,
            userId,
            1
        ]).catch((err) => {
            console.log(err)
        })
        return row;
    }
    // 取消关注
    static async unFocus(themeId: number, userId: number) {
        const sql = `DELETE FROM focus 
        WHERE theme_id = ? && user_id = ?`;
        const row = await query(sql, [
            themeId,
            userId,
            1
        ]).catch((err) => {
            console.log(err)
        })
        return row;
    }
    // 是否签到
    static async isSignIn(themeId: number, userId: number) {
        const nowDate = getNowDate();
        const sql = `SELECT * FROM sign WHERE theme_id = ? && user_id = ? && sign_time = ?`;
        const row = await query(sql, [
            themeId,
            userId,
            nowDate
        ]).catch((err) => {
            console.log(err)
        })
        return row;
    }
    // 签到
    static async signIn(themeId: number, userId: number) {
        const nowDate = getNowDate();
        const sql = `INSERT INTO sign 
        (theme_id, user_id, sign_time)
        VALUES (?, ?, ?)
        `;
        const row = await query(sql, [
            themeId,
            userId,
            nowDate
        ]).catch((err) => {
            console.log(err)
        })
        return row;
    }
    // 贴吧等级升级
    static async levelUp(themeId: number, userId: number) {
        const row = await this.myFocus(themeId, userId);
        const currentLevel = row[0]['level'] + 1;
        const sql2 = `UPDATE focus SET level = ?
        WHERE theme_id = ? && user_id = ?
        `
        const row2 = await query(sql2, [
            currentLevel,
            themeId,
            userId
        ]).catch((err) => {
            console.log(err)
        })
        return row2;
    }
    // 我的签到列表
    static async getSignList(themeId: number, userId: number) {
        const sql = `SELECT * FROM sign WHERE theme_id = ? && user_id = ?`;
        const row = await query(sql, [
            themeId,
            userId
        ]).catch((err) => {
            console.log(err)
        })
        return row;
    }
    // 删除签到
    static async deleteSign(themeId: number, userId: number) {
        const row = await this.getSignList(themeId, userId);
        if ((<signInter[]>row).length !== 0) {
            const sql = `DELETE FROM sign WHERE theme_id = ? && user_id = ?`;
            const row = await query(sql, [
                themeId,
                userId
            ]).catch((err) => {
                console.log(err)
            })
            if ((<addToDbInter>row).affectedRows !== 0) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }
}