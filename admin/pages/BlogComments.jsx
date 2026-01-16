import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "../src/api/adminAxios";

export default function BlogComments() {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("/blogs");
      setBlogs(response.data.blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      toast.error("Error fetching blogs");
    }
  };

  const fetchComments = async (blogId) => {
    setLoading(true);
    try {
      const response = await axios.get(`/comments/${blogId}`);
      setComments(response.data.comments);
      setSelectedBlog(blogId);
    } catch (error) {
      console.error("Error fetching comments:", error);
      toast.error("Error fetching comments");
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async (commentId, reply) => {
    try {
      await axios.post(`/comments/${commentId}/reply`, { reply });
      toast.success("Reply posted successfully!");
      fetchComments(selectedBlog);
    } catch (error) {
      console.error("Error posting reply:", error);
      toast.error("Error posting reply");
    }
  };

  const handleDeleteReply = async (commentId, replyIndex) => {
    try {
      await axios.delete(`/comments/${commentId}/reply/${replyIndex}`);
      toast.success("Reply deleted successfully!");
      fetchComments(selectedBlog);
    } catch (error) {
      console.error("Error deleting reply:", error);
      toast.error("Error deleting reply");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`/comments/${commentId}`);
      toast.success("Comment deleted successfully!");
      fetchComments(selectedBlog);
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("Error deleting comment");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Blog Comments Management</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4">
                  <h5>Select Blog</h5>
                  <div className="list-group">
                    {blogs.map((blog) => (
                      <button
                        key={blog._id}
                        className={`list-group-item list-group-item-action ${
                          selectedBlog === blog._id ? "active" : ""
                        }`}
                        onClick={() => fetchComments(blog._id)}
                      >
                        {blog.title}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="col-md-8">
                  <h5>Comments</h5>
                  {loading ? (
                    <p>Loading comments...</p>
                  ) : selectedBlog ? (
                    comments.length > 0 ? (
                      comments.map((comment) => (
                        <div key={comment._id} className="card mb-3">
                          <div className="card-body">
                            <div className="d-flex justify-content-between align-items-start">
                              <h6 className="card-title">{comment.user}</h6>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDeleteComment(comment._id)}
                              >
                                Delete Comment
                              </button>
                            </div>
                            <p className="card-text">{comment.comment}</p>
                            <small className="text-muted">
                              {new Date(comment.date).toLocaleDateString()}
                            </small>
                            <div className="mt-3">
                              <h6>Replies</h6>
                              {comment.replies.map((reply, index) => (
                                <div key={index} className="border-start border-primary ps-3 mb-2 d-flex justify-content-between align-items-start">
                                  <div>
                                    <strong>{reply.user}:</strong> {reply.reply}
                                    <br />
                                    <small className="text-muted">
                                      {new Date(reply.date).toLocaleDateString()}
                                    </small>
                                  </div>
                                  <button
                                    className="btn btn-sm btn-outline-danger ms-2"
                                    onClick={() => handleDeleteReply(comment._id, index)}
                                  >
                                    Delete
                                  </button>
                                </div>
                              ))}
                              <ReplyForm
                                commentId={comment._id}
                                onReply={handleReply}
                              />
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No comments for this blog.</p>
                    )
                  ) : (
                    <p>Select a blog to view comments.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReplyForm({ commentId, onReply }) {
  const [reply, setReply] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reply.trim()) {
      onReply(commentId, reply);
      setReply("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Write a reply..."
          value={reply}
          onChange={(e) => setReply(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          Reply
        </button>
      </div>
    </form>
  );
}
