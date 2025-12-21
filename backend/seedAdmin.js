import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import Admin from "./models/Admin.js";

import dotenv from "dotenv";
dotenv.config();

async function seedAdmin() {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/macviewtravels"
    );

    const adminExists = await Admin.findOne({
      email: "admin@macviewtravels.com",
    });
    if (adminExists) {
      process.exit(0);
    }

    const hashedPassword = await bcryptjs.hash("Admin@123", 10);
    const admin = new Admin({
      email: "admin@macviewtravels.com",
      password: hashedPassword,
      role: "admin",
      isActive: true,
    });

    await admin.save();
  } catch (error) {
    console.error("Error seeding admin:", error);
  } finally {
    await mongoose.disconnect();
  }
}

seedAdmin();
