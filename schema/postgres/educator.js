import { Sequelize, sequelize } from "../../config/posthresDB.js";

const educator = sequelize.define(
  "educator",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    role: {
      type: Sequelize.STRING, // 1. educator 2. student
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

// educator
//   .sync({ alter: true })
//   .then(() => {
//     console.log("Educator Table is Synced");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

export default educator;
