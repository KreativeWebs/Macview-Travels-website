import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

export const authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] || req.cookies.refreshToken;

    if (!token) {
      return res.status(401).json({ success: false, message: "No access token provided" });
    }

    let decoded;
    try {
      // Try to verify as access token first (admin login creates access tokens)
      decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (accessError) {
      try {
        // If access token verification fails, try refresh token secret
        decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
      } catch (refreshError) {
        throw new Error("Invalid token signature");
      }
    }

    const admin = await Admin.findById(decoded.id);

    if (!admin || !admin.isActive) {
      return res.status(401).json({ success: false, message: "Invalid admin token" });
    }

    req.admin = admin;
    next();
  } catch (error) {
    console.error("Admin authentication error:", error);
    res.status(401).json({ success: false, message: "Authentication failed" });
  }
};
