"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.signup = void 0;
const user_1 = __importDefault(require("../models/user"));
const index_1 = require("../utils/index");
const user_2 = require("../transformers/user");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username, password, repeatPassword } = req.body;
    try {
        if (!username || !email || !password || !repeatPassword) {
            return res.status(404).json({ msg: "All fields are required" });
        }
        const oldUser = yield (0, index_1.getUserByEmail)(user_1.default, email);
        const hashed = yield (0, index_1.hashedPassword)(password);
        if (oldUser) {
            return res.status(404).json({ msg: "User already exist" });
        }
        if (password !== repeatPassword) {
            return res.status(400).json({ msg: "Password does not match" });
        }
        const result = yield user_1.default.create({
            username,
            email,
            password: hashed,
        });
        const token = (0, index_1.getToken)(result);
        if (!token) {
            return res.status(400).json({ msg: "Invalid token" });
        }
        res.status(200).json({ result: (0, user_2.userTransformer)(result), token });
    }
    catch (error) {
        res.status(404).json({ msg: error.msg });
    }
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            res
                .status(404)
                .json({ status: "ok", msg: "Please provide email and password" });
        }
        const oldUser = yield (0, index_1.getUserByEmail)(user_1.default, email);
        const isPasswordCorrect = yield (0, index_1.comparePassword)(password, oldUser.password);
        if (!oldUser) {
            return res.status(404).json({ msg: "User does not exist" });
        }
        if (!isPasswordCorrect) {
            return res.status(400).json({ msg: "Invalid Password" });
        }
        const token = (0, index_1.getToken)(oldUser);
        if (!token) {
            return res.status(400).json({ msg: "Invalid token" });
        }
        res.status(200).json({ result: (0, user_2.userTransformer)(oldUser), token });
    }
    catch (error) {
        res.status(404).json({ msg: error.msg });
    }
});
exports.signin = signin;
//# sourceMappingURL=user.js.map