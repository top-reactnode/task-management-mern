require("dotenv").config({
  path: process.env.NODE_ENV === "production" ? ".env" : ".env.development",
});

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.set("strictQuery", true);
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  family: 4,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB", process.env.DATABASE_URL);
});

app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Routes
const authRouter = require("./routes/auth");
app.use("/api/auth", authRouter);
const tasksRouter = require("./routes/tasks");
app.use("/api", tasksRouter);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("Server listening the port " + port);
});
