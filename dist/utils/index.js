"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToken = exports.getUserByEmail = exports.comparePassword = exports.hashedPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const hashedPassword = (password) => {
    const hashed = bcryptjs_1.default.hash(password, 12);
    return hashed;
};
exports.hashedPassword = hashedPassword;
const comparePassword = (password, userPassword) => {
    const doesthePasswordMatch = bcryptjs_1.default.compare(password, userPassword);
    return doesthePasswordMatch;
};
exports.comparePassword = comparePassword;
const getUserByEmail = (data, email) => {
    return data.findOne({
        where: {
            email: email,
        },
    });
};
exports.getUserByEmail = getUserByEmail;
const getToken = (result) => {
    return jsonwebtoken_1.default.sign({ email: result.email, id: result.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME });
};
exports.getToken = getToken;
//# sourceMappingURL=index.js.map