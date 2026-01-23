import mongoose from "mongoose";

const packageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    nights: {
      type: Number,
      required: true,
      min: 1,
    },
    persons: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      enum: ["NGN", "USD"],
      default: "NGN",
    },
    backgroundImage: {
      type: String,
      required: true, // Cloudinary URL
    },
    inclusions: [{
      type: String,
      trim: true,
    }],
    requirements: [{
      label: {
        type: String,
        required: true,
        trim: true,
      },
      type: {
        type: String,
        enum: ["text", "upload"],
        required: true,
      },
      description: {
        type: String,
        trim: true,
      },
    }],
    isActive: {
      type: Boolean,
      default: true,
    },
    promoCode: {
      type: String,
      trim: true,
      default: "",
    },
    discountPercentage: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Package", packageSchema);
