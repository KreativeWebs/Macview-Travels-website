import React, { useState, useEffect } from "react";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import userAxios from "../../api/userAxios";

function AddNewFlashSale() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    backgroundImage: "",
    price: "",
    destinationCity: "",
    departureCity: "",
    dateValidFrom: "",
    dateValid: "",
    airline: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      fetchFlashSale();
    }
  }, [id]);

  const fetchFlashSale = async () => {
    try {
      setLoading(true);
      const response = await userAxios.get(`/admin/flash-sales/${id}`);
      const sale = response.data.flashSale;
      setFormData({
        backgroundImage: null, // Keep null for file input
        price: sale.price,
        destinationCity: sale.destinationCity,
        departureCity: sale.departureCity,
        dateValidFrom: sale.dateValidFrom ? new Date(sale.dateValidFrom).toISOString().split('T')[0] : "",
        dateValid: sale.dateValid ? new Date(sale.dateValid).toISOString().split('T')[0] : "",
        airline: sale.airline,
      });
    } catch (error) {
      console.error("Error fetching flash sale:", error);
      toast.error("Failed to fetch flash sale details");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, backgroundImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const data = new FormData();
    data.append("price", formData.price);
    data.append("destinationCity", formData.destinationCity);
    data.append("departureCity", formData.departureCity);
    data.append("dateValidFrom", formData.dateValidFrom);
    data.append("dateValid", formData.dateValid);
    data.append("airline", formData.airline);
    if (formData.backgroundImage) {
      data.append("backgroundImage", formData.backgroundImage);
    }

    try {
      if (isEdit && id) {
        await userAxios.put(`/admin/flash-sales/${id}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Flash sale updated successfully!");
        navigate("/admin/flash-sales-bookings");
      } else {
        await userAxios.post("/admin/flash-sales", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setMessage("Flash sale created successfully!");
        setFormData({
          backgroundImage: null,
          price: "",
          destinationCity: "",
          departureCity: "",
          dateValidFrom: "",
          dateValid: "",
          airline: "",
        });
      }
    } catch (error) {
      console.error("Error saving flash sale:", error);
      if (isEdit) {
        toast.error("Failed to update flash sale");
      } else {
        setMessage("Error creating flash sale. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Card>
        <Card.Header>
          <h2>{isEdit ? "Edit Flash Sale" : "Add New Flash Sale"}</h2>
        </Card.Header>
        <Card.Body>
          {message && <Alert variant={message.includes("successfully") ? "success" : "danger"}>{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Background Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required={!isEdit}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Enter price"
                min="0"
                step="0.01"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Destination City</Form.Label>
              <Form.Control
                type="text"
                name="destinationCity"
                value={formData.destinationCity}
                onChange={handleInputChange}
                placeholder="Enter destination city"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Departure City</Form.Label>
              <Form.Control
                type="text"
                name="departureCity"
                value={formData.departureCity}
                onChange={handleInputChange}
                placeholder="Enter departure city"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Valid From</Form.Label>
              <Form.Control
                type="date"
                name="dateValidFrom"
                value={formData.dateValidFrom}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Valid Until</Form.Label>
              <Form.Control
                type="date"
                name="dateValid"
                value={formData.dateValid}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Airline</Form.Label>
              <Form.Control
                type="text"
                name="airline"
                value={formData.airline}
                onChange={handleInputChange}
                placeholder="Enter airline name"
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? (isEdit ? "Updating..." : "Creating...") : (isEdit ? "Update Flash Sale" : "Create Flash Sale")}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AddNewFlashSale;
