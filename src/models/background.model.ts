import query from '../controllers/DB/database';

interface backgroundInter {
    ID: number;
    bg_url: string;
    bg_desc: string;
    bg_link: string;
    bg_type: string;
    bg_show: boolean;
    add_time: string;
}
export default class BackgroundModel {
    // 获取基本信息
    static async getBasic(id: number) {
        const sql = `SELECT * FROM background WHERE ID = ?`;
        const row = await query(sql, [
            id
        ]).catch((err) => {
            console.log(err)
        })
        return row;
    }
    // 获取列表
    static async getList(type: string) {
        const sql = `SELECT * FROM background WHERE bg_type = ?`;
        const row = await query(sql, [
            type
        ]).catch((err) => {
            console.log(err)
        })
        return row;
    }
    // 获取推送数据
    static async getShowOne(type: string) {
        const show = 1;
        const sql = `SELECT * FROM background WHERE bg_type = ? && bg_show = ?`;
        const row = await query(sql, [
            type,
            show
        ]).catch((err) => {
            console.log(err)
        })
        return row;
    }
    // 新增背景
    static async addOne(url: string, describe: string, type: string, show: boolean, link: string) {
        const sql = `INSERT INTO background 
        (bg_url, bg_desc, bg_type, bg_show, bg_link, add_time) 
        VALUES (?, ?, ?, ?, ?, ?)`;
        const row = await query(sql, [
            url,
            describe,
            type,
            show,
            link,
            new Date().getTime()
        ]).catch((err) => {
            console.log(err)
        })
        return row;
    }
    // 删除背景
    static async deleteOne(id: number) {
        const sql = `DELETE FROM background
        WHERE ID = ?`;
        const row = await query(sql, [
            id
        ]).catch((err) => {
            console.log(err)
        })
        return row;
    }
    // 编辑背景
    static async editOne(id: number, url: string, desc: string, link: string, type: string) {
        const sql = `UPDATE background
        SET bg_url = ?, bg_desc = ?, bg_link = ?, bg_type = ?
        WHERE ID = ?`;
        const row = await query(sql, [
            url,
            desc,
            link,
            type,
            id
        ]).catch((err) => {
            console.log(err)
        })
        return row;
    }
    // 显示与否
    static async isShow(id: number, show:boolean) {
        const thisBg = await this.getBasic(id);
        const thisType = thisBg[0].bg_type;
        const thisTypeList = await this.getList(thisType);
        if ((<backgroundInter[]>thisTypeList).length === 0) {
            return await this.setShow(id, show);
        } else {
            // 首先将之前显示的取消掉
            await this.removeShow(thisType);
            // 设置点击的
            return await this.setShow(id, show);
        }
    }
    // 修改显示与否
    static async setShow(id: number, show: boolean) {
        const showId = show ? 1 : 0;
        const sql = `UPDATE background
            SET bg_show = ?
            WHERE ID = ?`;
        const row = await query(sql, [
            showId,
            id
        ]).catch((err) => {
            console.log(err)
        })
        return row;
    }
    // 取消显示
    static async removeShow(type: string) {
        const show = 0;
        const sql = `UPDATE background
            SET bg_show = ?
            WHERE bg_type = ?`;
        const row = await query(sql, [
            show,
            type
        ]).catch((err) => {
            console.log(err)
        })
        return row;
    }
}