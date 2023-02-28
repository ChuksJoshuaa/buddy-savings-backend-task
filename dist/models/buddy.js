"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../db/sequelize"));
class Buddy extends sequelize_1.Model {
}
const BuddyModel = sequelize_2.default.define("Buddy", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: new sequelize_1.DataTypes.STRING(),
        allowNull: false,
    },
    buddies: {
        type: new sequelize_1.DataTypes.INTEGER(),
        allowNull: false,
    },
    creator: {
        type: new sequelize_1.DataTypes.INTEGER(),
        allowNull: false,
    },
    buddiesJoined: {
        type: new sequelize_1.DataTypes.JSON(),
        defaultValue: [],
    },
    buddiesTarget: {
        type: new sequelize_1.DataTypes.ENUM(),
        values: ["yes", "no"],
        defaultValue: "no",
    },
    savingMethod: {
        type: new sequelize_1.DataTypes.ENUM(),
        values: ["automatic", "manual"],
        defaultValue: "automatic",
    },
    savingFrequency: {
        type: new sequelize_1.DataTypes.ENUM(),
        values: ["daily", "weekly", "monthly"],
        defaultValue: "monthly",
    },
    savingAmount: {
        type: new sequelize_1.DataTypes.INTEGER(),
        allowNull: false,
    },
    savingDuration: {
        type: new sequelize_1.DataTypes.ENUM(),
        values: ["3 months", "6 months", "1 year"],
        defaultValue: "3 months",
    },
    startSaving: {
        type: new sequelize_1.DataTypes.DATE(),
        allowNull: false,
    },
    endSaving: {
        type: new sequelize_1.DataTypes.DATE(),
        allowNull: false,
    },
    buddiesRelationship: {
        type: new sequelize_1.DataTypes.STRING(),
        allowNull: false,
    },
}, {
    timestamps: true,
});
exports.default = BuddyModel;
//# sourceMappingURL=buddy.js.map