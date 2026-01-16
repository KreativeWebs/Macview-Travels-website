import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../api";
import HeroHeader from "./HeroHeader";
import BlogCard from "../components/BlogCard";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

function truncateAtSentence(content, maxLength) {
  if (content.length <= maxLength) return content;
  const truncated = content.substring(0, maxLength);
  const lastSentenceEnd = Math.max(
    truncated.lastIndexOf('.'),
    truncated.lastIndexOf('!'),
    truncated.lastIndexOf('?')
  );
  if (lastSentenceEnd > 0) {
    return truncated.substring(0, lastSentenceEnd + 1) + '...';
  }
  // Fallback to word boundary
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  if (lastSpaceIndex > 0) {
    return truncated.substring(0, lastSpaceIndex) + '...';
  }
  return truncated + '...';
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();

  // Add ordinal suffix to day
  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  return `Published on ${day}${getOrdinalSuffix(day)} of ${month} ${year}`;
}

export default function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [ads, setAds] = useState([]);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentForm, setCommentForm] = useState({ user: "", comment: "" });
  const [replyForm, setReplyForm] = useState({ commentId: "", reply: "" });

  useEffect(() => {
    fetchBlogDetails();
  }, [id]);

  const fetchBlogDetails = async () => {
    try {
      const [blogRes, commentsRes, adsRes, relatedRes] = await Promise.all([
        axios.get(`/api/blogs/${id}`),
        axios.get(`/api/comments/blog/${id}`),
        axios.get(`/api/ads/blog/${id}`),
        axios.get("/api/blogs/recent"),
      ]);

      setBlog(blogRes.data.blog);
      setComments(commentsRes.data.comments);
      setAds(adsRes.data.ads);
      setRelatedBlogs(
        relatedRes.data.blogs.filter((b) => b._id !== id).slice(0, 3)
      );
    } catch (error) {
      console.error("Error fetching blog details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentForm.user.trim() || !commentForm.comment.trim()) return;

    try {
      await axios.post(`/api/comments`, { ...commentForm, blogId: id });
      setCommentForm({ user: "", comment: "" });
      fetchBlogDetails();
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const handleReplySubmit = async (commentId, reply) => {
    try {
      await axios.post(`/api/comments/reply/${commentId}`, { reply });
      setReplyForm({ commentId: "", reply: "" });
      fetchBlogDetails();
    } catch (error) {
      console.error("Error posting reply:", error);
    }
  };

  const insertInlineAds = (content, inlineAds) => {
    if (inlineAds.length === 0) return content;

    // Simple implementation: insert ads after every few paragraphs
    const paragraphs = content.split("</p>");
    const result = [];
    let adIndex = 0;

    paragraphs.forEach((para, index) => {
      result.push(para + (para.trim() ? "</p>" : ""));
      if ((index + 1) % 3 === 0 && adIndex < inlineAds.length) {
        // Insert every 3 paragraphs
        const ad = inlineAds[adIndex];
        result.push(
          `<div class="text-center my-4"><a href="${ad.link}" target="_blank" rel="noopener noreferrer"><img src="${ad.image}" alt="Ad" class="img-fluid" style="border-radius: 10px; max-width: 100%; aspect-ratio: 1/1; object-fit: cover;" /></a></div>`
        );
        adIndex++;
      }
    });

    return result.join("");
  };

  if (loading) {
    return (
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Loading Blog...
            </h6>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center">
            <h1>Blog not found</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <style>
        {`
          .blog-content img {
            max-width: 100%;
            height: auto;
            display: block;
            margin: 0 auto;
          }
          @media (max-width: 768px) {
            .blog-content img {
              width: 100% !important;
              height: auto !important;
            }
            .container-xxl.py-5 {
              padding-top: 1rem !important;
            }
          }
        `}
      </style>
      <HeroHeader
        heroheadertitle={blog.title}
        pageName="Blog Details"
        heroheaderbg={blog.image}
      />

      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5">
            {/* Main Content */}
            <div className="col-lg-8">
              <div className="wow fadeInUp" data-wow-delay="0.1s">
                <p className="mb-4">
                  <Link
                    to="/blogs"
                    className="text-decoration-none"
                    style={{ color: "#f1741e", fontSize: "0.9rem" }}
                  >
                    <i className="fas fa-arrow-left me-1"></i>
                    Back to All Blogs
                  </Link>
                </p>
                <img
                  className="img-fluid w-100 mb-4"
                  src={blog.image}
                  alt={blog.title}
                  style={{ height: "400px", objectFit: "cover" }}
                />
                <h1 className="mb-3" style={{ color: "#175AA1" }}>
                  {blog.title}
                </h1>
                <p className="mb-4" style={{ color: "#666", fontSize: "0.9rem" }}>
                  {formatDate(blog.date)}
                </p>
                <div
                  className="blog-content"
                  dangerouslySetInnerHTML={{
                    __html: insertInlineAds(
                      blog.content,
                      ads.filter((ad) => ad.position === "inline")
                    ),
                  }}
                />
              </div>

              {/* Bottom Ads */}
              {ads
                .filter((ad) => ad.position === "bottom")
                .map((ad) => (
                  <div key={ad._id} className="mb-4 text-center">
                    <a href={ad.link} target="_blank" rel="noopener noreferrer">
                      <img
                        src={ad.image}
                        alt="Ad"
                        className="img-fluid"
                        style={{
                          borderRadius: "10px",
                          maxWidth: "100%",
                          aspectRatio: "1/1",
                          objectFit: "cover",
                        }}
                      />
                    </a>
                  </div>
                ))}

              {/* Comments Section */}
              <div className="wow fadeInUp" data-wow-delay="0.3s">
                <h3 className="mb-4">Comments</h3>
                <form onSubmit={handleCommentSubmit} className="mb-4">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your Name"
                      value={commentForm.user}
                      onChange={(e) =>
                        setCommentForm({ ...commentForm, user: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <textarea
                      className="form-control"
                      rows="4"
                      placeholder="Your Comment"
                      value={commentForm.comment}
                      onChange={(e) =>
                        setCommentForm({
                          ...commentForm,
                          comment: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn"
                    style={{ backgroundColor: "#f1741e", color: "white" }}
                  >
                    Post Comment
                  </button>
                </form>

                {comments.map((comment) => (
                  <div key={comment._id} className="mb-4 p-3 border rounded">
                    <strong>{comment.user}</strong>
                    <p>{comment.comment}</p>
                    <small className="text-muted">
                      {new Date(comment.date).toLocaleDateString()}
                    </small>
                    {comment.replies.map((reply, index) => (
                      <div
                        key={index}
                        className="mt-2 ms-4 p-2 bg-light rounded"
                      >
                        <strong>{reply.user}</strong>
                        <p>{reply.reply}</p>
                        <small className="text-muted">
                          {new Date(reply.date).toLocaleDateString()}
                        </small>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              {/* Ads - Right Position */}
              {ads
                .filter((ad) => ad.position === "right")
                .map((ad) => (
                  <div key={ad._id} className="mb-4">
                    <a href={ad.link} target="_blank" rel="noopener noreferrer">
                      <img
                        src={ad.image}
                        alt="Ad"
                        className="img-fluid w-100"
                        style={{
                          borderRadius: "10px",
                          aspectRatio: "1/1",
                          objectFit: "cover",
                        }}
                      />
                    </a>
                  </div>
                ))}

              {/* Related Blogs */}
              <div className="mb-4">
                <h4>Related Blogs</h4>

                {/* Desktop List View */}
                <div className="d-none d-md-block">
                  {relatedBlogs.map((relatedBlog) => (
                    <div key={relatedBlog._id} className="mb-3">
                      <BlogCard
                        blogImage={relatedBlog.image}
                        blogTitle={relatedBlog.title}
                        blogDate={new Date(relatedBlog.date).toLocaleDateString()}
                        blogExcerpt={
                          truncateAtSentence(relatedBlog.content, 300)
                        }
                        blogId={relatedBlog._id}
                        sidebar={true}
                      />
                    </div>
                  ))}
                </div>

                {/* Mobile Carousel View */}
                <div className="d-md-none">
                  <div style={{ position: "relative" }}>
                    <OwlCarousel
                      className="owl-theme"
                      loop
                      margin={10}
                      nav
                      autoplay
                      autoplayTimeout={4000}
                      autoplayHoverPause
                      items={1}
                      dots={false}
                      navElement="div"
                      navText={[
                        '<div style="position:absolute;left:10px;top:125px;z-index:10;width:40px;height:40px;border-radius:50%;background-color:white;display:flex;align-items:center;justify-content:center;font-size:18px;color:#f1741e;cursor:pointer;"><i class="fa fa-chevron-left"></i></div>',
                        '<div style="position:absolute;right:10px;top:125px;z-index:10;width:40px;height:40px;border-radius:50%;background-color:white;display:flex;align-items:center;justify-content:center;font-size:18px;color:#f1741e;cursor:pointer;"><i class="fa fa-chevron-right"></i></div>',
                      ]}
                    >
                      {relatedBlogs.map((relatedBlog) => (
                        <div
                          key={relatedBlog._id}
                          className="item"
                          style={{ position: "relative" }}
                        >
                          <BlogCard
                            blogImage={relatedBlog.image}
                            blogTitle={relatedBlog.title}
                            blogDate={new Date(
                              relatedBlog.date
                            ).toLocaleDateString()}
                            blogId={relatedBlog._id}
                            sidebar={true}
                          />
                        </div>
                      ))}
                    </OwlCarousel>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
