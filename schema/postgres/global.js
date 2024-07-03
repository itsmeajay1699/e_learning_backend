// Example assuming proper imports and Sequelize initialization
import { sequelize, Sequelize } from "../../config/posthresDB.js";
import educator from "./educator.js";
import user from "./user.js";

const global = sequelize.define(
  "global",
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
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

// Define relationships after defining all models

// global.sync({ alter: true });

global.hasOne(user, {
  foreignKey: "email",
  sourceKey: "email",
});

user.belongsTo(global, {
  foreignKey: "email",
  targetKey: "email",
});

global.hasOne(educator, {
  foreignKey: "email",
  sourceKey: "email",
});

educator.belongsTo(global, {
  foreignKey: "email",
  targetKey: "email",
});

export default global;
