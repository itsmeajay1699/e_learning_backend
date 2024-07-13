// Example assuming proper imports and Sequelize initialization
import { sequelize, Sequelize } from "../../config/posthresDB.js";
import educator from "./educator.js";
import user from "./user.js";
import { v4 as uuidv4 } from "uuid";

const global = sequelize.define(
  "global",
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: uuidv4(),
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

// global.sync({ force: true });

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
