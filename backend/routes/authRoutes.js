import express from "express";
import crypto from "crypto";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Admin from "../models/Admin.js";
import admin from "../config/firebase.js";
import PasswordResetToken from "../models/PasswordResetToken.js";
import { sendPasswordResetEmail, sendWelcomeEmail } from "../utils/sendEmail.js";

const router = express.Router();

/* ===============================
   JWT HELPERS
================================ */
const createAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

const createRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

// Set refresh cookie with dev + prod support
const setRefreshCookie = (res, token) => {
  res.cookie("refreshToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "Strict" : "Lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

/* ================================
   SIGNUP
================================ */
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return res.status(400).json({ success: false, message: "Email & password required" });

    const emailExists = await User.findOne({ email });
    if (emailExists)
      return res.status(400).json({ success: false, message: "Email already exists" });

    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });

    // Send welcome email (non-blocking)
    try { await sendWelcomeEmail(user.email); } catch (err) { console.error("Welcome email failed:", err); }

    const accessToken = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id);
    setRefreshCookie(res, refreshToken);

    res.status(201).json({ success: true, user, accessToken });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* ================================
   LOGIN
================================ */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const accessToken = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id);
    setRefreshCookie(res, refreshToken);

    res.status(200).json({ success: true, user, accessToken });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* ================================
   REFRESH TOKEN (POST)
   For silent login on frontend
================================ */
router.post("/refresh", async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: "No refresh token" });

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const accessToken = createAccessToken(decoded.id);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ accessToken, user });
  } catch (error) {
    console.error("Refresh token error:", error);
    res.status(401).json({ message: "Invalid or expired refresh token" });
  }
});

/* ================================
   FETCH USER (AUTH REQUIRED)
================================ */
router.get("/fetchuser", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No access token provided" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    let user = await User.findById(decoded.id).select("-password");
    if (!user) user = await Admin.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user });
  } catch (error) {
    console.error("Fetch user error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
});

/* ================================
   GOOGLE LOGIN
================================ */
router.post("/google-login", async (req, res) => {
  const { idToken, email } = req.body;
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    if (decodedToken.email !== email) return res.status(400).json({ message: "Email mismatch" });

    let user = await User.findOne({ email });
    let isNewUser = false;
    if (!user) {
      user = await User.create({
        email,
        password: await bcryptjs.hash(Math.random().toString(36), 10),
        authProvider: "google",
      });
      isNewUser = true;
    }

    if (isNewUser) try { await sendWelcomeEmail(user.email); } catch (err) { console.error(err); }

    const accessToken = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id);
    setRefreshCookie(res, refreshToken);

    res.status(200).json({ user, accessToken, message: "Google login successful" });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(401).json({ message: "Invalid Google token" });
  }
});

/* ================================
   LOGOUT
================================ */
router.post("/logout", (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "Strict" : "Lax",
  });
  res.json({ message: "Logged out successfully" });
});

/* ================================
   FORGOT PASSWORD
================================ */
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    await PasswordResetToken.deleteMany({ userId: user._id });

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    await PasswordResetToken.create({ userId: user._id, token: hashedToken });

    const resetURL = `${process.env.CLIENT_URL || "http://localhost:5173"}/reset-password/${resetToken}`;
    await sendPasswordResetEmail(user.email, resetURL);

    res.json({ message: "Password reset email sent successfully" });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

/* ================================
   RESET PASSWORD
================================ */
router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!password || password.length < 8)
    return res.status(400).json({ success: false, message: "Password must be at least 8 characters" });

  try {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const resetToken = await PasswordResetToken.findOne({ token: hashedToken });
    if (!resetToken) return res.status(400).json({ success: false, message: "Invalid or expired link" });

    const hashedPassword = await bcryptjs.hash(password, 10);
    await User.findByIdAndUpdate(resetToken.userId, { password: hashedPassword });
    await PasswordResetToken.deleteOne({ _id: resetToken._id });

    res.json({ success: true, message: "Password reset successful! You can now login." });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
});

/* ================================
   ADMIN LOGIN
================================ */
router.post("/admin/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const adminUser = await Admin.findOne({ email });
    if (!adminUser) return res.status(400).json({ success: false, message: "Invalid admin credentials" });

    if (adminUser.lockUntil && adminUser.lockUntil > Date.now())
      return res.status(423).json({ success: false, message: "Admin account temporarily locked" });

    const isPasswordValid = await bcryptjs.compare(password, adminUser.password);
    if (!isPasswordValid) {
      adminUser.loginAttempts += 1;
      if (adminUser.loginAttempts >= 3) adminUser.lockUntil = Date.now() + 60 * 60 * 1000;
      await adminUser.save();
      return res.status(400).json({ success: false, message: "Invalid admin credentials" });
    }

    adminUser.loginAttempts = 0;
    adminUser.lockUntil = undefined;
    adminUser.lastLogin = new Date();

    const clientIP = req.ip || req.connection.remoteAddress || req.socket?.remoteAddress;
    if (clientIP && !adminUser.ipAddresses.includes(clientIP)) adminUser.ipAddresses.push(clientIP);

    await adminUser.save();

    const accessToken = createAccessToken(adminUser._id);
    const refreshToken = createRefreshToken(adminUser._id);
    setRefreshCookie(res, refreshToken);

    res.status(200).json({
      success: true,
      user: {
        _id: adminUser._id,
        email: adminUser.email,
        role: adminUser.role,
        lastLogin: adminUser.lastLogin,
        ipAddresses: adminUser.ipAddresses,
      },
      accessToken,
      message: "Admin login successful",
    });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
