"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../db/sequelize"));
class User extends sequelize_1.Model {
}
const UserModel = sequelize_2.default.define("User", {
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: new sequelize_1.DataTypes.STRING(),
        allowNull: false,
    },
    email: {
        type: new sequelize_1.DataTypes.STRING(),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: "Must be a valid email address",
            },
        },
    },
    password: {
        type: new sequelize_1.DataTypes.STRING(),
        allowNull: false,
    },
}, {
    timestamps: true,
});
exports.default = UserModel;
//# sourceMappingURL=user.js.map