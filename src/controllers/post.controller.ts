import PostModel from '../models/post.model';
import ReplyModel from '../models/reply.model';

interface returnValInter {
    state: boolean;
    message: string;
    data?: any;
}
interface addToDbInter {
    affectedRows: number;
}
interface twoRowInter {
    need: any;
    all: number[]
}
export default class PostController {
    // 新增
    static async addOne(req, res): Promise<returnValInter> {
        if (req.session.user && req.session.user[0]) {
            const userId = req.session.user[0].ID;
            const themeId = req.body.themeId;
            const title = req.body.title;
            const content = req.body.content;
            const imgList = req.body.imgList;
            if (title && content) {
                const row = await PostModel.addOne(userId, themeId, title, content, imgList);
                if ((<addToDbInter>row).affectedRows === 1) {
                    return {
                        state: true,
                        message: '发帖成功'
                    }
                } else {
                    return {
                        state: false,
                        message: '发帖失败'
                    }
                }
            } else {
                return {
                    state: false,
                    message: '标题及内容均不能为空'
                }
            }
        } else {
            return {
                state: false,
                message: '请登录'
            }
        }
    }
    // 删除
    static async deleteOne(req, res): Promise<returnValInter> {
        if (req.session.user && req.session.user[0]) {
            const postId = req.body.postId;
            const userId = req.session.user[0].ID;
            // 首先判断是否有权限删除
            const postBasic = await PostModel.getBasic(postId);
            if (postBasic[0].user_id === userId) { // 如果楼主是当前登录用户
                const row = await PostModel.deleteOne(postId);
                if ((<addToDbInter>row).affectedRows === 1) {
                    // 删除对应的回复
                    await ReplyModel.deleteAll(postId);
                    return {
                        state: true,
                        message: '删帖成功'
                    }
                } else {
                    return {
                        state: false,
                        message: '删帖失败'
                    }
                }
            } else {
                return {
                    state: false,
                    message: '权限不够啊兄弟'
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
        const themeId = req.body.themeId;
        const pageId = parseInt(req.body.pageId);
        const pageSize = parseInt(req.body.pageSize);
        const start = (pageId - 1) * pageSize;
        const end = pageId * pageSize;
        const twoRow = await PostModel.getList(themeId, start, end);
        const count = (<twoRowInter>twoRow).all.length;
        const list = (<twoRowInter>twoRow).need;
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
    // 获取推荐列表
    static async getPublish(req, res): Promise<returnValInter> {
        const pageId = parseInt(req.body.pageId);
        const pageSize = parseInt(req.body.pageSize);
        const start = (pageId - 1) * pageSize;
        const end = pageId * pageSize;
        const twoRow = await PostModel.getPublish(start, end);
        const count = (<twoRowInter>twoRow).all.length;
        const list = (<twoRowInter>twoRow).need;
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

    // 获取当前用户发布的
    static async getMine(req, res): Promise<returnValInter> {
        if (req.session.user && req.session.user[0]) {
            const userId = req.session.user[0].ID;
            const pageId = parseInt(req.body.pageId);
            const pageSize = parseInt(req.body.pageSize);
            const start = (pageId - 1) * pageSize;
            const end = pageId * pageSize;
            const twoRow = await PostModel.getMine(userId, start, end);
            const count = (<twoRowInter>twoRow).all.length;
            const list = (<twoRowInter>twoRow).need;
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
        } else {
            return {
                state: false,
                message: '请登录'
            }
        }
    }

    // 获取帖子详情
    static async getDetails(req, res): Promise<returnValInter> {
        const postId = req.body.postId;
        const row = await PostModel.getDetails(postId);
        return {
            state: true,
            message: '获取成功',
            data: row[0]
        }
    }
    // 帖子基本信息
    static async getBasic(postId): Promise<returnValInter> {
        const row = await PostModel.getBasic(postId);
        return {
            state: true,
            message: '获取成功',
            data: row[0]
        }
    }
    // 回复数+1
    static async replyCountAddOne(postId) {
        const row = await PostModel.replyCountAddOne(postId);
        if ((<addToDbInter>row).affectedRows === 1) {
            return true;
        } else {
            return false;
        }
    }
}