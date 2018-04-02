import UserModel from '../models/user.model';
import { md5 } from '../controllers/libs/secret';

interface addToDbInter {
    affectedRows: number
}
interface userRowInter {
    id: number,
    account: string,
    gender: string,
    head_thumb: string,
    nickname: string
}
interface returnValInter {
    state: boolean;
    message: string;
    data?: any;
}
export default class UserController {
    // 登录
    static async login(req, res): Promise<returnValInter> {
        if (req.body.account && req.body.password) {
            const data = {
                account: req.body.account,
                password: req.body.password
            }
            const row = await UserModel.login(data);
            if ((<userRowInter[]>row).length === 0) {
                return {
                    state: false,
                    message: '账户或者密码错误'
                }
            } else {
                req.session.user = row; // 保存session
                return {
                    state: true,
                    message: '登录成功'
            }
            }
        } else {
            return {
                state: false,
                message: '账户及密码不能为空'
            }
        }
    }
    // 注销
    static async logout(req, res): Promise<returnValInter> {
        req.session.user = {};
        return {
            state: true,
            message: '注销成功'
        }
    }
    // 获取某id的用户信息（不带id获取当前登录用户，带id获取对应id的用户信息）
    static async getUser(req, res): Promise<returnValInter>  {
        if (req.body.uid) {
            return {
                state: true,
                message: '获取成功',
                data: '这是别的用户信息'
            }
        } else {
            if (req.session.user && req.session.user[0]) {
                let userIfo = JSON.parse(JSON.stringify(req.session.user[0]));
                delete userIfo.password;
                return {
                    state: true,
                    message: '获取成功',
                    data: userIfo
                }
            } else {
                return {
                    state: false,
                    message: '请登录'
                }
            }
        }
    }
    // 注册
    static async register(req, res): Promise<returnValInter>  {
        if (req.body.account && req.body.password && req.body.nickname && req.body.gender) {
            const data = {
                account: req.body.account,
                password: req.body.password,
                nickname: req.body.nickname,
                gender: req.body.gender
            }
            const row = await UserModel.register(data);
            if ((<addToDbInter>row).affectedRows === 1) {
                return {
                    state: true,
                    message: '注册成功'
                }
            } else {
                return {
                    state: false,
                    message: '注册失败'
                }
            }
        } else {
            return {
                state: false,
                message: '内容不能有空'
            }
        }
    }
    // 判断是否注册
    static async chargeIsRegister(req, res): Promise<returnValInter>  {
        const data = {
            account: req.body.account
        }
        const row = await UserModel.chargeIsRegister(data);
        if ((<userRowInter[]>row).length !== 0) {
            return {
                state: false,
                message: '账户已经存在'
            }
        } else {
            return {
                state: true,
                message: '可以使用'
        }
        }
    }
    // 修改密码
    static async updatePassword(req, res): Promise<returnValInter> {
        if (req.body.oldPwd && req.body.newPwd) {
            if (req.session.user && req.session.user[0]) {
                if (req.session.user[0].password === md5(req.body.oldPwd)) {
                    const userId = req.session.user[0].ID;
                    const password = md5(req.body.newPwd);
                    const row = await UserModel.updatePassword(password, userId);
                    if ((<addToDbInter>row).affectedRows === 1) {
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
                } else {
                    return {
                        state: false,
                        message: '旧密码错误'
                    }
                }
            } else {
                return {
                    state: false,
                    message: '请先登录'
                }
            }
        } else {
            return {
                state: false,
                message: '新旧密码均必填'
            }
        }
    }
    // 修改头像
    static async updateHeadThumb(req, res): Promise<returnValInter>   {
        if (req.session.user && req.session.user[0]) {
            const userId = req.session.user[0].ID;
            const headThumb = req.body.headThumb;
            const row = await UserModel.updateHeadThumb(headThumb, userId);
            if ((<addToDbInter>row).affectedRows === 1) {
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
        } else {
            return {
                state: false,
                message: '请先登录'
            }
        }
    }
    // 修改昵称
    static async updateNickname(req, res): Promise<returnValInter>   {
        if (req.session.user && req.session.user[0]) {
            const userId = req.session.user[0].ID;
            const nickname = req.body.nickname;
            const row = await UserModel.updateNickname(nickname, userId);
            if ((<addToDbInter>row).affectedRows === 1) {
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
        } else {
            return {
                state: false,
                message: '请先登录'
            }
        }
    }
    // 修改背景
    static async updateBackground(req, res): Promise<returnValInter>   {
        if (req.session.user && req.session.user[0]) {
            const userId = req.session.user[0].ID;
            const background = req.body.background;
            const row = await UserModel.updateBackground(background, userId);
            if ((<addToDbInter>row).affectedRows === 1) {
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
        } else {
            return {
                state: false,
                message: '请先登录'
            }
        }
    }
}

