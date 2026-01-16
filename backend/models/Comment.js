import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
    user: {
      type: String, // For simplicity, using name or email; can be expanded to User ref
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    replies: [
      {
        user: {
          type: String,
          required: true,
        },
        reply: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Comment", commentSchema);
