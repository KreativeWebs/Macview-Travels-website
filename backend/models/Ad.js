import mongoose from "mongoose";

const adSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true, // Cloudinary URL
    },
    link: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      enum: ["right", "inline", "bottom"],
      default: "right",
    },
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Ad", adSchema);
