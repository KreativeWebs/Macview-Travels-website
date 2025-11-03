import visaRequirements from "../models/visaRequirements.js";

// @desc    Get visa requirements by country
// @route   GET /api/visa/requirements/:country
// @access  Public
export const getVisaRequirements = async (req, res) => {
  try {
    const { country } = req.params;

    // Find visa info by country (case-insensitive)
    const visaData = await visaRequirements.findOne({
      country: { $regex: new RegExp(`^${country}$`, "i") },
    });

    if (!visaData) {
      return res.status(404).json({ message: "Visa information not found." });
    }

    res.status(200).json(visaData);
  } catch (error) {
    console.error("Error fetching visa requirements:", error);
    res.status(500).json({ message: "Server error while fetching visa requirements." });
  }
};
