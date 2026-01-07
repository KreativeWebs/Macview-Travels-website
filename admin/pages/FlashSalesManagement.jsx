import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import adminAxios from "../src/api/adminAxios.js";
import { toast } from "react-toastify";

function FlashSalesManagement() {
  const [flashSales, setFlashSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [flashSaleToDelete, setFlashSaleToDelete] = useState(null);

  useEffect(() => {
    const fetchFlashSales = async () => {
      try {
        // Use adminAxios (base set to /api/admin) and request the flash sales list
        const response = await adminAxios.get("/flash-sales");
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

  const handleDelete = async () => {
    if (!flashSaleToDelete) return;

    try {
      await adminAxios.delete(`/flash-sales/${flashSaleToDelete._id}`);
      toast.success("Flash sale deleted successfully");
      setFlashSales(flashSales.filter((sale) => sale._id !== flashSaleToDelete._id));
      setShowDeleteModal(false);
      setFlashSaleToDelete(null);
    } catch (err) {
      console.error("Error deleting flash sale:", err);
      toast.error("Failed to delete flash sale");
    }
  };

  const openDeleteModal = (sale) => {
    setFlashSaleToDelete(sale);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setFlashSaleToDelete(null);
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
          <Link to="/flash-sales/add">
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
                  <Link
                    to={`/flash-sales/edit/${sale._id}`}
                    className="btn btn-outline-secondary me-2"
                    title="Edit"
                  >
                  Update
                  </Link>
                  <Button variant="danger" onClick={() => openDeleteModal(sale)}>
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button type="button" className="btn-close" onClick={closeDeleteModal}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete the flash sale for <strong>{flashSaleToDelete?.destinationCity}</strong>?</p>
                <p className="text-danger small">This action cannot be undone.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeDeleteModal}>
                  Cancel
                </button>
                <button type="button" className="btn btn-danger" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}

export default FlashSalesManagement;
