import React, { useState, useEffect } from "react";
import { Container, Table, Button, Alert, Badge, Card, Row, Col } from "react-bootstrap";
import userAxios from "../../api/userAxios";

function FlashSalesList() {
  const [flashSales, setFlashSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchFlashSales();
  }, []);

  const fetchFlashSales = async () => {
    try {
      const response = await userAxios.get("/admin/flash-sales");
      setFlashSales(response.data.flashSales);
    } catch (error) {
      console.error("Error fetching flash sales:", error);
      setMessage("Error fetching flash sales.");
    } finally {
      setLoading(false);
    }
  };

  const toggleActive = async (id, isActive) => {
    try {
      await userAxios.put(`/admin/flash-sales/${id}`, { isActive: !isActive });
      setMessage("Flash sale status updated successfully!");
      fetchFlashSales(); // Refresh the list
    } catch (error) {
      console.error("Error updating flash sale:", error);
      setMessage("Error updating flash sale status.");
    }
  };

  const deleteFlashSale = async (id) => {
    if (!window.confirm("Are you sure you want to delete this flash sale?")) return;
    try {
      await userAxios.delete(`/admin/flash-sales/${id}`);
      setMessage("Flash sale deleted successfully!");
      fetchFlashSales(); // Refresh the list
    } catch (error) {
      console.error("Error deleting flash sale:", error);
      setMessage("Error deleting flash sale.");
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

  return (
    <Container className="py-5">
      <h2>All Flash Sales</h2>
      {message && <Alert variant={message.includes("successfully") ? "success" : "danger"}>{message}</Alert>}
      {!flashSales || flashSales.length === 0 ? (
        <p>No flash sales found.</p>
      ) : (
        <Row>
          {flashSales.map((sale) => (
            <Col md={6} lg={4} key={sale._id} className="mb-4">
              <Card>
                <Card.Img variant="top" src={sale.backgroundImage} alt={`${sale.destinationCity} Flash Sale`} />
                <Card.Body>
                  <Card.Title>{sale.destinationCity} - ${sale.price}</Card.Title>
                  <Card.Text>
                    <strong>Departure:</strong> {sale.departureCity}<br />
                    <strong>Airline:</strong> {sale.airline}<br />
                    <strong>Valid Until:</strong> {new Date(sale.dateValid).toLocaleDateString()}<br />
                    <strong>Status:</strong> <Badge bg={sale.isActive ? "success" : "secondary"}>
                      {sale.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </Card.Text>
                  <Button
                    variant={sale.isActive ? "warning" : "success"}
                    size="sm"
                    onClick={() => toggleActive(sale._id, sale.isActive)}
                    className="me-2"
                  >
                    {sale.isActive ? "Deactivate" : "Activate"}
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteFlashSale(sale._id)}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default FlashSalesList;
