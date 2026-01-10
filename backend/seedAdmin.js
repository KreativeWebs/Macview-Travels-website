import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import Admin from "./models/Admin.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// ES module dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load root .env
dotenv.config({ path: path.resolve(__dirname, "../.env") });

async function seedAdmin() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined");
    }

    await mongoose.connect(process.env.MONGO_URI);

    const adminEmail = process.env.ADMIN_EMAIL || "admin@macviewtravels.com";
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      throw new Error("ADMIN_PASSWORD is not defined");
    }

    const hashedPassword = await bcryptjs.hash(adminPassword, 10);

    const admin = await Admin.findOneAndUpdate(
      { email: adminEmail },
      {
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
        isActive: true,
      },
      { upsert: true, new: true }
    );

    console.log(`Admin seeded/updated: ${admin.email}`);
  } catch (error) {
    console.error("Error seeding admin:", error.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seedAdmin();
