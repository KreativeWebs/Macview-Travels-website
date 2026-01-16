import Comment from "../models/Comment.js";

export const getCommentsByBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const comments = await Comment.find({ blogId }).sort({ date: -1 });
    res.json({ comments });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Error fetching comments" });
  }
};

export const createComment = async (req, res) => {
  try {
    const { blogId, user, comment } = req.body;

    const newComment = new Comment({
      blogId,
      user,
      comment,
    });

    await newComment.save();
    res.status(201).json({ message: "Comment created successfully", comment: newComment });
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ message: "Error creating comment" });
  }
};

export const replyToComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { reply } = req.body;
    const user = "admin"; // Use "admin" as the user for replies

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    comment.replies.push({ user, reply });
    await comment.save();

    res.json({ message: "Reply added successfully", comment });
  } catch (error) {
    console.error("Error replying to comment:", error);
    res.status(500).json({ message: "Error replying to comment" });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByIdAndDelete(id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Error deleting comment" });
  }
};

export const deleteReply = async (req, res) => {
  try {
    const { commentId, replyIndex } = req.params;
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    const index = parseInt(replyIndex, 10);
    if (isNaN(index) || index < 0 || index >= comment.replies.length) {
      return res.status(400).json({ message: "Invalid reply index" });
    }
    comment.replies.splice(index, 1);
    await comment.save();
    res.json({ message: "Reply deleted successfully", comment });
  } catch (error) {
    console.error("Error deleting reply:", error);
    res.status(500).json({ message: "Error deleting reply" });
  }
};

export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find().populate('blogId', 'title').sort({ createdAt: -1 });
    res.json({ comments });
  } catch (error) {
    console.error("Error fetching all comments:", error);
    res.status(500).json({ message: "Error fetching all comments" });
  }
};
