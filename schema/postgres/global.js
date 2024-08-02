// Example assuming proper imports and Sequelize initialization
import { sequelize, Sequelize } from "../../config/postgresDB.js";
import educator from "./educator.js";
import user from "./user.js";
import { v4 as uuidv4 } from "uuid";

const global = sequelize.define(
  "global",
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
    role: {
      type: Sequelize.INTEGER, // 1 means student 2 means educator
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

// Define relationships after defining all models

global.hasOne(user, {
  foreignKey: "email",
  sourceKey: "email",
  as: "user",
  constraints: false,
});

user.belongsTo(global, {
  foreignKey: "email",
  targetKey: "email",
  as: "global",
  constraints: false,
});

global.hasOne(educator, {
  foreignKey: "email",
  sourceKey: "email",
  as: "educator",
  constraints: false,
});

educator.belongsTo(global, {
  foreignKey: "email",
  targetKey: "email",
  as: "global",
  constraints: false,
});

// global.sync({ force: true }).then(() => {
//   console.log("Global Table is Synced");
// });
export default global;

// sequelize
//   .sync({ alter: true })
//   .then(() => {
//     console.log("Database schema updated");
//   })
//   .catch((err) => {
//     console.error("Error syncing database:", err);
//   });
