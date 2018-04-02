// 加密模块
import * as crypto from 'crypto';

export const md5 = (str) => {
    let  md5sum = crypto.createHash('md5');
    md5sum.update(str);
    str = md5sum.digest('hex');
    return str;
}