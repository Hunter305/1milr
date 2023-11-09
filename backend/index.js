import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import db from "./db.js";
import resumeRouter from "./routes/resumeRouter.js";
const port = process.env.PORT || 3000;
db();

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/resume", resumeRouter);

app.listen(port, () => {
  console.log("app is running");
});
