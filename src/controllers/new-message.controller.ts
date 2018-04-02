import NewMessageModel from '../models/new-message.model';interface returnValInter {    state: boolean;    message: string;    data?: any;}export default class NewMessageController {    // 获取当前用户未读信息    static async getList(req, res): Promise<returnValInter> {        if (req.session.user && req.session.user[0]) {            const userId = parseInt(req.session.user[0].ID);            const row = await NewMessageModel.getList(userId);            return {                state: true,                message: '未读信息',                data: row            }        } else {            return {                state: false,                message: '请登录'            }        }    }    // 已阅    static async deleteOne(req, res): Promise<returnValInter> {        if (req.session.user && req.session.user[0]) {            const messageId = req.body.messageId;            const result = await NewMessageModel.deleteOne(messageId);            if (result) {                return {                    state: true,                    message: '已阅'                }            } else {                return {                    state: false,                    message: '已阅失败'                }            }        } else {            return {                state: false,                message: '请登录'            }        }    }}