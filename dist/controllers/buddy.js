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
exports.AcceptInviteToBuddySaving = exports.deleteSingleBuddySaving = exports.updateBuddySaving = exports.getSingleBuddySaving = exports.getBuddySavingBySingleUser = exports.getAllBuddies = exports.createBuddy = void 0;
const buddy_1 = __importDefault(require("../models/buddy"));
const user_1 = __importDefault(require("../models/user"));
const buddy_2 = require("../transformers/buddy");
const createBuddy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const buddy = req.body;
    const { title, buddies, buddiesTarget, savingMethod, savingFrequency, savingAmount, startSaving, endSaving, savingDuration, buddiesRelationship, } = buddy;
    try {
        if (title === "" ||
            buddies === "" ||
            buddiesTarget === "" ||
            savingMethod === "" ||
            savingFrequency === "" ||
            savingAmount === "" ||
            startSaving === "" ||
            endSaving === "" ||
            savingDuration === "" ||
            buddiesRelationship === "") {
            return res.status(404).json({ msg: "All fields are required" });
        }
        else {
            let newId = req.user.userId;
            yield buddy_1.default.create(Object.assign(Object.assign({}, buddy), { creator: newId }))
                .then((data) => {
                res.status(201).json({ data: (0, buddy_2.buddyTransformer)(data) });
            })
                .catch((err) => {
                res.status(409).json({ msg: err.message });
            });
        }
    }
    catch (error) {
        res.status(409).json({ msg: error.msg });
    }
});
exports.createBuddy = createBuddy;
const getAllBuddies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield buddy_1.default.findAll()
            .then((data) => {
            res.status(200).json({ data });
        })
            .catch((err) => {
            res.status(404).json({ msg: err.message });
        });
    }
    catch (error) {
        res.status(404).json({ msg: error.msg });
    }
});
exports.getAllBuddies = getAllBuddies;
const getBuddySavingBySingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userId = req.user.userId;
        yield buddy_1.default.findAll({
            where: {
                creator: userId,
            },
        })
            .then((data) => {
            res.status(200).json({ data });
        })
            .catch((err) => {
            res.status(404).json({ msg: err.message });
        });
    }
    catch (error) {
        res.status(404).json({ msg: error.msg });
    }
});
exports.getBuddySavingBySingleUser = getBuddySavingBySingleUser;
const getSingleBuddySaving = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield buddy_1.default.findOne({
            where: {
                id: id,
            },
        })
            .then((data) => {
            res
                .status(200)
                .json({ data: (0, buddy_2.buddyTransformer)(data) });
        })
            .catch((err) => {
            res.status(404).json({ msg: err.message });
        });
    }
    catch (error) {
        res.status(404).json({ msg: error.msg });
    }
});
exports.getSingleBuddySaving = getSingleBuddySaving;
const updateBuddySaving = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const buddy = req.body;
    const { title, buddies, buddiesTarget, savingMethod, savingFrequency, savingAmount, startSaving, endSaving, savingDuration, buddiesRelationship, } = buddy;
    if (title === "" ||
        buddies === "" ||
        buddiesTarget === "" ||
        savingMethod === "" ||
        savingFrequency === "" ||
        savingAmount === "" ||
        startSaving === "" ||
        endSaving === "" ||
        savingDuration === "" ||
        buddiesRelationship === "") {
        return res.status(404).json({ msg: "All fields are required" });
    }
    try {
        yield buddy_1.default.update({
            title,
            buddies,
            buddiesTarget,
            savingMethod,
            savingFrequency,
            savingAmount,
            startSaving,
            endSaving,
            savingDuration,
            buddiesRelationship,
        }, { where: { id: id } })
            .then(() => {
            return buddy_1.default.findOne({ where: { id: id } });
        })
            .then((data) => {
            res
                .status(200)
                .json({ data: (0, buddy_2.buddyTransformer)(data) });
        })
            .catch((err) => {
            res.status(404).json({ msg: err.message });
        });
    }
    catch (error) {
        res.status(404).json({ msg: error.msg });
    }
});
exports.updateBuddySaving = updateBuddySaving;
const deleteSingleBuddySaving = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield buddy_1.default.destroy({
            where: {
                id: id,
            },
        })
            .then(() => {
            res.status(200).send("Buddy Saving was deleted Successfully");
        })
            .catch((err) => {
            res.status(404).json({ msg: err.message });
        });
    }
    catch (error) {
        res.status(404).json({ msg: error.msg });
    }
});
exports.deleteSingleBuddySaving = deleteSingleBuddySaving;
const AcceptInviteToBuddySaving = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const buddy = yield buddy_1.default.findOne({ where: { id: id } });
    if (!buddy) {
        return res.status(404).json({ msg: "Cannot find buddy saving plan" });
    }
    else {
        try {
            let userId = req.user.userId;
            const buddyJoined = buddy.buddiesJoined;
            const User = yield user_1.default.findOne({ where: { id: userId } });
            let newArray = Object.assign([], buddyJoined);
            const myInterestingData = {
                id: User === null || User === void 0 ? void 0 : User.id,
                username: User === null || User === void 0 ? void 0 : User.username,
                email: User === null || User === void 0 ? void 0 : User.email,
            };
            const findValue = buddyJoined.find((item) => item.id === myInterestingData.id);
            if (findValue) {
                return res.status(404).json({ msg: "User is already invited" });
            }
            newArray.push(myInterestingData);
            yield buddy
                .update({
                buddiesJoined: newArray,
            })
                .then(() => {
                return buddy_1.default.findOne({ where: { id: id } });
            })
                .then((data) => {
                res
                    .status(200)
                    .json({ data: (0, buddy_2.buddyTransformer)(data) });
            })
                .catch((err) => {
                res.status(404).json({ msg: err.message });
            });
        }
        catch (error) {
            res.status(404).json({ msg: error.msg });
        }
    }
});
exports.AcceptInviteToBuddySaving = AcceptInviteToBuddySaving;
//# sourceMappingURL=buddy.js.map