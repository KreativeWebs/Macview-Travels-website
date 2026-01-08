import "dotenv/config";
import flightBookingRoutes from "./routes/flightbookingRoutes.js";
import hotelRoutes from "./routes/hotelRoutes.js";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import logger from "./config/logger.js";
import { Server } from "socket.io";
import http from "http";
import express from "express";
import { connectToDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes.js";
import visaRoutes from "./routes/visaRoutes.js";
import packagesRoutes from "./routes/packagesRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import newsletterRoutes from "./routes/newsletterRoutes.js";
import adminNewsletterRoutes from "./routes/adminNewsletterRoutes.js";
import { adminBasicAuth } from "./middleware/adminBasicAuth.js";
import flashSaleRoutes from "./routes/flashSaleRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { createProxyMiddleware } from "http-proxy-middleware";
import cors from "cors";

// -----------------------------
// File path fixes for ES Modules
// -----------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// -----------------------------
// Express app
// -----------------------------
const app = express();
const PORT = process.env.PORT || 5000;

// -----------------------------
// Allowed origins
// -----------------------------
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5176",
  "https://healthcheck.railway.app",
  "https://www.macviewtravel.com",
  "https://admin.macviewtravel.com",
];

// -----------------------------
// CORS origin function
// -----------------------------
const corsOriginFunction = function (origin, callback) {
  const strippedOrigin = origin?.replace(/\/+$/, ""); // remove trailing slashes
  logger.info(
    `CORS check: raw_origin=${origin}, stripped_origin=${strippedOrigin}, allowed=${allowedOrigins.includes(
      strippedOrigin
    )}`
  );

  if (!origin) return callback(null, true); // allow server-to-server requests

  if (allowedOrigins.includes(strippedOrigin)) {
    return callback(null, strippedOrigin); // return the specific allowed origin
  } else {
    logger.warn(`Blocked CORS origin: ${strippedOrigin}`);
    return callback(new Error("Not allowed by CORS"));
  }
};

// -----------------------------
// CORS middleware
// -----------------------------
app.use(
  cors({
    origin: corsOriginFunction,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
    ],
  })
);

// -----------------------------
// OPTIONS preflight (for POST requests with credentials)
// -----------------------------
app.options("*", cors({ origin: corsOriginFunction, credentials: true }));

// -----------------------------
// Security Middleware (Helmet)
// -----------------------------
app.use(
  helmet({
    crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" },
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://fonts.googleapis.com",
          "https://cdn.jsdelivr.net",
        ],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        scriptSrc: [
          "'self'",
          "https://js.paystack.co",
          "https://www.paypal.com",
          "https://accounts.google.com",
        ],
        imgSrc: ["'self'", "data:", "https:", "blob:"],
        connectSrc: [
          "'self'",
          "https://api.paystack.co",
          "https://accounts.google.com",
          "ws:",
          "wss:",
        ],
      },
    },
  })
);

// -----------------------------
// Request logging using Winston
// -----------------------------
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path} - ${req.ip} - ${req.get("User-Agent")}`);
  next();
});

// -----------------------------
// Middleware
// -----------------------------
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

// -----------------------------
// Rate Limiting
// -----------------------------
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many authentication attempts, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  message: "Too many API requests, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

app.get("/health", (req, res) => res.status(200).json({ status: "ok" }));

app.use("/", generalLimiter);
app.use("/api/auth", authLimiter);
app.use("/api/", apiLimiter);

// -----------------------------
// Routes
// -----------------------------
app.use("/api", authRouter);
app.use("/api/flight-bookings", flightBookingRoutes);
app.use("/api/hotel-bookings", hotelRoutes);
app.use("/api/visa", visaRoutes);
app.use("/api/packages", packagesRoutes);
app.use("/api/admin", adminBasicAuth, adminRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/admin/newsletter", adminBasicAuth, adminNewsletterRoutes);
app.use("/api/flash-sales", flashSaleRoutes);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// -----------------------------
// Admin frontend (dev proxy or production static)
// -----------------------------
const ADMIN_DEV_SERVER = process.env.ADMIN_DEV_SERVER || "http://localhost:5174";
const adminDistPath = path.join(process.cwd(), "admin", "dist");

if (process.env.NODE_ENV === "production") {
  if (fs.existsSync(adminDistPath)) {
    app.use("/admin", express.static(adminDistPath));
    app.get("/admin/*", (req, res) =>
      res.sendFile(path.join(adminDistPath, "index.html"))
    );
    logger.info(`Serving admin from ${adminDistPath}`);
  } else {
    logger.warn(
      `Admin build not found at ${adminDistPath}. Please run 'npm run build' inside the admin folder.`
    );
  }
} else {
  app.use(
    "/admin",
    createProxyMiddleware({ target: ADMIN_DEV_SERVER, changeOrigin: true, ws: true })
  );
  logger.info(`Proxying /admin to ${ADMIN_DEV_SERVER}`);
}

// -----------------------------
// HTTP Server + Socket.IO
// -----------------------------
const server = http.createServer(app);
const io = new Server(server, {
  transports: ["websocket", "polling"],
  cors: {
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // allow server-to-server
      const strippedOrigin = origin.replace(/\/+$/, "");
      if (allowedOrigins.includes(strippedOrigin)) {
        callback(null, true); // ✅ Changed from 'strippedOrigin' to 'true'
      } else {
        logger.warn(`Blocked Socket.IO origin: ${strippedOrigin}`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  logger.info(`Socket connected: ${socket.id}`);

  socket.on("disconnect", (reason) => {
    logger.info(`Socket disconnected: ${socket.id} | Reason: ${reason}`);
  });
});

global.io = io;

// -----------------------------
// Start server after DB connection
// -----------------------------
connectToDB()
  .then(() => {
    server.listen(PORT, () => {
      logger.info(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    logger.error(`DB Connection Failed: ${err.message}`);
  });
