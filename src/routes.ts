import UserController from './controllers/user.controller';
import ThemeController from './controllers/theme.controller';
import PostController from './controllers/post.controller';
import ReplyController from './controllers/reply.controller';
import BackgroundController from './controllers/background.controller';
import QiniuController from './controllers/qiniu.controller';
import SubReplyController from './controllers/sub-reply.controller';
import NewMessageController from './controllers/new-message.controller';

export const route = (app) => {
    /**
     * 用户登录
     * params: {
     *  account: string
     *  password: string
     * }
     * api: /user/login
     */
    app.post('/user/login', async (req, res) => {
        res.send(await UserController.login(req, res));
    });
    /**
     * 判断是否注册
     * params: {
     *  account: string
     * }
     * api: /user/chargeIsRegister
     */
    app.post('/user/chargeIsRegister', async (req, res) => {
        res.send(await UserController.chargeIsRegister(req, res));
    });
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
    app.post('/user/register', async (req, res) => {
        res.send(await UserController.register(req, res));
    });
    /**
     * 注销
     * params: {}
     * api: /user/logout
     */
    app.post('/user/logout', async (req, res) => {
        res.send(await UserController.logout(req, res));
    });
    /**
     * 获取用户信息
     * params: {
     *  uid: number(如果没有该参数获取当前登录的用户信息，有则获取对应的用户信息)
     * }
     * api: /user/getUser
     */
    app.post('/user/getUser', async (req, res) => {
        res.send(await UserController.getUser(req, res));
    });
    /**
     * 修改密码
     * params: {
     *  oldPwd: string
     *  newPwd: string
     * }
     * api: /user/updatePassword
     */
    app.post('/user/updatePassword', async (req, res) => {
        res.send(await UserController.updatePassword(req, res));
    });
    /**
     * 修改头像
     * params: {
     *  headhumb: string
     * }
     * api: /user/updateHeadThumb
     */
    app.post('/user/updateHeadThumb', async (req, res) => {
        res.send(await UserController.updateHeadThumb(req, res));
    });
    /**
     * 修改昵称
     * params: {
     *  nickname: string
     * }
     * api: /user/updateNickname
     */
    app.post('/user/updateNickname', async (req, res) => {
        res.send(await UserController.updateNickname(req, res));
    });
    /**
     * 修改背景
     * params: {
     *  background: string
     * }
     * api: /user/updateBackground
     */
    app.post('/user/updateBackground', async (req, res) => {
        res.send(await UserController.updateBackground(req, res));
    });


    /**
     * 主题：新增
     * params: {
     *  name: string
     *  headThumb: string
     * }
     * api: /theme/addOne
     */
    app.post('/theme/addOne', async (req, res) => {
        res.send(await ThemeController.addOne(req, res));
    });
    /**
     * 主题：删除
     * params: {
     *  themeId: number
     * }
     * api: /theme/deleteOne
     */
    app.post('/theme/deleteOne', async (req, res) => {
        res.send(await ThemeController.deleteOne(req, res));
    });
    /**
     * 主题：列表
     * params: {
     *  keyword: string
     * }
     * api: /theme/getList
     */
    app.post('/theme/getList', async (req, res) => {
        res.send(await ThemeController.getList(req, res));
    });
    /**
     * 主题：详情
     * params: {
     *  themeId: number
     * }
     * api: /theme/getDetails
     */
    app.post('/theme/getDetails', async (req, res) => {
        res.send(await ThemeController.getDetails(req, res));
    });
    /**
     * 主题：我的关注
     * params: {}
     * api: /theme/focusList
     */
    app.post('/theme/focusList', async (req, res) => {
        res.send(await ThemeController.focusList(req, res));
    });
    /**
     * 主题：关注
     * params: {
     *  themeId: number
     * }
     * api: /theme/focus
     */
    app.post('/theme/focus', async (req, res) => {
        res.send(await ThemeController.focus(req, res));
    });
    /**
     * 主题：取消关注
     * params: {
     *  themeId: number
     * }
     * api: /theme/unFocus
     */
    app.post('/theme/unFocus', async (req, res) => {
        res.send(await ThemeController.unFocus(req, res));
    });
    /**
     * 主题：签到
     * params: {
     *  themeId: number
     * }
     * api: /theme/signIn
     */
    app.post('/theme/signIn', async (req, res) => {
        res.send(await ThemeController.signIn(req, res));
    });

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
    app.post('/post/addOne', async (req, res) => {
        res.send(await PostController.addOne(req, res));
    });
    /**
     * 帖子：删除
     * params: {
     *  postId: number
     * }
     * api: /post/deleteOne
     */
    app.post('/post/deleteOne', async (req, res) => {
        res.send(await PostController.deleteOne(req, res));
    });
    /**
     * 帖子：列表
     * params: {
     *  themeId: number
     *  pageId: number
     *  pageSize: number
     * }
     * api: /post/getList
     */
    app.post('/post/getList', async (req, res) => {
        res.send(await PostController.getList(req, res));
    });
    /**
     * 帖子：推荐列表
     * params: {
     *  pageId: number
     *  pageSize: number
     * }
     * api: /post/getPublish
     */
    app.post('/post/getPublish', async (req, res) => {
        res.send(await PostController.getPublish(req, res));
    });
    /**
     * 帖子：当前用户发布的
     * params: {
     *  pageId: number
     *  pageSize: number
     * }
     * api: /post/getMine
     */
    app.post('/post/getMine', async (req, res) => {
        res.send(await PostController.getMine(req, res));
    });
    /**
     * 帖子：获取详情
     * params: {
     *  postId: number
     * }
     * api: /post/getDetails
     */
    app.post('/post/getDetails', async (req, res) => {
        res.send(await PostController.getDetails(req, res));
    });

    /**
     * 回复：新增
     * params: {
     *  postId: number
     *  content: string
     *  imgList: string
     * }
     * api: /reply/addOne
     */
    app.post('/reply/addOne', async (req, res) => {
        res.send(await ReplyController.addOne(req, res));
    });
    /**
     * 回复：列表
     * params: {
     *  postId: number
     *  pageId: number
     *  pageSize: number
     * }
     * api: /reply/getList
     */
    app.post('/reply/getList', async (req, res) => {
        res.send(await ReplyController.getList(req, res));
    });
    /**
     * 回复：删除
     * params: {
     *  replyId: number
     * }
     * api: /reply/deleteOne
     */
    app.post('/reply/deleteOne', async (req, res) => {
        res.send(await ReplyController.deleteOne(req, res));
    });
    /**
     * 回复：获取单个详情
     * params: {
     *  replyId: number
     * }
     * api: /reply/getDetails
     */
    app.post('/reply/getDetails', async (req, res) => {
        res.send(await ReplyController.getDetails(req, res));
    });

    /**
     * 二级回复：新增
     * params: {
     *  postId: number
     *  replyId: number
     *  content: string
     * }
     * api: /sub_reply/addOne
     */
    app.post('/sub_reply/addOne', async (req, res) => {
        res.send(await SubReplyController.addOne(req, res));
    });
    /**
     * 二级回复：列表
     * params: {
     *  replyId: number
     * }
     * api: /sub_reply/getList
     */
    app.post('/sub_reply/getList', async (req, res) => {
        res.send(await SubReplyController.getList(req, res));
    });

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
    app.post('/background/addOne', async (req, res) => {
        res.send(await BackgroundController.addOne(req, res));
    });
    /**
     * 背景：删除
     * params: {
     *  backgroundId: number
     * }
     * api: /background/deleteOne
     */
    app.post('/background/deleteOne', async (req, res) => {
        res.send(await BackgroundController.deleteOne(req, res));
    });
    /**
     * 背景：列表
     * params: {
     *  type: string
     * }
     * api: /background/getList
     */
    app.post('/background/getList', async (req, res) => {
        res.send(await BackgroundController.getList(req, res));
    });
    /**
     * 背景：详情
     * params: {
     *  backgroundId: number
     * }
     * api: /background/getDetails
     */
    app.post('/background/getDetails', async (req, res) => {
        res.send(await BackgroundController.getDetails(req, res));
    });
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
    app.post('/background/editOne', async (req, res) => {
        res.send(await BackgroundController.editOne(req, res));
    });
    /**
     * 背景：显示
     * params: {
     *  backgroundId: number
     *  show: boolean
     * }
     * api: /background/setShow
     */
    app.post('/background/setShow', async (req, res) => {
        res.send(await BackgroundController.setShow(req, res));
    });
    /**
     * 背景：获取显示的那个
     * params: {
     *  type: string
     * }
     * api: /background/getShowOne
     */
    app.post('/background/getShowOne', async (req, res) => {
        res.send(await BackgroundController.getShowOne(req, res));
    });
    /**
     * 七牛云token
     * api: /qiniu/getToken
     */
    app.post('/qiniu/getToken', async (req, res) => {
        res.send(await QiniuController.getToken(req, res));
    });

    /**
     * 未读消息: 列表
     * api: /new_message/getList
     */
    app.post('/new_message/getList', async (req, res) => {
        res.send(await NewMessageController.getList(req, res));
    });
    /**
     * 未读消息: 已阅
     * params: {
     *  messageId: number
     * }
     * api: /new_message/deleteOne
     */
    app.post('/new_message/deleteOne', async (req, res) => {
        res.send(await NewMessageController.deleteOne(req, res));
    });

}
