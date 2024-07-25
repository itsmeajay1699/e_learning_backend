import chatRoom from "../../schema/postgres/chatRoom.js";
import message from "../../schema/postgres/message.js";
import ChatEventEnum from "../../socket/constant.js";
import { emitSocketEvent } from "../../socket/index.js";

export const allChatRoomMessage = async ({ roomId }) => {
  try {
    const allRoomMessage = await message.findAll({
      where: {
        chatRoomId: roomId,
      },
    });

    return allRoomMessage;
  } catch (err) {
    throw new Error(err);
  }
};

export const newMessage = async ({
  chatRoomId,
  messageSend,
  senderId,
  role,
  req,
}) => {
  try {
    const room = await chatRoom.findOne({
      where: {
        id: chatRoomId,
      },
    });

    if (!room) {
      throw new Error("Chat room not found");
    }

    room.lastMessage = messageSend;
    await room.save();

    const newMessage = await message.create({
      chatRoomId: chatRoomId,
      message: messageSend,
      senderId: senderId,
      senderType: role,
    });

    emitSocketEvent({
      req: req,
      event: ChatEventEnum.MESSAGE_RECEIVED_EVENT,
      payload: newMessage,
      roomId:
        senderId === room.participant1 ? room.participant2 : room.participant1,
    });

    return newMessage;
  } catch (err) {
    throw new Error(err);
  }
};
