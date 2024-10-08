import cookie from "cookie";
import jwt from "jsonwebtoken";
import user from "../schema/postgres/user.js";
import Educator from "../schema/postgres/educator.js";
import ChatEventEnum from "./constant.js";

const isTypingEventDoing = (socket) => {
  socket.on(ChatEventEnum.IS_TYPING_START_EVENT, (data) => {
    console.log("User is typing...", data);
    const { roomId, userId } = data;
    socket.to(userId).emit(ChatEventEnum.IS_TYPING_START_EVENT, {
      message: "User is typing...",
      typing: data.typing,
      roomId,
    });
  });
};

const initializeSocket = (io) => {
  return io.on("connection", async (socket) => {
    try {
      const cookies = cookie.parse(socket.handshake.headers.cookie || "");
      // console.log("cookies", cookies);

      let token = cookies["token"];
      // console.log("token1", token);

      if (!token) {
        token = socket.handshake.auth?.token;
        // console.log("token2", token);
      }

      if (!token) {
        throw new Error("Token not found.");
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // const { role } = decoded;
      // let userFind = null;
      // if (role === "1") {
      //   // student;
      //   userFind = await user.findOne({
      //     where: {
      //       id: decoded.user_id,
      //     },
      //   });
      // } else {
      //   userFind = await Educator.findOne({
      //     where: {
      //       id: decoded.user_id,
      //     },
      //   });
      // }

      // socket.user = userFind.dataValues; // mount user to socket
      socket.user = decoded;
      socket.join(socket.user.user_id); // join user room
      console.log("Connected to the socket.", socket.user.user_id);
      socket.emit(ChatEventEnum.CONNECTED_EVENT, {
        message: "Connected to the socket.",
      });
      socket.on(ChatEventEnum.DISCONNECT_EVENT, () => {
        console.log("Disconnected from the socket.", socket.user);
        if (socket.user) {
          socket.leave(socket.user.id);
        }
      });

      isTypingEventDoing(socket);
    } catch (error) {
      console.log(error);
      socket.emit(
        ChatEventEnum.SOCKET_ERROR_EVENT,
        error?.message || "Something went wrong while connecting to the socket."
      );
    }
  });
};

const emitSocketEvent = ({ req, roomId, event, payload }) => {
  req.app.get("io").to(roomId).emit(event, payload);
};

export { initializeSocket, emitSocketEvent };
