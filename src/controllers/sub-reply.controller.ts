import SubReplyModel from '../models/sub-reply.model';
import PostModel from '../models/post.model';
import ReplyModel from '../models/reply.model';
import PostController from './post.controller';
import NewMessageModel from '../models/new-message.model';

interface returnValInter {
    state: boolean;
    message: string;
    data?: any;
}
interface addToDbInter {
    affectedRows: number;
    insertId: number;
}
export default class SubReplyController {
    // 新增
    static async addOne(req, res): Promise<returnValInter> {
        if (req.session.user && req.session.user[0]) {
            const content = req.body.content;
            const replyId = req.body.replyId;
            const postId = req.body.postId;
            const userId = parseInt(req.session.user[0].ID);
            const row = await SubReplyModel.addOne(content, replyId, userId);
            const subReplyId = (<addToDbInter>row).insertId;
            const postBasic = await PostController.getBasic(postId);
            const postUserId = postBasic.data.user_id;
            if ((<addToDbInter>row).affectedRows === 1) {
                await PostModel.replyCountAddOne(postId);
                await ReplyModel.replyCountAddOne(replyId);
                const newMessage1 = NewMessageModel.addOne('subReply', userId, postUserId, postId, replyId, subReplyId);
                return {
                    state: true,
                    message: '回复成功',
                    data: row
                }
            } else {
                return {
                    state: false,
                    message: '回复失败'
                }
            }
        } else {
            return {
                state: false,
                message: '请登录'
            }
        }
    }
    // 获取列表
    static async getList(req, res): Promise<returnValInter> {
        const replyId = req.body.replyId;
        const row = await SubReplyModel.getList(replyId);
        return {
            state: true,
            message: '获取成功',
            data: row
        }
    }
}