import express from "express";

import dotenv from "dotenv";

import "./config/posthresDB.js";

import connectDB from "./config/mongoDb.js";

import "../backend/schema/postgres/global.js";
import "../backend/schema/postgres/user.js";
import "../backend/schema/postgres/educator.js";
import "../backend/schema/postgres/post.js"

dotenv.config();

connectDB();

const app = express();

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

app.get("/", (req, res) => {
  res.send("Hello World");
});
