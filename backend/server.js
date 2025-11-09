import dotenv from "dotenv";
import flightBookingRoutes from "./routes/flightbookingRoutes.js";
import rateLimit from "express-rate-limit";
import { Server } from "socket.io";
import http from "http";

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
  origin: process.env.CLIENT_URL || ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// Rate Limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Limit each IP to 1000 requests per windowMs (increased for development)
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

// Create HTTP server and Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"],
    credentials: true
  }
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('Admin connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Admin disconnected:', socket.id);
  });
});

// Make io available globally for emitting events
global.io = io;

//  connect to DB BEFORE starting server
connectToDB().then(() => {
  server.listen(PORT, () => {
    console.log(`🚀 Server started on port ${PORT}`);
  });
}).catch((err) => {
  console.error("❌ DB Connection Failed:", err);
});
