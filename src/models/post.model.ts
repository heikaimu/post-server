import query from '../controllers/DB/database';
import { getNowDate } from '../controllers/libs/date';

interface addToDbInter {
    affectedRows: number;
}

export default class PostModel {
    // 获取基本信息
    static async getBasic(postId: number) {
        const sql = `SELECT * FROM post WHERE ID = ?`;
        const row = await query(sql, [
            postId
        ]).catch((err) => {
            console.log(err)
        })
        return row;
    }
    // 发帖
    static async addOne(userId: number, themeId: number, title: string, content: string, imgList: string) {
        const addTime = new Date().getTime();
        const sql = `INSERT INTO post 
        (title, content, add_time, user_id, theme_id, images, reply_count, building_count)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const row = await query(sql, [
            title,
            content,
            addTime,
            userId,
            themeId,
            imgList,
            0,
            0
        ]).catch((err) => {
            console.log(err)
        })
        return row;
    }
    // 删帖
    static async deleteOne(postId: number) {
        const sql = `DELETE FROM post WHERE ID = ?
        `;
        const row = await query(sql, [
            postId
        ]).catch((err) => {
            console.log(err)
        })
        return row;
    }
    // 获取列表
    static async getList(themeId: number, start: number, end: number) {
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
        const row = await query(sql, [
            themeId,
            themeId,
            start,
            end
        ]).catch((err) => {
            console.log(err)
        })
        const sql2 = `SELECT ID FROM post WHERE theme_id = ? `;
        const row2 = await query(sql2, [
            themeId
        ]).catch((err) => {
            console.log(err)
        })
        return {
            need: row,
            all: row2
        };
    }
    // 获取推荐列表
    static async getPublish(start: number, end: number) {
        const sql = `SELECT A.*, 
        B.nickname AS user_nickname, B.head_thumb AS user_head_thumb, 
        C.name AS theme_name, C.head_thumb AS theme_head_thumb
        FROM post AS A
        LEFT JOIN user AS B ON A.user_id = B.ID
        LEFT JOIN theme AS C ON A.theme_id = C.ID
        ORDER BY add_time DESC
        limit ?, ?
        `;
        const row = await query(sql, [
            start,
            end
        ]).catch((err) => {
            console.log(err)
        })
        const sql2 = `SELECT ID FROM post`;
        const row2 = await query(sql2, []).catch((err) => {
            console.log(err)
        })
        return {
            need: row,
            all: row2
        };
    }
    // 获取当前用户发布的
    static async getMine(userId: number, start: number, end: number) {
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
        const row = await query(sql, [
            userId,
            start,
            end
        ]).catch((err) => {
            console.log(err)
        })
        const sql2 = `SELECT ID FROM post WHERE user_id = ?`;
        const row2 = await query(sql2, [
            userId
        ]).catch((err) => {
            console.log(err)
        })
        return {
            need: row,
            all: row2
        };
    }
    // 获取详情
    static async getDetails(postId: number) {
        const row = await this.getBasic(postId);
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
        const row2 = await query(sql2, [
            themeId,
            postId
        ]).catch((err) => {
            console.log(err)
        })
        return row2;
    }
    // 回复数+1
    static async replyCountAddOne(postId: number) {
        const row = await this.getBasic(postId);
        const replyCount = row[0].reply_count | 0;
        const currentReplyCount = replyCount + 1;
        const sql2 = `UPDATE post SET reply_count = ? WHERE ID = ?`;
        const row2 = await query(sql2, [
            currentReplyCount,
            postId
        ]).catch((err) => {
            console.log(err)
        })
        return row2;
    }
    // 楼层数量+1
    static async buildingCountAddOne(postId: number) {
        const row = await this.getBasic(postId);
        const buildingCount = row[0].building_count || 0;
        const currentBuildingCount = buildingCount + 1;
        const sql2 = `UPDATE post SET building_count = ? WHERE ID = ?`;
        const row2 = await query(sql2, [
            currentBuildingCount,
            postId
        ]).catch((err) => {
            console.log(err)
        })
        return row2;
    }

}