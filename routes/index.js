import { Router } from "express";

import authRouter from "./auth/authRoute.js";
import studentRouter from "./student/studentRoute.js";
import educatorRouter from "./educator/educatorRoute.js";
const router = Router();

router.use("/auth", authRouter);
router.use("/student", studentRouter);
router.use("/educator", educatorRouter);

export default router;
