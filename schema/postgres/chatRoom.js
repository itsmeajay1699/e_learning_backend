import { Sequelize, sequelize } from "../../config/postgresDB.js";
import { v4 as uuidv4 } from "uuid";
import student from "./user.js";
import educator from "./educator.js";

const chatRoom = sequelize.define(
  "chatRoom",
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4, // Use Sequelize's UUIDV4 to auto-generate unique IDs
    },
    courseId: {
      type: Sequelize.STRING, // course id comes from the course document in mongodb
      allowNull: false,
    },
    participant1: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    participant2: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    lastMessage: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    courseDetails: {
      type: Sequelize.JSON,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

// Define relationships after defining all models

chatRoom.belongsTo(student, {
  foreignKey: "participant1",
  targetKey: "id",
  as: "participant1_student",
});

student.hasMany(chatRoom, {
  foreignKey: "participant1",
  sourceKey: "id",
  as: "participant1_chatRoom",
});

educator.hasMany(chatRoom, {
  foreignKey: "participant2",
  sourceKey: "id",
  as: "participant2_chatRoom",
});

chatRoom.belongsTo(educator, {
  foreignKey: "participant2",
  targetKey: "id",
  as: "participant2_educator",
});

// chatRoom
//   .sync({ force: true })
//   .then(() => {
//     console.log("ChatRoom Table is Synced");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

export default chatRoom;
