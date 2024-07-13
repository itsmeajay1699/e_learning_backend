import express from "express";

import dotenv from "dotenv";

import "./config/posthresDB.js";
import passport from "passport";

import connectDB from "./config/mongoDb.js";
import "../backend/auth/jwt.js";

import "../backend/schema/postgres/global.js";
import "../backend/schema/postgres/user.js";
import "../backend/schema/postgres/educator.js";
import "../backend/schema/postgres/post.js";
import "../backend/schema/mongodb/enrollment.js";
import "../backend/schema/mongodb/courses.js";

import cors from "cors";

dotenv.config();

connectDB();

// router

import router from "./routes/index.js";

const app = express();

app.use(express.json()); // for parsing application/json

app.use("/api", router);

// passport middleware

app.use(passport.initialize());

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
  credentials: true,
  method: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

app.get("/", (req, res) => {
  res.send("Hello World");
});
