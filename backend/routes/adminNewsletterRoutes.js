import express from "express";
import Newsletter from "../models/Newsletter.js";
import { sendWelcomeNewsletterEmail } from "../backend/utils/sendEmail.js";

const router = express.Router();

// ADMIN — SEND NEWSLETTER TO ALL SUBSCRIBERS
router.post("/send-newsletter", async (req, res) => {
  try {
    const { subject, message } = req.body;
    if (!subject || !message)
      return res.status(400).json({ message: "Subject & message required" });

    const subscribers = await Newsletter.find().select("email");

    await Promise.all(
      subscribers.map((sub) => sendWelcomeNewsletterEmail(sub.email, subject, message))
    );

    res.json({ message: "Newsletter sent successfully!" });
  } catch (error) {
    console.error("Send newsletter error:", error);
    res.status(500).json({ message: "Failed to send newsletter" });
  }
});

// ADMIN — GET ALL SUBSCRIBERS
router.get("/subscribers", async (req, res) => {
  try {
    const list = await Newsletter.find().sort({ subscribedAt: -1 });
    res.json(list);
  } catch (error) {
    console.error("Fetch subscribers error:", error);
    res.status(500).json({ message: "Failed to fetch subscribers" });
  }
});

export default router;
