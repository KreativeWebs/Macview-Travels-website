import dotenv from "dotenv";
import flightBookingRoutes from "./routes/flightbookingRoutes.js";
import rateLimit from "express-rate-limit";

import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Load .env from root folder (parent directory)
dotenv.config({ path: path.join(__dirname, '..', '.env') });


import express from "express";
import { connectToDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes.js";
import visaRoutes from "./routes/visaRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import path from "path";
import cors from "cors";

const PORT = process.env.PORT || 5000;
const app = express();

// ✅ CORS (must match your frontend URL and allow cookies)
app.use(cors({
  origin: process.env.CLIENT_URL, 
  credentials: true
}));

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// Rate Limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply the rate limiting middleware to auth routes
app.use("/api/", authLimiter);

// auth routes
app.use("/api", authRouter);
app.use("/api/flight-bookings", flightBookingRoutes);
app.use("/api/visa", visaRoutes);
app.use("/api/admin", adminRoutes);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// ✅ IMPORTANT — connect to DB BEFORE starting server
connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server started on port ${PORT}`);
  });
}).catch((err) => {
  console.error("❌ DB Connection Failed:", err);
});
