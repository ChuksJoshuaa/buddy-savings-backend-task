"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const router = (0, express_1.default)();
router.post("/register", user_1.signup);
router.post("/login", user_1.signin);
exports.default = router;
//# sourceMappingURL=user.js.map