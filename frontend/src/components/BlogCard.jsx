import React from "react";
import { Link } from "react-router-dom";

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

function BlogCard({ blogImage, blogTitle, blogDate, blogExcerpt, blogId, fullWidth = false, sidebar = false }) {
  if (sidebar) {
    return (
      <Link to={`/blog/${blogId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="wow fadeInUp mb-3" data-wow-delay="0.1s" style={{ cursor: 'pointer' }}>
          <div
            className="package-item overflow-hidden"
            style={{
              borderRadius: "15px",
              height: "auto",
              border: "1px solid #e0e0e0",
              transition: "box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)"}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}
          >
            <div
              className="overflow-hidden"
              style={{
                width: "100%",
                height: "200px",
                overflow: "hidden",
                aspectRatio: "1/1",
              }}
            >
              <img
                className="img-fluid overflow-hidden"
                src={blogImage}
                alt={blogTitle}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="text-left p-3">
              <h6
                className="mb-2"
                style={{
                  fontFamily: "Raleway",
                  color: "#175AA1",
                  fontSize: "1rem",
                  fontWeight: "600",
                }}
              >
                {blogTitle}
              </h6>
              <p
                className="mb-0"
                style={{
                  fontSize: "0.75rem",
                  color: "#666",
                  fontFamily: "Raleway",
                }}
              >
                {formatDate(blogDate)}
              </p>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <>
      <div className={fullWidth ? "wow fadeInUp" : "col-lg-4 col-md-6 wow fadeInUp"} data-wow-delay="0.1s">
        <div
          className="package-item overflow-hidden position-relative"
          style={{
            borderRadius: "15px",
            height: "600px",
          }}
        >
          <div
            className="overflow-hidden"
            style={{
              width: "100%",
              height: "250px",
              overflow: "hidden",
              aspectRatio: "1/1",
            }}
          >
            <img
              className="img-fluid overflow-hidden"
              src={blogImage}
              alt={blogTitle}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
          <div className="text-left p-4" style={{ paddingBottom: "0px" }}>
            <h5
              className="mb-2"
              style={{
                fontFamily: "Raleway",
                color: "#175AA1",
                fontSize: "1.2rem",
              }}
            >
              {blogTitle}
            </h5>
            <p
              className="mb-3"
              style={{
                fontSize: "0.8rem",
                color: "#666",
                fontFamily: "Raleway",
              }}
            >
              {formatDate(blogDate)}
            </p>
            <p className="mb-0" dangerouslySetInnerHTML={{ __html: blogExcerpt }}></p>
          </div>
          <div className="position-absolute bottom-0 start-0 p-4 w-100">
            <div className="d-flex justify-content-left">
              <Link
                to={`/blog/${blogId}`}
                className="btn btn-sm px-5"
                style={{
                  borderRadius: "12px",
                  fontFamily: "Raleway",
                  fontWeight: "800",
                  outline: "none",
                  border: "none",
                  backgroundColor: "#f1741e",
                  color: "white",
                }}
              >
                Read More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogCard;
