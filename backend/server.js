import dotenv from "dotenv";
import flightBookingRoutes from "./routes/flightbookingRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Load .env from root folder (parent directory)
dotenv.config({ path: path.join(__dirname, '..', '.env') });


import express from "express";
import { connectToDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes.js";
import cors from "cors";

const PORT = process.env.PORT || 5000;
const app = express();

// ✅ CORS (must match your frontend URL and allow cookies)
app.use(cors({
  origin: process.env.CLIENT_URL, 
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// ✅ auth routes
app.use("/api", authRouter);
app.use("/api/flight-bookings", flightBookingRoutes);

// ✅ IMPORTANT — connect to DB BEFORE starting server
connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server started on port ${PORT}`);
  });
}).catch((err) => {
  console.error("❌ DB Connection Failed:", err);
});
