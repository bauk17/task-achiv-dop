const express = require("express");
import cors from "cors";
import dotenv from "dotenv";
import { Routes } from "./routes/Routes";
import cookieParser from "cookie-parser";
dotenv.config();

const SERVER = express();

SERVER.use(express.json());

SERVER.use(express.urlencoded({ extended: true }));

SERVER.use(cookieParser());

SERVER.use(cors());

SERVER.use(Routes);

SERVER.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running!`);
});
