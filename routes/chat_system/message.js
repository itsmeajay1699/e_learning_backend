import { Router } from "express";
import {
  allChatRoomMessage,
  newMessage,
} from "../../controller/chat_system/message.js";
import passport from "passport";
const messageRouter = Router();

messageRouter.get("/room-message/:id", async (req, res) => {
  try {
    const allRoomMessage = await allChatRoomMessage({
      roomId: req.params.id,
    });

    res.json({
      success: true,
      message: "All chat rooms",
      data: allRoomMessage,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err,
    });
  }
});

messageRouter.post(
  "/send-message/:id",

  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { user_id, role } = req.user;
      const { message } = req.body;

      const newMessageData = await newMessage({
        chatRoomId: id,
        messageSend: message,
        senderId: user_id,
        role: role === "1" ? "student" : "educator",
        req: req,
      });

      res.json({
        success: true,
        message: "Message sent successfully",
        data: newMessageData,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: err,
      });
    }
  }
);

export default messageRouter;
