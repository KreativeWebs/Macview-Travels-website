import React, { useState, useEffect } from "react";
import { Container, Table, Button, Alert, Card, Badge, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import adminAxios from "../src/api/adminAxios";

export default function AllBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await adminAxios.get("/blogs/admin");
      setBlogs(response.data.blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      toast.error("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!blogToDelete) return;

    try {
      await adminAxios.delete(`/blogs/${blogToDelete._id}`);
      toast.success("Blog deleted successfully!");
      setBlogs(blogs.filter(blog => blog._id !== blogToDelete._id));
      setShowDeleteModal(false);
      setBlogToDelete(null);
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete blog");
    }
  };

  const confirmDelete = (blog) => {
    setBlogToDelete(blog);
    setShowDeleteModal(true);
  };

  const handleEdit = (blogId) => {
    navigate(`/blogs/create/${blogId}`);
  };

  const handleCreate = () => {
    navigate("/blogs/create");
  };

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <h4>Loading blogs...</h4>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h2>All Blogs</h2>
          <Button variant="primary" onClick={handleCreate}>
            <i className="fas fa-plus"></i> Create Blog
          </Button>
        </Card.Header>
        <Card.Body>
          {blogs.length === 0 ? (
            <Alert variant="info">
              No blogs found. <Button variant="link" onClick={handleCreate}>Create your first blog</Button>
            </Alert>
          ) : (
            <Table responsive striped hover>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Date Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog._id}>
                    <td>
                      <div>
                        <strong>{blog.title}</strong>
                        {blog.image && (
                          <div className="mt-1">
                            <small className="text-muted">Has image</small>
                          </div>
                        )}
                      </div>
                    </td>
                    <td>
                      <Badge bg={blog.published ? "success" : "secondary"}>
                        {blog.published ? "Published" : "Draft"}
                      </Badge>
                    </td>
                    <td>{new Date(blog.date).toLocaleDateString()}</td>
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        onClick={() => handleEdit(blog._id)}
                      >
                        <i className="fas fa-edit"></i> Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => confirmDelete(blog)}
                      >
                        <i className="fas fa-trash"></i> Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the blog "{blogToDelete?.title}"? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
