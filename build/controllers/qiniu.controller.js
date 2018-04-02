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
const qiniu = require("qiniu");
class QiniuController {
    static getToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const accessKey = 'Kve1h7nvbNMxeP-jnW490r71erSiEKORr0674zXY';
            const secretKey = 'ua3oDsPLLnrga7Hu8z7taoXKgnb4CydRMwq2t0aV';
            const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
            const bucket = 'post-bar';
            const options = {
                scope: bucket,
            };
            const putPolicy = new qiniu.rs.PutPolicy(options);
            const qiniuToken = putPolicy.uploadToken(mac);
            return {
                state: true,
                message: '获取成功',
                token: qiniuToken
            };
        });
    }
}
exports.default = QiniuController;
