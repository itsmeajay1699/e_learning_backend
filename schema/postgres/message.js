import { Sequelize, sequelize } from "../../config/postgresDB.js";
import chatRoom from "./chatRoom.js";
import educator from "./educator.js";
import user from "./user.js";

const message = sequelize.define(
  "message",
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    chatRoomId: {
      type: Sequelize.UUID,
      allowNull: false,
    },

    senderId: {
      type: Sequelize.UUID,
      allowNull: false,
    },

    message: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    senderType: {
      type: Sequelize.ENUM("student", "educator"),
      allowNull: false,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

chatRoom.hasMany(message, {
  foreignKey: "chatRoomId",
  sourceKey: "id",
  as: "messages",
});

message.belongsTo(chatRoom, {
  foreignKey: "chatRoomId",
  targetKey: "id",
  as: "chatRoom",
});

user.hasMany(message, {
  foreignKey: "senderId",
  sourceKey: "id",
  as: "student_messages",
  constraints: false,
});

educator.hasMany(message, {
  foreignKey: "senderId",
  sourceKey: "id",
  as: "educator_messages",
  constraints: false,
});

message.belongsTo(user, {
  foreignKey: "senderId",
  targetKey: "id",
  as: "student",
  constraints: false,
});

message.belongsTo(educator, {
  foreignKey: "senderId",
  targetKey: "id",
  as: "educator",
  constraints: false,
});

// message.sync({ force: true });

export default message;
