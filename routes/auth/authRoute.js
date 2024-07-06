import { Router } from "express";
import { hashPassword, stringToNumber } from "../../utils/index.js";
import jwt from "jsonwebtoken";
import { createUser, login } from "../../controller/auth/index.js";
const authRouter = Router();

authRouter.get("/login", async (req, res) => {
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
      { email: user.email, status: user.role, user_id: user.id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error",
      error: err,
    });
  }
});

authRouter.get("/register", async (req, res) => {
  try {
    // 1 means student 2 means educator
    const { email, password, role = 1 } = req.body;
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

    let roleNumber = stringToNumber(role);

    let hashPassword1 = await hashPassword(password);

    const user = await createUser(email, hashPassword1, roleNumber);

    const token = jwt.sign(
      {
        email: user.email,
        status: user.role,
        user_id: user.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // const tokenfromHeader = req.headers.authorization.split(" ")[1];

    return res.cookie("token", token).status(200).json({
      success: true,
      message: "Register successful",
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

export default authRouter;
