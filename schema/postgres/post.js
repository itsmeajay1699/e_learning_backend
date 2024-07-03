import { Timestamp } from "mongodb";
import { Sequelize, sequelize } from "../../config/posthresDB.js";

const post = sequelize.define(
  "posts",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    title: {
      type: Sequelize.STRING,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
  },
  {
    Timestamp: true,
  }
);

post
  .sync({ alter: true })
  .then(() => {
    console.log("Post Schema is create");
  })
  .catch((err) => {
    console.log(err);
  });

export default post;
