import Sequelize from "sequelize";
import { config } from "dotenv";

config();

const PASSWORD = process.env.DATABASE_PASSWORD;
const HOST = process.env.DATABASE_HOST;
const USER = process.env.DATABASE_USER;
const DATABASE = process.env.DATABASE_NAME;

const PASSWORD_PROD = process.env.DATABASE_PASSWORD_PROD;
const HOST_PROD = process.env.DATABASE_HOST_PROD;
const USER_PROD = process.env.DATABASE_USER_PROD;
const DATABASE_PROD = process.env.DATABASE_NAME_PROD;
const URL_PROD = process.env.DATABASE_URL_PROD;

const dialect = "postgres";
const pool = {
  max: 100,
  min: 0,
  acquire: 60000,
  idle: 30000,
};

const sequelize = new Sequelize(URL_PROD, {
  host: HOST,
  dialect,
  pool,
  logging: false,
  benchmark: true,
  define: {
    paranoid: true,
    timestamp: true,
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

console.log(
  sequelize
    .authenticate()
    .then(() => console.log("Postgres Database connected"))
    .catch((err) => console.log(err))
);

export { Sequelize, sequelize };
