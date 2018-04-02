"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
require();
const apiRouter = express.Router();
apiRouter
    .use('/login', loginRouter);
exports.default = apiRouter;
