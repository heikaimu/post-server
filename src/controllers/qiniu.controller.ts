import * as qiniu from 'qiniu';

export default class QiniuController {
    static async getToken(req, res) {
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
        }
    }
}