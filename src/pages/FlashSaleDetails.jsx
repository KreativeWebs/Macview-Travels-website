import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Button, Form, Alert, Row, Col } from "react-bootstrap";
import axios from "axios";

function FlashSaleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [flashSale, setFlashSale] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    whatsappNumber: "",
    dateOfBirth: "",
    gender: "",
  });

  useEffect(() => {
    fetchFlashSale();
  }, [id]);

  const fetchFlashSale = async () => {
    try {
      const response = await axios.get(`/api/flash-sales/${id}`);
      setFlashSale(response.data.flashSale);
    } catch (error) {
      console.error("Error fetching flash sale:", error);
      setMessage("Flash sale not found.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBookingLoading(true);
    setMessage("");

    try {
      await axios.post("/api/flash-sales/book", {
        ...formData,
        flashSaleId: id,
      });
      setMessage("Booking submitted successfully! We will contact you soon.");
      setFormData({
        name: "",
        whatsappNumber: "",
        dateOfBirth: "",
        gender: "",
      });
    } catch (error) {
      console.error("Error submitting booking:", error);
      setMessage("Error submitting booking. Please try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }

  if (!flashSale) {
    return (
      <Container className="py-5 text-center">
        <h2>Flash Sale Not Found</h2>
        <Button onClick={() => navigate("/")}>Go Back</Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row>
        <Col lg={8}>
          <Card>
            <Card.Img variant="top" src={flashSale.backgroundImage} alt={flashSale.destinationCity} />
            <Card.Body>
              <Card.Title>{flashSale.destinationCity} Flash Sale</Card.Title>
              <Card.Text>
                <strong>Price:</strong> ${flashSale.price}<br />
                <strong>From:</strong> {flashSale.departureCity}<br />
                <strong>To:</strong> {flashSale.destinationCity}<br />
                <strong>Airline:</strong> {flashSale.airline}<br />
                <strong>Valid Until:</strong> {new Date(flashSale.dateValid).toLocaleDateString()}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <Card>
            <Card.Header>
              <h4>Book Now</h4>
            </Card.Header>
            <Card.Body>
              {message && <Alert variant={message.includes("successfully") ? "success" : "danger"}>{message}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>WhatsApp Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="whatsappNumber"
                    value={formData.whatsappNumber}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select name="gender" value={formData.gender} onChange={handleInputChange} required>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Form.Select>
                </Form.Group>
                <Button type="submit" variant="primary" disabled={bookingLoading}>
                  {bookingLoading ? "Submitting..." : "Pay Now"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default FlashSaleDetails;
