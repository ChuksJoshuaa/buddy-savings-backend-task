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
require("reflect-metadata");
require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const not_found_1 = __importDefault(require("./middleware/not-found"));
const error_handler_1 = __importDefault(require("./middleware/error-handler"));
const user_1 = __importDefault(require("./routes/user"));
const buddy_1 = __importDefault(require("./routes/buddy"));
const user_2 = __importDefault(require("./models/user"));
const buddy_2 = __importDefault(require("./models/buddy"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json({ limit: "30mb" }));
app.use(body_parser_1.default.urlencoded({ limit: "30mb", extended: true }));
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use((0, helmet_1.default)());
app.set("trust proxy", 1);
app.use((0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
}));
app.get("/", (req, res) => {
    res.send("Api working perfectly");
});
app.use("/api/v1/user", user_1.default);
app.use("/api/v1/buddy", buddy_1.default);
app.use(not_found_1.default);
app.use(error_handler_1.default);
const port = process.env.PORT || 5000;
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        yield ((_a = user_2.default.sequelize) === null || _a === void 0 ? void 0 : _a.sync().then(() => {
            console.log("Drop and sync db.");
        }).catch((err) => console.log(err)));
        yield ((_b = buddy_2.default.sequelize) === null || _b === void 0 ? void 0 : _b.sync().then(() => {
            console.log("Drop and sync db.");
        }).catch((err) => console.log(err)));
        app.listen(port, () => console.log(`Server is listening on port ${port}`));
    }
    catch (error) {
        console.log(error);
    }
});
start();
exports.default = app;
//# sourceMappingURL=index.js.map