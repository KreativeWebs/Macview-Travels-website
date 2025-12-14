import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import userAxios from "../../api/userAxios";

function FlashSalesManagement() {
  const [flashSales, setFlashSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFlashSales = async () => {
      try {
        const response = await userAxios.get("/admin/flash-sales");
        setFlashSales(response.data.flashSales || []);
      } catch (err) {
        console.error("Error fetching flash sales:", err);
        setError("Failed to fetch flash sales");
      } finally {
        setLoading(false);
      }
    };

    fetchFlashSales();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this flash sale?")) return;

    try {
      await userAxios.delete(`/admin/flash-sales/${id}`);
      setFlashSales(flashSales.filter((sale) => sale._id !== id));
    } catch (err) {
      console.error("Error deleting flash sale:", err);
      setError("Failed to delete flash sale");
    }
  };

  const toggleActive = async (id, currentStatus) => {
    try {
      await userAxios.patch(`/admin/flash-sales/${id}`, { isActive: !currentStatus });
      setFlashSales(
        flashSales.map((sale) =>
          sale._id === id ? { ...sale, isActive: !currentStatus } : sale
        )
      );
    } catch (err) {
      console.error("Error updating flash sale:", err);
      setError("Failed to update flash sale");
    }
  };

  if (loading) {
    return <Container className="py-5 text-center"><div>Loading...</div></Container>;
  }

  if (error) {
    return <Container className="py-5"><Alert variant="danger">{error}</Alert></Container>;
  }

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h2>All Flash Sales</h2>
        </Col>
        <Col xs="auto">
          <Link to="/admin/add-flash-sale">
            <Button variant="primary">Add Flash Sale</Button>
          </Link>
        </Col>
      </Row>
      {flashSales.length === 0 ? (
        <Alert variant="info">No flash sales found.</Alert>
      ) : (
        <Row>
          {flashSales.map((sale) => (
            <Col md={4} key={sale._id} className="mb-4">
              <Card>
                <Card.Img variant="top" src={sale.backgroundImage} alt={sale.destinationCity} />
                <Card.Body>
                  <Card.Title>{sale.destinationCity}</Card.Title>
                  <Card.Text>
                    Price: ₦{sale.price}<br />
                    Airline: {sale.airline}<br />
                    Valid Until: {new Date(sale.dateValid).toLocaleDateString()}<br />
                    Status: {sale.isActive ? "Active" : "Inactive"}
                  </Card.Text>
                  <Button
                    variant={sale.isActive ? "warning" : "success"}
                    onClick={() => toggleActive(sale._id, sale.isActive)}
                    className="me-2"
                  >
                    {sale.isActive ? "Deactivate" : "Activate"}
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(sale._id)}>
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

export default FlashSalesManagement;
