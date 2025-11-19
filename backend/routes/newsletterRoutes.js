import express from "express";
import Newsletter from "../models/Newsletter.js";
import { sendNewsletterEmail } from "../utils/sendEmail.js";

const router = express.Router();

// ------------------------
// SUBSCRIBE USER
// ------------------------
router.post("/subscribe", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const exists = await Newsletter.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already subscribed" });
    }

    await Newsletter.create({ email });

    // Send welcome newsletter email
    await sendNewsletterEmail(
      email,
      "Welcome to our Newsletter!",
      "🎉 You're now subscribed!<br>You will now receive updates and new package alerts from us."
    );

    res.json({ message: "Subscribed successfully!" });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ------------------------
// ADMIN — SEND NEWSLETTER TO ALL SUBSCRIBERS
// ------------------------
router.post("/send-newsletter", async (req, res) => {
  try {
    const { subject, message } = req.body;

    if (!subject || !message) {
      return res.status(400).json({ message: "Subject & message required" });
    }

    const subscribers = await Newsletter.find().select("email");

    const sendPromises = subscribers.map((sub) =>
      sendNewsletterEmail(sub.email, subject, message)
    );

    await Promise.all(sendPromises);

    res.json({ message: "Newsletter sent successfully!" });
  } catch (error) {
    console.error("Send newsletter error:", error);
    res.status(500).json({ message: "Failed to send newsletter" });
  }
});

// ------------------------
// ADMIN — GET ALL SUBSCRIBERS
// ------------------------
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
