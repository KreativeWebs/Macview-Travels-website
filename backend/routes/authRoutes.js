import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Load .env from root (go up two levels: routes -> backend -> root)
dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

import express from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import admin from 'firebase-admin';

const router = express.Router();

try {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    })
  });
  console.log("✅ Firebase Admin initialized successfully");
} catch (error) {
  console.error("❌ Firebase Admin initialization failed:", error.message);
}




// Create Access Token (15m)
const createAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

// Create Refresh Token (7 days)
const createRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

// Set Refresh Token as cookie
const setRefreshCookie = (res, token) => {
  res.cookie("refreshToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

/* ================================
   SIGNUP
================================ */
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ success: false });
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ success: false });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });

    const accessToken = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id);
    setRefreshCookie(res, refreshToken);

    res.status(201).json({
      success: true,
      user,
      accessToken,
    });
  } catch (error) {
    res.status(500).json({ success: false });
  }
});


/* ================================
   LOGIN
================================ */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false });

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ success: false });

    const accessToken = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id);
    setRefreshCookie(res, refreshToken);

    res.status(200).json({
      success: true,
      user,
      accessToken,
    });
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

/* ================================
   REFRESH TOKEN ROUTE
================================ */
router.post("/refresh", async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: "No refresh token" });

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const accessToken = createAccessToken(decoded.id);
    res.json({ accessToken });
  } catch (error) {
    res.status(401).json({ message: "Invalid refresh token" });
  }
});

/* ================================
   FETCH USER
================================ */
router.get("/fetchuser", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "No access token provided" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    res.json({ user });
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
});


/* ================================
   GOOGLE LOGIN
================================ */
router.post("/google-login", async (req, res) => {
  const { idToken, email } = req.body;
  
  try {
    // Verify the Firebase token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    
    if (decodedToken.email !== email) {
      return res.status(400).json({ message: "Email mismatch" });
    }
    
    // Find or create user
    let user = await User.findOne({ email });
    
    if (!user) {
      // Create new user for Google auth (no password needed)
      user = await User.create({ 
        email,
        password: await bcryptjs.hash(Math.random().toString(36), 10), // random password
        authProvider: 'google'
      });
    }
    
    const accessToken = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id);
    
    setRefreshCookie(res, refreshToken);
    
    res.status(200).json({
      user,
      accessToken,
      message: "Google login successful",
    });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(401).json({ message: "Invalid Google token" });
  }
});



/* ================================
   LOGOUT
================================ */
router.post("/logout", (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out successfully" });
});

export default router;
