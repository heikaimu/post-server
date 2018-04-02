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
const user_model_1 = require("../models/user.model");
class UserController {
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body.account && req.body.password) {
                const data = {
                    account: req.body.account,
                    password: req.body.password
                };
                const r = yield user_model_1.default.login(data);
                return r;
            }
            else {
                return '账户及密码均不能为空';
            }
        });
    }
}
exports.default = UserController;
// /**
//  * 登录
//  * @param req
//  * @param res
//  */
// /**
//  * 注册
//  * @param req
//  * @param res
//  */
// export const register = (req: Request, res: Response) => {
//     res.send('我是注册');
// }
//
// /**
//  * 注销
//  * @param req
//  * @param res
//  */
// export const logout = (req: Request, res: Response) => {
//     res.send('我是注销');
// }
//
// /**
//  * 修改密码
//  * @param req
//  * @param res
//  */
// export const updatePassword = (req: Request, res: Response) => {
//     res.send('我是修改密码');
// }
//
// /**
//  * 编辑用户
//  * @param req
//  * @param res
//  */
// export const updateUser = (req: Request, res: Response) => {
//     res.send('我是编辑用户');
// }
