"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 获取帖子列表
 * @param req
 * @param res
 */
exports.getList = (req, res) => {
    res.send('获取帖子列表');
};
/**
 * 创建帖子
 * @param req
 * @param res
 */
exports.addOne = (req, res) => {
    res.send('创建帖子');
};
/**
 * 删除帖子
 * @param req
 * @param res
 */
exports.deleteOne = (req, res) => {
    res.send('删除帖子');
};
