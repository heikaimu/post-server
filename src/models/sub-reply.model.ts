import query from '../controllers/DB/database';

export default class SubReplyModel {
    // 获取基本信息
    static async getBasic(subReplyId: number) {
        const sql = `SELECT user_id FROM sub_reply WHERE ID = ?`;
        const row = await query(sql, [
            subReplyId
        ]).catch((err) => {
            console.log(err)
        })
        return row;
    }
    // 获取单挑详情
    static async getDetails(subReplyId: number) {
        const sql = `SELECT A.*, B.nickname AS user_nickname, B.head_thumb AS user_head_thumb
        FROM sub_reply AS A
        LEFT JOIN user AS B ON B.ID = A.user_id
        WHERE A.ID = ?`;
        const row = await query(sql, [
            subReplyId
        ]).catch((err) => {
            console.log(err)
        })
        return row;
    }
    // 新增
    static async addOne(content: string, replyId: number, userId: number) {
        const sql = `INSERT INTO sub_reply 
        (content, reply_id, user_id, add_time)
        VALUES (?, ?, ?, ?)
        `;
        const row = await query(sql, [
            content,
            replyId,
            userId,
            new Date().getTime()
        ]).catch((err) => {
            console.log(err)
        })
        return row;
    }
    // 获取列表
    static async getList(replyId: number) {
        const sql = `SELECT A.*, B.nickname
        FROM sub_reply AS A
        LEFT JOIN user AS B ON A.user_id = B.ID
        WHERE reply_id = ?
        ORDER BY add_time ASC
        `;
        const row = await query(sql, [
            replyId
        ]).catch((err) => {
            console.log(err)
        })
        return row;
    }
    // 获取前两个
    static async getTwoList(replyId: number) {
        const sql = `SELECT A.*, B.nickname
        FROM sub_reply AS A
        LEFT JOIN user AS B ON A.user_id = B.ID
        WHERE reply_id = ?
        ORDER BY add_time ASC
        limit 0, 2
        `;
        const row = await query(sql, [
            replyId
        ]).catch((err) => {
            console.log(err)
        })
        return row;
    }

}