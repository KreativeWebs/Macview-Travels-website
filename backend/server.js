import express from "express";
import dotenv from "dotenv";
import { connectToDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes.js";
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cookieParser());


app.use("/api", authRouter);


app.listen(PORT, () => {
  connectToDB();
  console.log(`Server started at port ${PORT}`);
});
