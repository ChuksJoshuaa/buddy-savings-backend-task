import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DATABASE_NAME!,
  process.env.DATABASE_USER!,
  process.env.DATABASE_PASSWORD!,
  {
    host: process.env.DATABASE_HOST!,
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
  }
);

export default sequelize;
