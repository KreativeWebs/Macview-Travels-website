import express from "express";
import Package from "../models/Package.js";
import PackageBooking from "../models/PackageBooking.js";
import upload from "../config/multer.js";
import axios from "axios";  

const router = express.Router();

// -----------------------------------------------------------
// GET USD → NGN Exchange Rate
// -----------------------------------------------------------
router.get("/exchange-rate", async (req, res) => {
  try {
    // Try multiple APIs in order of preference
    const apis = [
      {
        url: "https://api.exchangerate-api.com/v4/latest/USD",
        getRate: (data) => data.rates?.NGN
      },
      {
        url: "https://api.exchangerate.host/live?access_key=af79230d873ce3be3626d44397c7ec40&currencies=NGN",
        getRate: (data) => data.quotes?.USDNGN
      }
    ];

    let rate = null;
    let lastError = null;

    for (const api of apis) {
      try {
        console.log(`Trying exchange rate API: ${api.url}`);
        const response = await axios.get(api.url, { timeout: 5000 });
        rate = api.getRate(response.data);

        if (rate && rate > 0) {
          console.log(`Successfully got exchange rate: ${rate}`);
          break;
        }
      } catch (error) {
        console.log(`API ${api.url} failed:`, error.message);
        lastError = error;
        continue;
      }
    }

    if (!rate || rate <= 0) {
      // Use a reasonable fallback rate (approximate USD to NGN)
      rate = 1500;
      console.log("Using fallback exchange rate:", rate);
    }

    res.json({ rate });
  } catch (error) {
    console.error("Exchange rate error:", error.message);
    // Return fallback rate instead of error
    res.json({ rate: 1500 });
  }
});

// -----------------------------------------------------------
// Get all active packages
// -----------------------------------------------------------
router.get("/", async (req, res) => {
  try {
    const packages = await Package.find({ isActive: true }).sort({ createdAt: -1 });
    res.json({ packages });
  } catch (error) {
    console.error("Error fetching packages:", error);
    res.status(500).json({ message: "Error fetching packages" });
  }
});

// -----------------------------------------------------------
// Get single package by ID
// -----------------------------------------------------------
router.get("/:id", async (req, res) => {
  try {
    const packageData = await Package.findById(req.params.id);

    if (!packageData) {
      return res.status(404).json({ message: "Package not found" });
    }

    res.json({ package: packageData });
  } catch (error) {
    console.error("Error fetching package:", error);
    res.status(500).json({ message: "Error fetching package" });
  }
});

// -----------------------------------------------------------
// Upload Document to Cloudinary
// -----------------------------------------------------------
router.post("/upload-document", upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "No file uploaded"
      });
    }

    return res.json({
      success: true,
      fileUrl: req.file.path,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// -----------------------------------------------------------
// Validate Promo Code
// -----------------------------------------------------------
router.post("/:id/validate-promo", async (req, res) => {
  try {
    const { promoCode } = req.body;
    const packageData = await Package.findById(req.params.id);

    if (!packageData) {
      return res.status(404).json({ message: "Package not found" });
    }

    if (!packageData.promoCode || packageData.promoCode.toLowerCase() !== promoCode.toLowerCase()) {
      return res.status(400).json({ valid: false, message: "Invalid promo code" });
    }

    const discount = (packageData.price * packageData.discountPercentage) / 100;
    const discountedPrice = packageData.price - discount;

    res.json({
      valid: true,
      discountPercentage: packageData.discountPercentage,
      originalPrice: packageData.price,
      discountedPrice,
      currency: packageData.currency
    });
  } catch (error) {
    console.error("Error validating promo code:", error);
    res.status(500).json({ message: "Error validating promo code" });
  }
});

// -----------------------------------------------------------
// Book Package
// -----------------------------------------------------------
router.post("/book", async (req, res) => {
  try {
    const { fullName, whatsappNumber, travelDate, packageId, packageTitle, packagePrice, packageCurrency, documents, email } = req.body;

    // Fetch package details to get city
    const packageData = await Package.findById(packageId);
    if (!packageData) {
      return res.status(404).json({ success: false, message: "Package not found" });
    }

    const userId = req.user ? req.user.id : null;

    const newBooking = new PackageBooking({
      userId,
      fullName,
      email,
      whatsappNumber,
      travelDate,
      packageId,
      packageTitle,
      packagePrice,
      packageCurrency,
      packageCity: packageData.city,
      documents,
      payment: req.body.payment,
      status: "received",
    });

    await newBooking.save();

    // Emit Socket.IO notifications
    if (global.io) {
      global.io.emit("newPackageBooking", {
        id: newBooking._id,
        fullName: newBooking.fullName,
        email: newBooking.email,
        whatsappNumber: newBooking.whatsappNumber,
        travelDate: newBooking.travelDate,
        packageTitle: newBooking.packageTitle,
        packagePrice: newBooking.packagePrice,
        packageCurrency: newBooking.packageCurrency,
        documents: newBooking.documents,
        status: newBooking.status,
        createdAt: newBooking.createdAt,
        isNew: true,
      });

      const PackageBookingModel = (await import("../models/PackageBooking.js")).default;
      const bookingCount = await PackageBookingModel.countDocuments();
      global.io.emit("statsUpdate", { packageBookings: bookingCount });
    }

    res.status(201).json({
      success: true,
      message: "✅ Package booking submitted successfully!",
      data: newBooking,
    });

  } catch (error) {
    console.error("❌ Error submitting package booking:", error);
    res.status(500).json({
      success: false,
      message: "Server error while submitting package booking.",
      error: error.message,
    });
  }
});

export default router;
