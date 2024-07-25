import { Op } from "sequelize";
import chatRoom from "../../schema/postgres/chatRoom.js";
import student from "../../schema/postgres/user.js";
import educator from "../../schema/postgres/educator.js";

export const allChatRoomOfUser = async ({ id }) => {
  try {
    const rooms = await chatRoom.findAll({
      where: {
        [Op.or]: [{ participant1: id }, { participant2: id }],
      },

      include: [
        {
          model: student,
          as: "participant1_student",
          attributes: ["id", "email", "profilePicture"],
        },
        {
          model: educator,
          as: "participant2_educator",
          attributes: ["id", "email", "profilePicture"],
        },
      ],
    });

    return rooms;
  } catch (err) {
    throw new Error(err);
  }
};
