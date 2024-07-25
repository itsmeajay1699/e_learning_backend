import { Router } from "express";
import chatRoom from "../../schema/postgres/chatRoom.js";
import user from "../../schema/postgres/user.js";
import educator from "../../schema/postgres/educator.js";
import global from "../../schema/postgres/global.js";
import { allChatRoomOfUser } from "../../controller/chat_system/chatRoom.js";
import passport from "passport";
const chatRouter = Router();

chatRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { user_id } = req.user;

      const rooms = await allChatRoomOfUser({
        id: user_id,
      });
      res.json({
        success: true,
        message: "All chat rooms",
        data: rooms,
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

export default chatRouter;
