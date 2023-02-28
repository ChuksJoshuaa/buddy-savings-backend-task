"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host: "127.0.0.1",
    dialect: "mysql",
    dialectModule: require("mysql2"),
    logging: false,
    pool: {
        max: 5,
        idle: 30000,
        acquire: 60000,
    },
});
exports.default = sequelize;
//# sourceMappingURL=sequelize.js.map