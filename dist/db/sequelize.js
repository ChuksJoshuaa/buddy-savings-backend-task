"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
require("pg");
const sequelize = new sequelize_1.Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    dialect: "postgres",
    dialectOptions: {
        ssl: true,
        native: true,
    },
    logging: false,
    pool: {
        max: 5,
        idle: 30000,
        acquire: 40000,
    },
});
exports.default = sequelize;
//# sourceMappingURL=sequelize.js.map