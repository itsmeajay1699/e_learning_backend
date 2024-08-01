import express from "express";
import dotenv from "dotenv";
import "./config/postgresDB.js";
import passport from "passport";
import connectDB from "./config/mongoDb.js";
import "./auth/jwt.js";
import { rateLimit } from "express-rate-limit";
import cookieParser from "cookie-parser";
import { initializeSocket } from "./socket/index.js";
import "./schema/postgres/global.js";
import "./schema/postgres/user.js";
import "./schema/postgres/educator.js";
import "./schema/postgres/chatRoom.js";
import "./schema/postgres/message.js";
import "./schema/mongodb/enrollment.js";
import "./schema/mongodb/courses.js";
import "./schema/mongodb/category.js";
import { createServer } from "http";
import cors from "cors";
import router from "./routes/index.js";
import { Server } from "socket.io";

dotenv.config();
connectDB();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  pingTimeout: 60000,
  cors: {
    origin: ["https://e-learning-kl5q.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const corsOptions = {
  origin: ["https://e-learning-kl5q.vercel.app", "http://localhost:5173"],
  optionsSuccessStatus: 200,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});

app.set("io", io);
app.use(cors(corsOptions)); // Apply CORS options before other middleware
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.json()); // for parsing application/json
// app.use(limiter);
app.use(passport.initialize());
app.use("/api", router);

httpServer.listen(5000, () => {
  console.log("Server is running on port 5000");
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

initializeSocket(io);
