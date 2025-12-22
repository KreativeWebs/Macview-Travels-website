import visaRequirements from "../models/visaRequirements.js";
import VisaApplication from "../models/visaApplication.js";

// @desc    Get visa requirements by country
// @route   GET /api/visa/requirements/:country
// @access  Public
export const getVisaRequirements = async (req, res) => {
  try {
    const { country } = req.params;

    // Find visa info by country (case-insensitive and flexible matching)
    // First try exact match, then try partial matches
    let visaData = await visaRequirements.findOne({
      country: { $regex: new RegExp(`^${country}$`, "i") },
    });

    // If no exact match, try partial matching (e.g., "South Africa" might match "SouthAfrica")
    if (!visaData) {
      const normalizedCountry = country.replace(/\s+/g, '').toLowerCase();
      visaData = await visaRequirements.findOne({
        country: { $regex: new RegExp(normalizedCountry, "i") },
      });
    }

    // If still no match, try matching the first word (e.g., "Morocco Sticker" might match "Morocco")
    if (!visaData) {
      const firstWord = country.split(' ')[0];
      visaData = await visaRequirements.findOne({
        country: { $regex: new RegExp(`^${firstWord}`, "i") },
      });
    }

    if (!visaData) {
      return res.status(404).json({ message: `Visa information not found for country: ${country}` });
    }

    res.status(200).json(visaData);
  } catch (error) {
    console.error("Error fetching visa requirements:", error);
    res.status(500).json({ message: "Server error while fetching visa requirements." });
  }
};
