import { Sequelize, sequelize } from "../../config/posthresDB.js";
import { v4 as uuidv4 } from "uuid";
const educator = sequelize.define(
  "educator",
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: uuidv4(),
    },
    profilePicture: {
      type: Sequelize.STRING,
      allowNull: false,
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
//   .sync({ force: true })
//   .then(() => {
//     console.log("Educator Table is Synced");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

export default educator;
