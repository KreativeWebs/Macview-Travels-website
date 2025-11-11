import dotenv from "dotenv";
import flightBookingRoutes from "./routes/flightbookingRoutes.js";
import hotelRoutes from "./routes/hotelRoutes.js";
import rateLimit from "express-rate-limit";
import { Server } from "socket.io";
import http from "http";
import express from "express";
import { connectToDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes.js";
import visaRoutes from "./routes/visaRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

// -----------------------------
// File path fixes for ES Modules
// -----------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// -----------------------------
// Load .env
// -----------------------------
dotenv.config({ path: path.join(__dirname, "..", ".env") });

// -----------------------------
// Express app
// -----------------------------
const app = express();
const PORT = process.env.PORT || 5000;

// -----------------------------
// CORS (multiple origins + cookies)
// -----------------------------
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175"
];

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (like mobile apps, curl, postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// -----------------------------
// Middleware
// -----------------------------
app.use(express.json());
app.use(cookieParser()); // no secret needed for unsigned cookies

// -----------------------------
// Rate Limiter
// -----------------------------
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false
});

app.use("/api/", authLimiter);

// -----------------------------
// Routes
// -----------------------------
app.use("/api", authRouter);
app.use("/api/flight-bookings", flightBookingRoutes);
app.use("/api/hotel-bookings", hotelRoutes);
app.use("/api/visa", visaRoutes);
app.use("/api/admin", adminRoutes);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// -----------------------------
// HTTP Server + Socket.IO
// -----------------------------
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST"]
  },
  transports: ['websocket', 'polling'],
  allowEIO3: true, // Allow Engine.IO v3 clients
  pingTimeout: 60000,
  pingInterval: 25000
});

io.on("connection", (socket) => {
  console.log("🔌 Socket connected:", socket.id);
  console.log("🔌 Connection details:", {
    transport: socket.conn.transport.name,
    headers: socket.handshake.headers.origin,
    userAgent: socket.handshake.headers['user-agent']?.substring(0, 50)
  });

  socket.on("disconnect", (reason) => {
    console.log("🔌 Socket disconnected:", socket.id, "Reason:", reason);
  });
});

global.io = io;

// -----------------------------
// Start server after DB connection
// -----------------------------
connectToDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`🚀 Server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB Connection Failed:", err);
  });

