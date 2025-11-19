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
