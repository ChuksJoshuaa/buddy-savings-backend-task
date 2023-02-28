"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middleware/auth"));
const buddy_1 = require("../controllers/buddy");
const router = (0, express_1.default)();
router.get("/", buddy_1.getAllBuddies);
router.get("/user", auth_1.default, buddy_1.getBuddySavingBySingleUser);
router.get("/:id", buddy_1.getSingleBuddySaving);
router.post("/create", auth_1.default, buddy_1.createBuddy);
router.post("/send-grid", auth_1.default, buddy_1.sendGridEmail);
router.patch("/update/:id", auth_1.default, buddy_1.updateBuddySaving);
router.patch("/:id/accept-invite", auth_1.default, buddy_1.AcceptInviteToBuddySaving);
router.delete("/:id", auth_1.default, buddy_1.deleteSingleBuddySaving);
exports.default = router;
//# sourceMappingURL=buddy.js.map