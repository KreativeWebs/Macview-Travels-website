import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api";
import BlogCard from "./BlogCard";
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

export default function BlogSection() {
  const [blogs, setBlogs] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("/api/blogs/recent");
        setBlogs(response.data.blogs || []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading || !blogs) {
    return (
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Loading Blogs...
            </h6>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h6 className="section-title bg-white text-center text-secondary px-3">
            Our Blog
          </h6>
          <h1 className="mb-5">Latest Travel Insights</h1>
        </div>

        {/* Desktop Grid View */}
        <div className="row g-4 d-none d-md-flex">
          {blogs.slice(0, 3).map((blog) => (
            <BlogCard
              key={blog._id}
              blogImage={blog.image}
              blogTitle={blog.title}
              blogDate={new Date(blog.date).toLocaleDateString()}
              blogExcerpt={truncateAtSentence(blog.content, 300)}
              blogId={blog._id}
            />
          ))}
        </div>

        {/* Mobile Carousel View */}
        <div className="d-md-none">
          <div style={{ position: 'relative' }}>
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
                `<div style="position:absolute;left:10px;top:125px;z-index:10;width:40px;height:40px;border-radius:50%;background-color:white;display:flex;align-items:center;justify-content:center;font-size:18px;color:#f1741e;cursor:pointer;"><i class="fa fa-chevron-left"></i></div>`,
                `<div style="position:absolute;right:10px;top:125px;z-index:10;width:40px;height:40px;border-radius:50%;background-color:white;display:flex;align-items:center;justify-content:center;font-size:18px;color:#f1741e;cursor:pointer;"><i class="fa fa-chevron-right"></i></div>`
              ]}
            >
              {blogs.slice(0, 3).map((blog) => (
                <div key={blog._id} className="item" style={{ position: 'relative' }}>
                  <BlogCard
                    blogImage={blog.image}
                    blogTitle={blog.title}
                    blogDate={new Date(blog.date).toLocaleDateString()}
              blogExcerpt={truncateAtSentence(blog.content, 220)}
                    blogId={blog._id}
                  />
                </div>
              ))}
            </OwlCarousel>
          </div>
        </div>

        <div className="text-center mt-5">
          <Link
            to="/blogs"
            style={{
              textDecoration: "none",
              color: "#333",
              fontFamily: "Raleway",
              fontWeight: "600",
            }}
          >
            See All Blogs
          </Link>
        </div>
      </div>
    </div>
  );
}
