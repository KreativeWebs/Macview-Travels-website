import express from "express";
import crypto from "crypto";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import admin from "../config/firebase.js";
import PasswordResetToken from "../models/PasswordResetToken.js";
import { body, validationResult } from "express-validator";
import { sendPasswordResetEmail, sendWelcomeEmail } from "../utils/sendEmail.js";

const router = express.Router();


// ===============================
// JWT HELPERS
// ===============================
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

    // Send welcome email
    try {
      await sendWelcomeEmail(user.email);
    } catch (emailError) {
      console.error("Welcome email failed:", emailError);
      // Don't fail signup if email fails
    }

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
   REFRESH TOKEN
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
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    if (decodedToken.email !== email) {
      return res.status(400).json({ message: "Email mismatch" });
    }

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

    // Send welcome email for new Google users
    if (isNewUser) {
      try {
        await sendWelcomeEmail(user.email);
      } catch (emailError) {
        console.error("Welcome email failed:", emailError);
        // Don't fail login if email fails
      }
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

/* ================================
 FORGOT PASSWORD
================================ */
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Delete existing reset tokens for the user (if any)
    await PasswordResetToken.deleteMany({ userId: user._id });

    // Generate a new token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Save token to DB
    await PasswordResetToken.create({
      userId: user._id,
      token: hashedToken,
    });

    // Reset link for frontend
    const resetURL = `${process.env.CLIENT_URL || 'http://localhost:5173'}/reset-password/${resetToken}`;

    // Send email using reusable helper
    await sendPasswordResetEmail(user.email, resetURL);

    res.json({ message: "Password reset email sent successfully" });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

/* ================================
  RESET PASSWORD
================================== */
router.post("/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password || password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    // Hash the token from URL to compare with stored hash
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const resetToken = await PasswordResetToken.findOne({
      token: hashedToken,
    });

    if (!resetToken) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired password reset link",
      });
    }

    // Update password
    const hashedPassword = await bcryptjs.hash(password, 10);
    await User.findByIdAndUpdate(resetToken.userId, { password: hashedPassword });

    // Delete the used token
    await PasswordResetToken.deleteOne({ _id: resetToken._id });

    res.json({
      success: true,
      message: "Password reset successful! You can now login.",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
    });
  }
});

export default router;
