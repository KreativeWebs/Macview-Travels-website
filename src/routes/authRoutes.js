import express from "express";
import bcrypt from "bcryptjs"; // for password encryption
import User from "../models/User.js";

const router = express.Router();

// SIGNUP ROUTE
router.post("/signup", async (req, res) => {
  try {
    // 1️⃣ Get email and password from the request body
    const { email, password } = req.body;

    // 2️⃣ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 3️⃣ Encrypt (hash) the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Create a new user
    const newUser = await User.create({
      email,
      password: hashedPassword,
    });

    // 5️⃣ Send success response
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
