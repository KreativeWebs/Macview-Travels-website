import Ad from "../models/Ad.js";

export const getAdsByBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const ads = await Ad.find({ blogId });
    res.json({ ads });
  } catch (error) {
    console.error("Error fetching ads:", error);
    res.status(500).json({ message: "Error fetching ads" });
  }
};

export const createAd = async (req, res) => {
  try {
    const { link, position, blogId } = req.body;
    const image = req.file ? req.file.path : null;

    if (!image) {
      return res.status(400).json({ message: "Image is required" });
    }

    const ad = new Ad({
      image,
      link,
      position,
      blogId,
    });

    await ad.save();
    res.status(201).json({ message: "Ad created successfully", ad });
  } catch (error) {
    console.error("Error creating ad:", error);
    res.status(500).json({ message: "Error creating ad" });
  }
};

export const updateAd = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    if (req.file) {
      updates.image = req.file.path;
    }

    const ad = await Ad.findByIdAndUpdate(id, updates, { new: true });
    if (!ad) {
      return res.status(404).json({ message: "Ad not found" });
    }

    res.json({ message: "Ad updated successfully", ad });
  } catch (error) {
    console.error("Error updating ad:", error);
    res.status(500).json({ message: "Error updating ad" });
  }
};

export const deleteAd = async (req, res) => {
  try {
    const { id } = req.params;
    const ad = await Ad.findByIdAndDelete(id);
    if (!ad) {
      return res.status(404).json({ message: "Ad not found" });
    }

    res.json({ message: "Ad deleted successfully" });
  } catch (error) {
    console.error("Error deleting ad:", error);
    res.status(500).json({ message: "Error deleting ad" });
  }
};

export const getAllAds = async (req, res) => {
  try {
    const ads = await Ad.find().populate('blogId', 'title').sort({ createdAt: -1 });
    res.json({ ads });
  } catch (error) {
    console.error("Error fetching all ads:", error);
    res.status(500).json({ message: "Error fetching all ads" });
  }
};
