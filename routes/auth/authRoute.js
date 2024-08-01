import { Router } from "express";
import { hashPassword, stringToNumber } from "../../utils/index.js";
import jwt from "jsonwebtoken";
import { createUser, login } from "../../controller/auth/index.js";
import passport from "passport";
const authRouter = Router();

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    const user = await login(email, password);

    const token = jwt.sign(
      { email: user.email, role: user.role, user_id: user.id },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    const expiry = req.body?.remember
      ? { maxAge: 1000 * 60 * 60 * 24 * 30 }
      : {};

    return res
      .cookie("token", token, {
        path: "/",
        ...expiry,
        domain: "https://e-learning-kl5q.vercel.app",
      })
      .status(200)
      .json({
        success: true,
        message: "Login successful",
        token,
        user,
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error",
      error: err,
    });
  }
});

authRouter.post("/register", async (req, res) => {
  try {
    // 1 means student 2 means educator
    let { email, password, profilePicture, isStudent, role = 1 } = req.body;
    console.log(req.body);
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    if (isStudent === false) {
      role = 2;
    }

    let roleNumber = stringToNumber(role);

    let hashPassword1 = await hashPassword(password);

    const user = await createUser(
      email,
      hashPassword1,
      roleNumber,
      profilePicture
    );

    const token = jwt.sign(
      {
        email: user.email,
        status: user.role,
        user_id: user.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    // const tokenfromHeader = req.headers.authorization.split(" ")[1];
    // console.log(tokenfromHeader);

    const expiry = req.body?.remember
      ? { maxAge: 1000 * 60 * 60 * 24 * 30 } // 30 days
      : {};

    return res
      .cookie("token", token, {
        path: "/",
        ...expiry,
        domain: "https://e-learning-kl5q.vercel.app",
      })
      .status(201)
      .json({
        success: true,
        message: "User created successfully",
        token,
        user,
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error",
      error: err,
    });
  }
});

authRouter.post("/logout", async (req, res) => {
  return res.clearCookie("token").status(200).json({
    success: true,
    message: "Logout successfully",
  });
});

authRouter.get(
  "/session",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    try {
      res.status(200).json({
        error: false,
        message: "Session is active",
        user: req.user,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: true, message: err.message });
    }
  }
);

export default authRouter;
