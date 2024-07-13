import { Router } from "express";

import authRouter from "./auth/authRoute.js";
import studentRouter from "./student/studentRoute.js";
import educatorRouter from "./educator/educatorRoute.js";
import courseRouter from "./course/index.js";
const router = Router();

router.use("/auth", authRouter);
router.use("/student", studentRouter);
router.use("/educator", educatorRouter);
router.use("/course", courseRouter);

export default router;
