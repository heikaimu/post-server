import ThemeModel from '../models/theme.model';

interface returnValInter {
    state: boolean;
    message: string;
    data?: any;
}
interface addToDbInter {
    affectedRows: number;
}
interface themeInter {
    ID: number;
    user_id: number;
    theme_id: number;
    level: number;
}
interface signInter {
    ID: number;
    theme_id: number;
    user_id: number;
    add_time: string;
}
export default class ThemeController {
    // 新增主题
    static async addOne(req, res): Promise<returnValInter> {
        if (req.session.user && req.session.user[0]) {
            if (req.body.name && req.body.headThumb) {
                const data = {
                    name: req.body.name,
                    head_thumb: req.body.headThumb,
                    creator_id: req.session.user[0].ID,
                    administrator: ''
                }
                const row = await ThemeModel.addOne(data);
                if ((<addToDbInter>row).affectedRows === 1) {
                    return {
                        state: true,
                        message: '新建成功',
                        data: row
                    }
                } else {
                    return {
                        state: false,
                        message: '新建失败'
                    }
                }
            } else {
                return {
                    state: false,
                    message: '主题名字和封面均不能为空'
                }
            }
        } else {
            return {
                state: false,
                message: '请登录'
            }
        }
    }
    // 删除主题
    static async deleteOne(req, res): Promise<returnValInter> {
        if (req.session.user && req.session.user[0]) {
            if (req.body.themeId) {
                const row = await ThemeModel.deleteOne(req.body.themeId);
                if ((<themeInter[]>row).length !== 0) {
                    return {
                        state: true,
                        message: '删除主题成功'
                    }
                } else {
                    return {
                        state: false,
                        message: '你还未关注，不能取消关注'
                    }
                }
            } else {
                return {
                    state: false,
                    message: '主题id不能为空'
                }
            }
        } else {
            return {
                state: false,
                message: '请登录'
            }
        }
    }
    // 获取主题列表
    static async getList(req, res): Promise<returnValInter> {
        const keyword = req.body.keyword;
        const row = await ThemeModel.getListByKeyword(keyword);
        return {
            state: true,
            message: '获取成功',
            data: row
        }
    }
    // 获取主题详情
    static async getDetails(req, res): Promise<returnValInter> {
        if (req.session.user && req.session.user[0]) {
            const themeId = req.body.themeId;
            const userId = req.session.user[0].ID;
            const row = await ThemeModel.getDetails(themeId, userId);
            return {
                state: true,
                message: '获取成功',
                data: row[0]
            }
        } else {
            const themeId = req.body.themeId;
            const row = await ThemeModel.getDetailsOutLine(themeId);
            return {
                state: true,
                message: '获取成功',
                data: row[0]
            }
        }
    }
    // 关注的主题列表
    static async focusList(req, res): Promise<returnValInter> {
        if (req.session.user && req.session.user[0]) {
            const userId = req.session.user[0].ID;
            const row = await ThemeModel.focusList(userId);
            return {
                state: true,
                message: '获取成功',
                data: row
            }
        } else {
            return {
                state: false,
                message: '请登录'
            }
        }
    }
    // 关注主题
    static async focus(req, res): Promise<returnValInter> {
        if (req.session.user && req.session.user[0]) {
            if (req.body.themeId) {
                const themeId = req.body.themeId;
                const userId = req.session.user[0].ID;
                const row = await ThemeModel.isFocus(themeId, userId);
                if ((<themeInter[]>row).length === 0) {
                    const row = await ThemeModel.focus(themeId, userId)
                    if ((<addToDbInter>row).affectedRows === 1) {
                        return {
                            state: true,
                            message: '关注成功'
                        }
                    } else {
                        return {
                            state: false,
                            message: '关注失败'
                        }
                    }
                } else {
                    return {
                        state: false,
                        message: '请勿重复关注'
                    }
                }
            } else {
                return {
                    state: false,
                    message: '贴吧不能为空'
                }
            }
        } else {
            return {
                state: false,
                message: '请登录'
            }
        }
    }
    // 取消关注主题
    static async unFocus(req, res): Promise<returnValInter> {
        if (req.session.user && req.session.user[0]) {
            if (req.body.themeId) {
                const themeId = req.body.themeId;
                const userId = req.session.user[0].ID;
                const row = await ThemeModel.isFocus(themeId, userId);
                if ((<themeInter[]>row).length !== 0) {
                    const row = await ThemeModel.unFocus(themeId, userId)
                    if ((<addToDbInter>row).affectedRows === 1) {
                        const isDel = await ThemeModel.deleteSign(themeId, userId);
                        if (isDel) {
                            return {
                                state: true,
                                message: '取消关注成功'
                            }
                        } else {
                            return {
                                state: false,
                                message: '取消关注失败'
                            }
                        }
                    } else {
                        return {
                            state: false,
                            message: '取消关注失败'
                        }
                    }
                } else {
                    return {
                        state: false,
                        message: '你还未关注，不能取消关注'
                    }
                }
            } else {
                return {
                    state: false,
                    message: '贴吧不能为空'
                }
            }
        } else {
            return {
                state: false,
                message: '请登录'
            }
        }
    }
    // 签到
    static async signIn(req, res) {
        const themeId = req.body.themeId;
        if (req.session.user && req.session.user[0]) {
            const userId = req.session.user[0].ID;
            const row = await ThemeModel.myFocus(themeId, userId);
            if ((<themeInter[]>row).length !== 0) {
                const row = await ThemeModel.isSignIn(themeId, userId);
                if ((<signInter[]>row).length === 0) {
                    const row = await ThemeModel.signIn(themeId, userId);
                    if ((<addToDbInter>row).affectedRows === 1) {
                        const row = await ThemeModel.levelUp(themeId, userId);
                        if ((<addToDbInter>row).affectedRows === 1) {
                            return {
                                state: true,
                                message: '签到成功，经验值+1'
                            }
                        } else {
                            return {
                                state: true,
                                message: '签到失败'
                            }
                        }
                    } else {
                        return {
                            state: false,
                            message: '签到失败'
                        }
                    }
                } else {
                    return {
                        state: false,
                        message: '今日已签到'
                    }
                }
            } else {
                return {
                    state: false,
                    message: '你还未关注'
                }
            }
        } else {
            return {
                state: false,
                message: '请登录'
            }
        }
    }

}