import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import multer from "multer";

import { Routes } from "./routes/index";

const app = express();
require("dotenv").config();

mongoose
  .connect(
    process.env.MONGO_URL ||
      "mongodb://localhost:27017/google-cloud-storage-test",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Mongo connected!"));

const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
});

app.disable("x-powered-by");
app.use(multerMid.single("file"));

app.use(express.json());
app.use(cors());
app.use(Routes);

export { app };
