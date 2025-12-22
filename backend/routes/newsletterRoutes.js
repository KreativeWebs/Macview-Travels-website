import express from "express";
import Newsletter from "../models/Newsletter.js";
import { sendWelcomeNewsletterEmail } from "../utils/sendEmail.js";

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

    const normalizedEmail = email.trim().toLowerCase();

    const exists = await Newsletter.findOne({ email: normalizedEmail });
    if (exists) {
      return res.status(400).json({ message: "Email already subscribed" });
    }

    await Newsletter.create({ email: normalizedEmail });

    // ALWAYS send welcome email on successful subscription
    await sendWelcomeNewsletterEmail(
      normalizedEmail,
      "Welcome to Macview Travels Newsletter ✈️",
      "You're now subscribed and will receive travel updates, deals, and offers."
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
// UNSUBSCRIBE USER
// ------------------------
router.delete("/unsubscribe/:email", async (req, res) => {
  try {
    const email = decodeURIComponent(req.params.email).trim().toLowerCase();

    console.log("📩 UNSUBSCRIBE HIT");
    console.log("📧 Email received:", email);

    const deleted = await Newsletter.deleteOne({ email });

    console.log("🗑️ Delete result:", deleted);

    if (deleted.deletedCount === 0) {
      return res.status(404).json({ message: "Email not found" });
    }

    res.json({ message: "Unsubscribed successfully" });
  } catch (error) {
    console.error("Unsubscribe error:", error);
    res.status(500).json({ message: "Failed to unsubscribe" });
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
