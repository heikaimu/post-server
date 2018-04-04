import ReplyModel from '../models/reply.model';
import SubReplyModel from '../models/sub-reply.model';
import NewMessageModel from '../models/new-message.model';
import PostModel from '../models/post.model';

interface returnValInter {
    state: boolean;
    message: string;
    data?: any;
}
interface addToDbInter {
    affectedRows: number;
    insertId: number;
}
interface twoRowInter {
    need: any;
    all: number[];
}
interface replyInter {
    ID: number;
    content: string;
    add_time: string;
    post_id: number;
    user_id: number;
}
export default class ReplyController {
    // 新增回复
    static async addOne(req, res): Promise<returnValInter> {
        if (req.session.user && req.session.user[0]) {
            const postId = parseInt(req.body.postId);
            const userId = parseInt(req.session.user[0].ID);
            const content = req.body.content;
            const imgList = req.body.imgList;
            const row = await ReplyModel.addOne(postId, userId, content, imgList);
            const replyId = (<addToDbInter>row).insertId;
            const postBasic = await PostModel.getBasic(postId);
            const postUserId = postBasic[0].user_id;
            const subReplyId = -1;
            if ((<addToDbInter>row).affectedRows === 1) {
                PostModel.replyCountAddOne(postId);
                PostModel.buildingCountAddOne(postId);
                NewMessageModel.addReply(userId, postUserId, postId, replyId, subReplyId);
                return {
                    state: true,
                    message: '回复成功'
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
    // 删除回复
    static async deleteOne(req, res): Promise<returnValInter> {
        if (req.session.user && req.session.user[0]) {
            const replyId = req.body.replyId;
            const userId = req.session.user[0].ID;
            const replyDetails = await ReplyModel.getBasic(replyId);
            if ((<replyInter[]>replyDetails).length == 0) {
                return {
                    state: true,
                    message: '该数据不存在'
                }
            } else {
                const postId = replyDetails[0].post_id;
                const postBasic = await PostModel.getBasic(postId);
                if (replyDetails[0].user_id === userId || postBasic[0].user_id === userId) { // 如果是本人的回复或者楼主则可以删除
                    const row = await ReplyModel.deleteOne(replyId);
                    if ((<addToDbInter>row).affectedRows === 1) {
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
                } else {
                    return {
                        state: false,
                        message: '你没有权限这么做'
                    }
                }
            }
        } else {
            return {
                state: false,
                message: '请登录'
            }
        }
    }
    // 获取回复列表
    static async getList(req, res): Promise<returnValInter> {
        const postId = req.body.postId;
        const pageId = parseInt(req.body.pageId);
        const pageSize = parseInt(req.body.pageSize);
        const start = (pageId - 1) * pageSize;
        const end = pageId * pageSize;
        const twoRow = await ReplyModel.getList(postId, start,  end);
        const count = (<twoRowInter>twoRow).all.length;
        const list = (<twoRowInter>twoRow).need;
        for (let i = 0; i < list.length; i++) {
            const item = list[i];
            const replyId = item.ID;
            const sub = await SubReplyModel.getTwoList(replyId);
            item['sub_reply'] = sub;
        }
        const data = {
            count: count,
            list: list,
            pageId: pageId,
            pageSize: pageSize
        }
        return {
            state: true,
            message: '获取成功',
            data: data
        }
    }
    // 获取回复详情
    static async getDetails(req, res): Promise<returnValInter> {
        const replyId = req.body.replyId;
        const replyDetails = await ReplyModel.getDetails(replyId);
        return {
            state: true,
            message: '获取成功',
            data: replyDetails[0]
        }
    }
}