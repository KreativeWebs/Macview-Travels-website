import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import User from "../models/User.js";

export const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] || req.cookies.refreshToken;

    if (!token) {
      return res.status(401).json({ success: false, message: "No access token provided" });
    }

    let decoded;
    try {
      // Try to verify as access token first
      decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (accessError) {
      if (accessError.name === 'TokenExpiredError') {
        // Try to refresh using refresh token from cookies
        const refreshToken = req.cookies.refreshToken;
        if (refreshToken) {
          try {
            const refreshDecoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            // Create new access token
            const newAccessToken = jwt.sign({ id: refreshDecoded.id }, process.env.ACCESS_TOKEN_SECRET, {
              expiresIn: "15m",
            });
            // Set the new token in the header for this request
            req.headers.authorization = `Bearer ${newAccessToken}`;
            decoded = jwt.verify(newAccessToken, process.env.ACCESS_TOKEN_SECRET);
          } catch (refreshError) {
            throw new Error("Invalid token signature");
          }
        } else {
          throw new Error("Invalid token signature");
        }
      } else {
        // Try refresh token secret for backward compatibility
        try {
          decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        } catch (refreshError) {
          throw new Error("Invalid token signature");
        }
      }
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid user token" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("User authentication error:", error);
    res.status(401).json({ success: false, message: "Authentication failed" });
  }
};

export const authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      console.warn(`Admin auth: no token provided in Authorization header`);
      return res.status(404).json({ success: false, message: "No access token provided" });
    }

    let decoded;
    try {
      // Verify as access token
      decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (error) {
      console.warn(`Admin auth: token verification failed: ${error.message}`);
      if (error.name === 'TokenExpiredError') {
        return res.status(404).json({ success: false, message: "Access token expired. Please login again." });
      }
      return res.status(404).json({ success: false, message: "Invalid token" });
    }

    const admin = await Admin.findById(decoded.id);

    if (!admin || !admin.isActive) {
      console.warn(`Admin auth: admin not found or inactive for id ${decoded.id}`);
      return res.status(401).json({ success: false, message: "Invalid admin token" });
    }

    req.admin = admin;
    next();
  } catch (error) {
    console.error("Admin authentication error:", error.message || error);
    res.status(404).json({ success: false, message: "Authentication failed" });
  }
};
