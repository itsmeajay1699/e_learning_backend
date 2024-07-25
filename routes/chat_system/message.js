import { Router } from "express";
import {
  allChatRoomMessage,
  newMessage,
} from "../../controller/chat_system/message.js";
import passport from "passport";
import { rateLimit } from "express-rate-limit";
const messageRouter = Router();

const limiter = rateLimit({ 
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});

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
  limiter,
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
