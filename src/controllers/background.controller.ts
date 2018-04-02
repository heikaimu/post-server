import BackgroundModel from '../models/background.model';

interface backgroundInter {
    ID: number;
    bg_url: string;
    bg_desc: string;
    bg_link: string;
    bg_type: string;
    bg_show: boolean;
    add_time: string;
}

interface addToDbInter {
    affectedRows: number;
}

interface returnValInter {
    state: boolean;
    message: string;
    data?: any;
}

export default class BackgroundController {
    // 新增
    static async addOne(req, res): Promise<returnValInter> {
        const url = req.body.url;
        const desc = req.body.desc;
        const link = req.body.link;
        const show = false;
        const type = req.body.type;
        if (url && desc && type) {
            const row = await BackgroundModel.addOne(url, desc, type, show, link);
            if ((<addToDbInter>row).affectedRows !== 0) {
                return {
                    state: true,
                    message: '添加成功'
                }
            } else {
                return {
                    state: false,
                    message: '添加失败'
                }
            }
        } else {
            return {
                state: false,
                message: '必要的信息不能为空'
            }
        }
    }
    // 获取列表
    static async getList(req, res): Promise<returnValInter> {
        const type = req.body.type;
        const row = await BackgroundModel.getList(type);
        return {
            state: true,
            message: '获取成功',
            data: {
                list: row
            }
        }
    }
    // 获取当前推送的
    static async getShowOne(req, res): Promise<returnValInter> {
        const type = req.body.type;
        const row = await BackgroundModel.getShowOne(type);
        if ((<backgroundInter[]>row).length !== 0) {
            return {
                state: true,
                message: '获取成功',
                data: row[0]
            }
        } else {
            return {
                state: false,
                message: '获取失败，当前无推送数据'
            }
        }
    }
    // 获取单个
    static async getDetails(req, res): Promise<returnValInter> {
        const id = req.body.backgroundId;
        const row = await BackgroundModel.getBasic(id);
        if ((<backgroundInter[]>row).length !== 0) {
            return {
                state: true,
                message: '获取成功',
                data: row[0]
            }
        } else {
            return {
                state: false,
                message: '获取失败，没有该条数据'
            }
        }
    }
    // 删除
    static async deleteOne(req, res): Promise<returnValInter> {
        const id = req.body.backgroundId;
        const row = await BackgroundModel.deleteOne(id);
        if ((<addToDbInter>row).affectedRows !== 0) {
            return {
                state: true,
                message: '删除成功'
            }
        } else {
            return {
                state: false,
                message: '删除失败'
            }
        }
    }
    // 编辑
    static async editOne(req, res): Promise<returnValInter> {
        const id = req.body.backgroundId;
        const url = req.body.url;
        const desc = req.body.desc;
        const link = req.body.link;
        const type = req.body.type;
        const row = await BackgroundModel.editOne(id, url, desc, link, type);
        if ((<addToDbInter>row).affectedRows !== 0) {
            return {
                state: true,
                message: '编辑成功'
            }
        } else {
            return {
                state: false,
                message: '编辑失败'
            }
        }
    }
    // 设置显示与否
    static async setShow(req, res): Promise<returnValInter> {
        const id = req.body.backgroundId;
        const show = req.body.show;
        const row = await BackgroundModel.isShow(id, show);
        if ((<addToDbInter>row).affectedRows !== 0) {
            return {
                state: true,
                message: '修改成功'
            }
        } else {
            return {
                state: false,
                message: '修改失败'
            }
        }
    }
}