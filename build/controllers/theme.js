"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 获取主题列表
 * @param req
 * @param res
 */
exports.getList = (req, res) => {
    res.send('获取主题列表');
};
/**
 * 创建主题
 * @param req
 * @param res
 */
exports.addOne = (req, res) => {
    res.send('创建主题');
};
/**
 * 删除主题
 * @param req
 * @param res
 */
exports.deleteOne = (req, res) => {
    res.send('删除主题');
};
/**
 * 收藏主题
 * @param req
 * @param res
 */
exports.collect = (req, res) => {
    res.send('收藏主题');
};
/**
 * 取消收藏主题
 * @param req
 * @param res
 */
exports.uncollect = (req, res) => {
    res.send('取消收藏主题');
};
