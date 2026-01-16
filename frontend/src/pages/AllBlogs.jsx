import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api";
import BlogCard from "../components/BlogCard";
import HeroHeader from "./HeroHeader";

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

export default function AllBlogs() {
  const [blogs, setBlogs] = useState(null);
  const [filteredBlogs, setFilteredBlogs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState({ year: "", month: "" });

  const blogsPerPage = 9;

  useEffect(() => {
    fetchBlogs();
  }, [currentPage, filter]);

  const fetchBlogs = async () => {
    try {
      const params = {
        page: currentPage,
        limit: blogsPerPage,
        ...filter,
      };
      const response = await axios.get("/api/blogs", { params });
      const blogsData = response.data.blogs || [];
      setBlogs(blogsData);
      setFilteredBlogs(blogsData);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setBlogs([]);
      setFilteredBlogs([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    if (name === 'year') {
      setFilter({
        ...filter,
        year: value,
        month: value ? filter.month : "" // Reset month if year is cleared
      });
    } else {
      setFilter({ ...filter, [name]: value });
    }
    setCurrentPage(1);
  };

  if (loading) {
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
    <div>
      <HeroHeader
        heroheaderbg="assets/img/blogheader.jpg"
        heroheadertitle="All Blogs"
        heroheaderdesc="Explore our latest travel insights and articles to inspire your next adventure."
        pageName="Blogs"
      />

      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-secondary px-3">
              All Blogs
            </h6>
            <h1 className="mb-5">Explore Our Latest Articles</h1>
          </div>

          {/* Filters */}
          <div className="row mb-4">
            <div className="col-12">
              <h6 className="mb-3">Filters</h6>
              <div className="row">
                <div className="col-md-3 mb-3 mb-md-0">
                  <select
                    name="year"
                    value={filter.year}
                    onChange={handleFilterChange}
                    className="form-select form-select-sm"
                  >
                    <option value="">All Years</option>
                    {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-3">
                  <select
                    name="month"
                    value={filter.month}
                    onChange={handleFilterChange}
                    className="form-select form-select-sm"
                    disabled={!filter.year}
                  >
                    <option value="">Select Month</option>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                      <option key={month} value={month}>{new Date(0, month - 1).toLocaleString('default', { month: 'long' })}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Blogs Grid */}
          <div className="row g-4">
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog) => (
                <BlogCard
                  key={blog._id}
                  blogImage={blog.image}
                  blogTitle={blog.title}
                  blogDate={new Date(blog.date).toLocaleDateString()}
                  blogExcerpt={truncateAtSentence(blog.content, 200)}
                  blogId={blog._id}
                />
              ))
            ) : (
              (filter.year || filter.month) && (
                <div className="col-12 text-center">
                  <div className="alert alert-info" role="alert">
                    <i className="fas fa-info-circle me-2"></i>
                    No blogs found for the selected filters. Try adjusting your search criteria.
                  </div>
                </div>
              )
            )}
          </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-5">
            <nav>
              <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
