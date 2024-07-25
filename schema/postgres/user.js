import { Sequelize, sequelize } from "../../config/postgresDB.js";
import { v4 as uuidv4 } from "uuid";
const student = sequelize.define(
  "student",
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    profilePicture: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue:
        "https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1721001600&semt=ais_user",
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

// user
//   .sync({ force: true })
//   .then(() => {
//     console.log("User Table is Synced");
//   })
//   .catch((err) => {
//     console.log(err);
//   });x

export default student;
