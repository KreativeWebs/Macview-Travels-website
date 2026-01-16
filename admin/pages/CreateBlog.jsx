import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Container,
  Form,
  Button,
  Alert,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-quill/dist/quill.snow.css";
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";
import axios from "axios";
import adminAxios from "../src/api/adminAxios";

// Register the image resize module
Quill.register("modules/imageResize", ImageResize);

function CreateBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
    published: false,
  });
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const quillRef = useRef(null);

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      fetchBlog();
    }
  }, [id]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const response = await adminAxios.get(`/blogs/admin/${id}`);
      const { blog, ads } = response.data;
      setFormData({
        title: blog.title,
        content: blog.content,
        image: blog.image,
        published: blog.published,
      });
      setAds((ads || []).map(ad => ({ ...ad, existing: true })));
    } catch (error) {
      console.error("Error fetching blog:", error);
      toast.error("Failed to fetch blog details");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const addAd = () => {
    setAds([...ads, { image: null, link: "", position: "right" }]);
  };

  const removeAd = (index) => {
    setAds(ads.filter((_, i) => i !== index));
  };

  const handleAdChange = (index, field, value) => {
    const newAds = [...ads];
    newAds[index][field] = value;
    setAds(newAds);
  };

  const handleAdFileChange = (index, e) => {
    const newAds = [...ads];
    newAds[index].image = e.target.files[0];
    setAds(newAds);
  };

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const uploadData = new FormData();
      uploadData.append("image", file);

      try {
        const response = await adminAxios.post(
          "/blogs/upload-image",
          uploadData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        const imageUrl = response.data.imageUrl;
        const quill = quillRef.current?.getEditor();
        if (!quill) return;

        let range = quill.getSelection(true);
        if (!range) {
          quill.focus();
          range = { index: quill.getLength(), length: 0 };
        }

        // Existing insert (unchanged)
        const imgHtml = `<img src="${imageUrl}" />`;
        quill.clipboard.dangerouslyPasteHTML(range.index, imgHtml);
        quill.setSelection(range.index + 1);

        // FIXED DEFAULT SIZE (OPTION 1)
        setTimeout(() => {
          const img = quill.root.querySelector(`img[src="${imageUrl}"]`);
          if (img) {
            img.setAttribute("width", "320"); // default size
            img.removeAttribute("height"); // allow resizing
            img.style.display = "block";
            img.style.margin = "12px auto";
          }
        }, 0);
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Failed to upload image");
      }
    };
  };

  //  MEMOIZED MODULES (CRITICAL FIX)
  const quillModules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ align: [] }],
          ["image"],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      imageResize: {
        parchment: Quill.import("parchment"),
        modules: ["Resize", "DisplaySize", "Toolbar"],
      },
    }),
    []
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Client-side validation
    if (!formData.title.trim()) {
      setMessage("Title is required.");
      setLoading(false);
      return;
    }
    if (!formData.content.trim()) {
      setMessage("Content is required.");
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append("title", formData.title.trim());
    data.append("content", formData.content.trim());
    data.append("published", formData.published);
    if (formData.image) data.append("image", formData.image);

    try {
      let blogId;
      if (isEdit && id) {
        await adminAxios.put(`/blogs/${id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        blogId = id;
        toast.success("Blog updated successfully!");
        navigate("/blogs");
      } else {
        const response = await adminAxios.post("/blogs", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        blogId = response.data.blog._id;
        setMessage("Blog created successfully!");
        setFormData({
          title: "",
          content: "",
          image: null,
          published: false,
        });
      }

      // Handle ads
      if (blogId) {
        // Get existing ads from the database
        const existingAdsResponse = await axios.get(`/api/ads/blog/${blogId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
          withCredentials: true,
        });
        const existingAds = existingAdsResponse.data.ads || [];

        // Delete ads that are no longer in the list
        for (const existingAd of existingAds) {
          const stillExists = ads.some(ad => ad._id === existingAd._id);
          if (!stillExists) {
            await axios.delete(`/api/ads/${existingAd._id}`, {
              headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
              withCredentials: true,
            });
          }
        }

        // Update existing ads or create new ones
        for (const ad of ads) {
          if (ad.existing && ad._id) {
            // Update existing ad
            const adData = new FormData();
            adData.append("link", ad.link.trim());
            adData.append("position", ad.position);
            if (ad.image && typeof ad.image !== 'string') {
              adData.append("image", ad.image);
            }
            await axios.put(`/api/ads/${ad._id}`, adData, {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
              },
              withCredentials: true,
            });
          } else if (ad.image && ad.link.trim()) {
            // Create new ad
            const adData = new FormData();
            adData.append("image", ad.image);
            adData.append("link", ad.link.trim());
            adData.append("position", ad.position);
            adData.append("blogId", blogId);
            await axios.post("/api/ads", adData, {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
              },
              withCredentials: true,
            });
          }
        }
        setAds([]); // Clear ads after processing
      }
    } catch (error) {
      console.error("Error saving blog:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Error creating blog. Please try again.";
      isEdit ? toast.error("Failed to update blog") : setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Card>
        <Card.Header>
          <h2>{isEdit ? "Edit Blog" : "Create New Blog"}</h2>
        </Card.Header>
        <Card.Body>
          {message && (
            <Alert
              variant={message.includes("successfully") ? "success" : "danger"}
            >
              {message}
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Blog Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required={!isEdit}
              />
              {formData.image && typeof formData.image === 'string' && (
                <div className="mt-2">
                  <img src={formData.image} alt="Current blog image" style={{ width: '200px', height: 'auto' }} />
                </div>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <ReactQuill
                ref={quillRef}
                value={formData.content}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, content: value }))
                }
                theme="snow"
                style={{ height: "400px" }}
                modules={quillModules}
              />
            </Form.Group>

            {/* Rest of your code remains untouched */}

            {/* Ads Section */}
            <Card className="mb-3">
              <Card.Header>
                <h5>Ads Management</h5>
              </Card.Header>
              <Card.Body>
                {ads.map((ad, index) => (
                  <Row key={index} className="mb-3">
                    <Col md={3}>
                      {ad.existing ? (
                        <div>
                          <img src={ad.image} alt="Ad" style={{ width: '100%', maxHeight: '100px', objectFit: 'cover' }} />
                          <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleAdFileChange(index, e)}
                            className="mt-2"
                          />
                        </div>
                      ) : (
                        <Form.Control
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleAdFileChange(index, e)}
                        />
                      )}
                    </Col>
                    <Col md={3}>
                      <Form.Control
                        type="url"
                        placeholder="Ad Link"
                        value={ad.link}
                        onChange={(e) =>
                          handleAdChange(index, "link", e.target.value)
                        }
                        required
                      />
                    </Col>
                    <Col md={3}>
                      <Form.Select
                        value={ad.position}
                        onChange={(e) =>
                          handleAdChange(index, "position", e.target.value)
                        }
                      >
                        <option value="right">Right Side</option>
                        <option value="inline">Inline</option>
                        <option value="bottom">Bottom</option>
                      </Form.Select>
                    </Col>
                    <Col md={3}>
                      <Button variant="danger" onClick={() => removeAd(index)}>
                        Remove
                      </Button>
                    </Col>
                  </Row>
                ))}
                <Button variant="secondary" onClick={addAd}>
                  Add Ad
                </Button>
              </Card.Body>
            </Card>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Published"
                name="published"
                checked={formData.published}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Button type="submit" variant="primary" disabled={loading}>
              {loading
                ? isEdit
                  ? "Updating..."
                  : "Creating..."
                : "Publish Blog"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default CreateBlog;
