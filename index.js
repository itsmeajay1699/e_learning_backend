import express from "express";

import dotenv from "dotenv";

import "./config/posthresDB.js";
import passport from "passport";

import connectDB from "./config/mongoDb.js";
import "../backend/auth/jwt.js";
import { rateLimit } from "express-rate-limit";

import cookieParser from "cookie-parser";
import { initializeSocket } from "./socket/index.js";

import "../backend/schema/postgres/global.js";
import "../backend/schema/postgres/user.js";
import "../backend/schema/postgres/educator.js";
import "../backend/schema/postgres/post.js";
import "../backend/schema/mongodb/enrollment.js";
import "../backend/schema/mongodb/courses.js";
import "../backend/schema/mongodb/category.js";
import { createServer } from "http";

import cors from "cors";

// router

import router from "./routes/index.js";
import { Server } from "socket.io";

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
  credentials: true,
  method: ["GET", "POST", "PUT", "DELETE"],
};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});

app.set("io", io);

app.use(cors(corsOptions));

app.use(cookieParser());

dotenv.config();

connectDB();

app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(limiter);

app.use(express.json()); // for parsing application/json

app.use("/api", router);

// passport middleware

app.use(passport.initialize());

// app.listen(5000, () => {
//   console.log("Server is running on port 5000");
// });

httpServer.listen(5000, () => {
  console.log("Server is running on port 5000");
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

initializeSocket(io);
