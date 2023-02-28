"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpExceptions_1 = __importDefault(require("../exceptions/HttpExceptions"));
const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof HttpExceptions_1.default) {
        return res.status(err.status).json({ msg: err.message });
    }
    return res
        .status(500)
        .json({ msg: "Something went wrong, please try again" });
};
exports.default = errorHandlerMiddleware;
//# sourceMappingURL=error-handler.js.map