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
const background_model_1 = require("../models/background.model");
class BackgroundController {
    // 新增
    static addOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = req.body.url;
            const desc = req.body.desc;
            const link = req.body.link;
            const show = false;
            const type = req.body.type;
            if (url && desc && type) {
                const row = yield background_model_1.default.addOne(url, desc, type, show, link);
                if (row.affectedRows !== 0) {
                    return {
                        state: true,
                        message: '添加成功'
                    };
                }
                else {
                    return {
                        state: false,
                        message: '添加失败'
                    };
                }
            }
            else {
                return {
                    state: false,
                    message: '必要的信息不能为空'
                };
            }
        });
    }
    // 获取列表
    static getList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const type = req.body.type;
            const row = yield background_model_1.default.getList(type);
            return {
                state: true,
                message: '获取成功',
                data: {
                    list: row
                }
            };
        });
    }
    // 获取当前推送的
    static getShowOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const type = req.body.type;
            const row = yield background_model_1.default.getShowOne(type);
            if (row.length !== 0) {
                return {
                    state: true,
                    message: '获取成功',
                    data: row[0]
                };
            }
            else {
                return {
                    state: false,
                    message: '获取失败，当前无推送数据'
                };
            }
        });
    }
    // 获取单个
    static getDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.body.backgroundId;
            const row = yield background_model_1.default.getBasic(id);
            if (row.length !== 0) {
                return {
                    state: true,
                    message: '获取成功',
                    data: row[0]
                };
            }
            else {
                return {
                    state: false,
                    message: '获取失败，没有该条数据'
                };
            }
        });
    }
    // 删除
    static deleteOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.body.backgroundId;
            const row = yield background_model_1.default.deleteOne(id);
            if (row.affectedRows !== 0) {
                return {
                    state: true,
                    message: '删除成功'
                };
            }
            else {
                return {
                    state: false,
                    message: '删除失败'
                };
            }
        });
    }
    // 编辑
    static editOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.body.backgroundId;
            const url = req.body.url;
            const desc = req.body.desc;
            const link = req.body.link;
            const type = req.body.type;
            const row = yield background_model_1.default.editOne(id, url, desc, link, type);
            if (row.affectedRows !== 0) {
                return {
                    state: true,
                    message: '编辑成功'
                };
            }
            else {
                return {
                    state: false,
                    message: '编辑失败'
                };
            }
        });
    }
    // 设置显示与否
    static setShow(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.body.backgroundId;
            const show = req.body.show;
            const row = yield background_model_1.default.isShow(id, show);
            if (row.affectedRows !== 0) {
                return {
                    state: true,
                    message: '修改成功'
                };
            }
            else {
                return {
                    state: false,
                    message: '修改失败'
                };
            }
        });
    }
}
exports.default = BackgroundController;
