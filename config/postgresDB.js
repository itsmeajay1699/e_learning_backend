import Sequelize from "sequelize";

// const PASSWORD = process.env.DATABASE_PASSWORD;
// const HOST = process.env.DATABASE_HOST;
// const USER = process.env.DATABASE_USER;
// const DATABASE = process.env.DATABASE_NAME;

// DATABASE_USER="postgres"
// DATABASE_HOST="localhost"
// DATABASE_PASSWORD="asklqwopn@1"
// DATABASE_NAME="e_learning"

const PASSWORD = "asklqwopn@1";
const HOST = "localhost";
const USER = "postgres";
const DATABASE = "e_learning";

const dialect = "postgres";
const pool = {
  max: 100,
  min: 0,
  acquire: 60000,
  idle: 30000,
};

const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
  host: HOST,
  dialect,
  pool,
  logging: false,
  benchmark: true,
  define: {
    paranoid: true,
    timestamp: true,
  },
});

console.log(
  sequelize
    .authenticate()
    .then(() => console.log("Postgres Database connected"))
    .catch((err) => console.log(err))
);

export { Sequelize, sequelize };
