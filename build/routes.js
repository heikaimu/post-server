"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("./controllers/user.controller");
const theme_controller_1 = require("./controllers/theme.controller");
const post_controller_1 = require("./controllers/post.controller");
const reply_controller_1 = require("./controllers/reply.controller");
const background_controller_1 = require("./controllers/background.controller");
const qiniu_controller_1 = require("./controllers/qiniu.controller");
const sub_reply_controller_1 = require("./controllers/sub-reply.controller");
const new_message_controller_1 = require("./controllers/new-message.controller");
exports.route = (app) => {
    /**
     * 用户登录
     * params: {
     *  account: string
     *  password: string
     * }
     * api: /user/login
     */
    app.post('/user/login', (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.send(yield user_controller_1.default.login(req, res));
    }));
    /**
     * 判断是否注册
     * params: {
     *  account: string
     * }
     * api: /user/chargeIsRegister
     */
    app.post('/user/chargeIsRegister', (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.send(yield user_controller_1.default.chargeIsRegister(req, res));
    }));
    /**
     * 注册
     * params: {
     *  account: string
     *  password: string
     *  nickname: string
     *  gender: string(male, famale)
     * }
     * api: /user/register
     */
    app.post('/user/register', (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.send(yield user_controller_1.default.register(req, res));
    }));
    /**
     * 注销
     * params: {}
     * api: /user/logout
     */
    app.post('/user/logout', (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.send(yield user_controller_1.default.logout(req, res));
    }));
    /**
     * 获取用户信息
     * params: {
     *  uid: number(如果没有该参数获取当前登录的用户信息，有则获取对应的用户信息)
     * }
     * api: /user/getUser
     */
    app.post('/user/getUser', (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.send(yield user_controller_1.default.getUser(req, res));
    }));
    /**
     * 修改密码
     * params: {
     *  oldPwd: string
     *  newPwd: string
     * }
     * api: /user/updatePassword
     */
    app.post('/user/updatePassword', (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.send(yield user_controller_1.default.updatePassword(req, res));
    }));
    /**
     * 修改头像
     * params: {
     *  headhumb: string
     * }
     * api: /user/updateHeadThumb
     */
    app.post('/user/updateHeadThumb', (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.send(yield user_controller_1.default.updateHeadThumb(req, res));
    }));
    /**
     * 修改昵称
     * params: {
     *  nickname: string
     * }
     * api: /user/updateNickname
     */
    app.post('/user/updateNickname', (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.send(yield user_controller_1.default.updateNickname(req, res));
    }));
    /**
     * 修改背景
     * params: {
     *  background: string
     * }
     * api: /user/updateBackground
     */
    app.post('/user/updateBackground', (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.send(yield user_controller_1.default.updateBackground(req, res));
    }));
    /**
     * 主题：新增
     * params: {
     *  name: string
     *  headThumb: string
     * }
     * api: /theme/addOne
     */
    app.post('/theme/addOne', (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.send(yield theme_controller_1.default.addOne(req, res));
    }));
    /**
     * 主题：删除
     * params: {
     *  themeId: number
     * }
     * api: /theme/deleteOne
     */
    app.post('/theme/deleteOne', (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.send(yield theme_controller_1.default.deleteOne(req, res));
    }));
    /**
     * 主题：列表
     * params: {
     *  keyword: string
     * }
     * api: /theme/getList
     */
    app.post('/theme/getList', (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.send(yield theme_controller_1.default.getList(req, res));
    }));
    /**
     * 主题：详情
     * params: {
     *  themeId: number
     * }
     * api: /theme/getDetails
     */
    app.post('/theme/getDetails', (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.send(yield theme_controller_1.default.getDetails(req, res));
    }));
    /**
     * 主题：我的关注
     * params: {}
     * api: /theme/focusList
     */
    app.post('/theme/focusList', (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.send(yield theme_controller_1.default.focusList(req, res));
    }));
    /**
     * 主题：关注
     * params: {
     *  themeId: number
     * }
     * api: /theme/focus
     */
    app.post('/theme/focus', (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.send(yield theme_controller_1.default.focus(req, res));
    }));
    /**
     * 主题：取消关注
     * params: {
     *  themeId: number
     * }
     * api: /theme/unFocus
     */
    app.post('/theme/unFocus', (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.send(yield theme_controller_1.default.unFocus(req, res));
    }));
    /**
     * 主题：签到
     * params: {
     *  themeId: number
     * }
     * api: /theme/signIn
     */
    app.post('/theme/signIn', (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.send(yield theme_controller_1.default.signIn(req, res));
    }));
    /**
     * 帖子：新增
     * params: {
     *  themeId: number
     *  title: string
     *  content: string
     *  imgList: string
     * }
     * api: /post/addOne
     */
    app.post('/post/addOne', (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.send(yield post_controller_1.default.addOne(req, res));
    }));
    /**
     * 帖子：删除
     * params: {
     *  postId: number
     * }
     * api: /post/deleteOne
     */
    app.post('/post/deleteOne', (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.send(yield post_controller_1.default.deleteOne(req, res));
    }));
    /**
     * 帖子：列表
     * params: {
     *  themeId: number
     *  pageId: number
     *  pageSize: number
     * }
     * api: /post/getList
     */
    app.post('/post/getList', (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.send(yield post_controller_1.default.getList(req, res));
    }));
    /**
     * 帖子：推荐列表
     * params: {
     *  pageId: number
     *  pageSize: number
     * }
     * api: /post/getPublish
     */
    app.post('/post/getPublish', (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.send(yield post_controller_1.default.getPublish(req, res));
    }));
    /**
     * 帖子：当前用户发布的
     * params: {
     *  pageId: number
     *  pageSize: number
     * }
     * api: /post/getMine
     */
    app.post('/post/getMine', (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.send(yield post_controller_1.default.getMine(req, res));
    }));
    /**
     * 帖子：获取详情
     * params: {
     *  postId: number
     * }
     * api: /post/getDetails
     */
    app.post('/post/getDetails', (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.send(yield post_controller_1.default.getDetails(req, res));
    }));
    /**
     * 回复：新增
     * params: {
     *  postId: number
     *  content: string
     *  imgList: string
     * }
     * api: /reply/addOne
     */
    app.post('/reply/addOne', (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.send(yield reply_controller_1.default.addOne(req, res));
    }));
    /**
     * 回复：列表
     * params: {
     *  postId: number
     *  pageId: number
     *  pageSize: number
     * }
     * api: /reply/getList
     */
    app.post('/reply/getList', (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.send(yield reply_controller_1.default.getList(req, res));
    }));
    /**
     * 回复：删除
     * params: {
     *  replyId: number
     * }
     * api: /reply/deleteOne
     */
    app.post('/reply/deleteOne', (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.send(yield reply_controller_1.default.deleteOne(req, res));
    }));
    /**
     * 回复：获取单个详情
     * params: {
     *  replyId: number
     * }
     * api: /reply/getDetails
     */
    app.post('/reply/getDetails', (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.send(yield reply_controller_1.default.getDetails(req, res));
    }));
    /**
     * 二级回复：新增
     * params: {
     *  postId: number
     *  replyId: number
     *  content: string
     * }
     * api: /sub_reply/addOne
     */
    app.post('/sub_reply/addOne', (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.send(yield sub_reply_controller_1.default.addOne(req, res));
    }));
    /**
     * 二级回复：列表
     * params: {
     *  replyId: number
     * }
     * api: /sub_reply/getList
     */
    app.post('/sub_reply/getList', (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.send(yield sub_reply_controller_1.default.getList(req, res));
    }));
    /**
     * 背景：新增
     * params: {
     *  url: string
     *  desc: string
     *  link: string
     *  type: string
     * }
     * api: /background/addOne
     */
    app.post('/background/addOne', (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.send(yield background_controller_1.default.addOne(req, res));
    }));
    /**
     * 背景：删除
     * params: {
     *  backgroundId: number
     * }
     * api: /background/deleteOne
     */
    app.post('/background/deleteOne', (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.send(yield background_controller_1.default.deleteOne(req, res));
    }));
    /**
     * 背景：列表
     * params: {
     *  type: string
     * }
     * api: /background/getList
     */
    app.post('/background/getList', (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.send(yield background_controller_1.default.getList(req, res));
    }));
    /**
     * 背景：详情
     * params: {
     *  backgroundId: number
     * }
     * api: /background/getDetails
     */
    app.post('/background/getDetails', (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.send(yield background_controller_1.default.getDetails(req, res));
    }));
    /**
     * 背景：编辑
     * params: {
     *  backgroundId: number
     *  url: string
     *  desc: string
     *  link: string
     *  type: string
     * }
     * api: /background/editOne
     */
    app.post('/background/editOne', (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.send(yield background_controller_1.default.editOne(req, res));
    }));
    /**
     * 背景：显示
     * params: {
     *  backgroundId: number
     *  show: boolean
     * }
     * api: /background/setShow
     */
    app.post('/background/setShow', (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.send(yield background_controller_1.default.setShow(req, res));
    }));
    /**
     * 背景：获取显示的那个
     * params: {
     *  type: string
     * }
     * api: /background/getShowOne
     */
    app.post('/background/getShowOne', (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.send(yield background_controller_1.default.getShowOne(req, res));
    }));
    /**
     * 七牛云token
     * api: /qiniu/getToken
     */
    app.post('/qiniu/getToken', (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.send(yield qiniu_controller_1.default.getToken(req, res));
    }));
    /**
     * 未读消息: 列表
     * api: /new_message/getList
     */
    app.post('/new_message/getList', (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.send(yield new_message_controller_1.default.getList(req, res));
    }));
    /**
     * 未读消息: 已阅
     * params: {
     *  messageId: number
     * }
     * api: /new_message/deleteOne
     */
    app.post('/new_message/deleteOne', (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.send(yield new_message_controller_1.default.deleteOne(req, res));
    }));
};
