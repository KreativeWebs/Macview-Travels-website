import mongoose from "mongoose";

const flashSaleSchema = new mongoose.Schema(
  {
    backgroundImage: {
      type: String,
      required: true, // Cloudinary URL
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    destinationCity: {
      type: String,
      required: true,
      trim: true,
    },
    departureCity: {
      type: String,
      required: true,
      trim: true,
    },
    dateValidFrom: {
      type: Date,
      required: true,
    },
    dateValid: {
      type: Date,
      required: true,
    },
    airline: {
      type: String,
      required: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("FlashSale", flashSaleSchema);
