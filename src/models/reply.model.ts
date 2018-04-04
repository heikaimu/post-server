import query from '../controllers/DB/database';
import PostModel from './post.model';
import { getNowDate } from '../controllers/libs/date';

interface addToDbInter {
    affectedRows: number;
    insertId: number;
}

export default class ReplyModel {
    // 获取最初二次回复的回复
    static async getBasicList(postId: number) {
        const sql = `SELECT * FROM reply WHERE post_id = ?`;
        const row = await query(sql, [
            postId
        ]).catch((err) => {
            console.log(err)
        })
        return row;
    }
    // 获取基本信息
    static async getBasic(replyId: number) {
        const sql = `SELECT * FROM reply WHERE ID = ?`;
        const row = await query(sql, [
            replyId
        ]).catch((err) => {
            console.log(err)
        })
        return row;
    }
    // 新增回复
    static async addOne(postId: number, userId: number, content: number, imgList: string) {
        const row = await PostModel.getBasic(postId);
        const buildingCount = row[0].building_count + 1;
        const addTime = new Date().getTime();
        const sql = `INSERT INTO reply 
        (user_id, post_id, content, images, add_time, sub_reply_count, building_num) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const row2 = await query(sql, [
            userId,
            postId,
            content,
            imgList,
            addTime,
            0,
            buildingCount
        ]).catch((err) => {
            console.log(err)
        })
        return row2;
    }
    // 获取回复详情
    static async getDetails(replyId: number) {
        const sql = `SELECT A.*, B.nickname AS user_nickname, B.head_thumb AS user_head_thumb
        FROM reply AS A
        LEFT JOIN user AS B ON B.ID = A.user_id
        WHERE A.ID = ?`;
        const row = await query(sql, [
            replyId
        ]).catch((err) => {
            console.log(err)
        })
        return row;
    }
    // 删除回复
    static async deleteOne(replyId: number) {
        const sql = `DELETE FROM reply WHERE ID = ?`;
        const row = await query(sql, [
            replyId
        ]).catch((err) => {
            console.log(err)
        })
        return row;
    }
    // 删除某贴的全部回复
    static async deleteAll(postId: number) {
        const sql = `DELETE FROM reply WHERE post_id = ?`;
        const row = await query(sql, [
            postId
        ]).catch((err) => {
            console.log(err)
        })
        return row;
    }
    // 获取回复列表
    static async getList(postId: number, start: number, end: number) {
        const postList = await PostModel.getBasic(postId);
        const themeId = postList[0].theme_id;
        const sql = `SELECT A.*, B.nickname AS user_nickname, B.head_thumb AS user_head_thumb, C.level
        FROM reply AS A
        LEFT JOIN user AS B ON B.ID = A.user_id
        LEFT JOIN (SELECT user_id, level FROM focus WHERE theme_id = ?) AS C ON C.user_id = A.user_id
        WHERE A.post_id = ?
        ORDER BY add_time ASC
        limit ?, ?
        `;
        const row = await query(sql, [
            themeId,
            postId,
            start,
            end
        ]).catch((err) => {
            console.log(err)
        })
        const sql2 = `SELECT ID FROM reply WHERE post_id = ?`;
        const row2 = await query(sql2, [
            postId
        ]).catch((err) => {
            console.log(err)
        })
        return {
            need: row,
            all: row2
        };
    }

    // 回复数+1
    static async replyCountAddOne(replyId: number) {
        const row = await this.getBasic(replyId);
        const replyCount = row[0].sub_reply_count | 0;
        console.log(replyCount);
        const currentReplyCount = replyCount + 1;
        const sql2 = `UPDATE reply SET sub_reply_count = ? WHERE ID = ?`;
        const row2 = await query(sql2, [
            currentReplyCount,
            replyId
        ]).catch((err) => {
            console.log(err)
        })
        return row2;
    }

}