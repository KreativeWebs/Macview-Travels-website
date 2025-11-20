import React, { useState } from "react";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import axios from "axios";

function AddNewFlashSale() {
  const [formData, setFormData] = useState({
    backgroundImage: "",
    price: "",
    destinationCity: "",
    departureCity: "",
    dateValid: "",
    airline: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
    data.append("dateValid", formData.dateValid);
    data.append("airline", formData.airline);
    if (formData.backgroundImage) {
      data.append("backgroundImage", formData.backgroundImage);
    }

    try {
      const response = await axios.post("http://localhost:5000/api/admin/flash-sales", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("Flash sale created successfully!");
      setFormData({
        backgroundImage: null,
        price: "",
        destinationCity: "",
        departureCity: "",
        dateValid: "",
        airline: "",
      });
    } catch (error) {
      console.error("Error creating flash sale:", error);
      setMessage("Error creating flash sale. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Card>
        <Card.Header>
          <h2>Add New Flash Sale</h2>
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
                required
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
              {loading ? "Creating..." : "Create Flash Sale"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AddNewFlashSale;
