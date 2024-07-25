import { Sequelize, sequelize } from "../../config/postgresDB.js";
import { v4 as uuidv4 } from "uuid";
const educator = sequelize.define(
  "educator",
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4, // Use Sequelize's UUIDV4 to auto-generate unique IDs
    },
    profilePicture: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue:
        "https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1721001600&semt=ais_user",
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
      type: Sequelize.STRING, // 1. student 2. educator
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
