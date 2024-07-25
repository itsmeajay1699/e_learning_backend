import { Router } from "express";

import authRouter from "./auth/authRoute.js";
import studentRouter from "./student/studentRoute.js";
import educatorRouter from "./educator/educatorRoute.js";
import courseRouter from "./course/index.js";
import categoryRouter from "./category/index.js";
import chatRouter from "./chat_system/index.js";
import messageRouter from "./chat_system/message.js";
const router = Router();

router.use("/auth", authRouter);
router.use("/student", studentRouter);
router.use("/educator", educatorRouter);
router.use("/course", courseRouter);
router.use("/category", categoryRouter);
router.use("/chat", chatRouter);
// router.use("/message", messageRouter);
router.use("/message", messageRouter);
export default router;
