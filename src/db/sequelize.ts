import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DATABASE_NAME!,
  process.env.DATABASE_USER!,
  process.env.DATABASE_PASSWORD!,
  {
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
    dialectModule: require("mysql2"),
    logging: false,
    pool: {
      max: 5,
      idle: 30000,
      acquire: 60000,
    },
  }
);

export default sequelize;
