"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var reply_model_1 = require("../models/reply.model");
var post_controller_1 = require("./post.controller");
var ReplyController = /** @class */ (function () {
    function ReplyController() {
    }
    // 新增回复
    ReplyController.addOne = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var postId, userId, content, row, countAdd;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(req.session.user && req.session.user[0])) return [3 /*break*/, 2];
                        postId = parseInt(req.body.postId);
                        userId = parseInt(req.session.user[0].ID);
                        content = req.body.content;
                        return [4 /*yield*/, reply_model_1["default"].addOne(postId, userId, content)];
                    case 1:
                        row = _a.sent();
                        if (row.affectedRows === 1) {
                            countAdd = post_controller_1["default"].replyCountAddOne(postId);
                            if (countAdd) {
                                return [2 /*return*/, {
                                        state: true,
                                        message: '回复成功'
                                    }];
                            }
                            else {
                                return [2 /*return*/, {
                                        state: false,
                                        message: '回复失败'
                                    }];
                            }
                        }
                        else {
                            return [2 /*return*/, {
                                    state: false,
                                    message: '回复失败'
                                }];
                        }
                        return [3 /*break*/, 3];
                    case 2: return [2 /*return*/, {
                            state: false,
                            message: '请登录'
                        }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // 删除回复
    ReplyController.deleteOne = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var replyId, userId, replyDetails, postId, postBasic, row;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(req.session.user && req.session.user[0])) return [3 /*break*/, 7];
                        replyId = req.body.replyId;
                        userId = req.session.user[0].ID;
                        return [4 /*yield*/, reply_model_1["default"].getDetails(replyId)];
                    case 1:
                        replyDetails = _a.sent();
                        if (!(replyDetails.length == 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, {
                                state: true,
                                message: '该数据不存在'
                            }];
                    case 2:
                        postId = replyDetails[0].post_id;
                        return [4 /*yield*/, post_controller_1["default"].getBasic(postId)];
                    case 3:
                        postBasic = _a.sent();
                        if (!(replyDetails[0].user_id === userId || postBasic.data.user_id === userId)) return [3 /*break*/, 5];
                        return [4 /*yield*/, reply_model_1["default"].deleteOne(replyId)];
                    case 4:
                        row = _a.sent();
                        if (row.affectedRows === 1) {
                            return [2 /*return*/, {
                                    state: true,
                                    message: '删除成功'
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    state: false,
                                    message: '删除失败'
                                }];
                        }
                        return [3 /*break*/, 6];
                    case 5: return [2 /*return*/, {
                            state: false,
                            message: '你没有权限这么做'
                        }];
                    case 6: return [3 /*break*/, 8];
                    case 7: return [2 /*return*/, {
                            state: false,
                            message: '请登录'
                        }];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    // 获取回复列表
    ReplyController.getList = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var postId, pageId, pageSize, start, end, twoRow, count, list, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postId = req.body.postId;
                        pageId = parseInt(req.body.pageId);
                        pageSize = parseInt(req.body.pageSize);
                        start = (pageId - 1) * pageSize;
                        end = pageId * pageSize;
                        return [4 /*yield*/, reply_model_1["default"].getList(postId, start, end)];
                    case 1:
                        twoRow = _a.sent();
                        count = twoRow.all.length;
                        list = twoRow.need;
                        data = {
                            count: count,
                            list: list,
                            pageId: pageId,
                            pageSize: pageSize
                        };
                        return [2 /*return*/, {
                                state: true,
                                message: '获取成功',
                                data: data
                            }];
                }
            });
        });
    };
    return ReplyController;
}());
exports["default"] = ReplyController;
