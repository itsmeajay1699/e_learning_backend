import { Sequelize, sequelize } from "../../config/posthresDB.js";
import global from "./global.js";
import post from "./post.js";
const user = sequelize.define(
  "user",
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

user
  .sync({ alter: true })
  .then(() => {
    console.log("User Table is Synced");
  })
  .catch((err) => {
    console.log(err);
  });

user.hasMany(post, {
  foreignKey: "userId",
  sourceKey: "id",
  as: "media",
});

post.belongsTo(user, {
  foreignKey: "userId",
  targetKey: "id",
  as: "user_media",
});

export default user;
