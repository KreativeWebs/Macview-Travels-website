import React, { useState, useEffect } from "react";
import { Container, Table, Button, Alert, Badge } from "react-bootstrap";
import axios from "axios";

function FlashSalesManagement() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get("/api/admin/flash-sales-bookings", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBookings(response.data.bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setMessage("Error fetching bookings.");
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (id, status) => {
    try {
      await axios.put(`/api/admin/flash-sales-bookings/${id}`, { status }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setMessage("Booking status updated successfully!");
      fetchBookings(); // Refresh the list
    } catch (error) {
      console.error("Error updating booking:", error);
      setMessage("Error updating booking status.");
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
      <h2>Flash Sales Bookings</h2>
      {message && <Alert variant={message.includes("successfully") ? "success" : "danger"}>{message}</Alert>}
      {!bookings || bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>WhatsApp</th>
              <th>Date of Birth</th>
              <th>Gender</th>
              <th>Flash Sale</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.name}</td>
                <td>{booking.whatsappNumber}</td>
                <td>{new Date(booking.dateOfBirth).toLocaleDateString()}</td>
                <td>{booking.gender}</td>
                <td>{booking.flashSaleId?.destinationCity || "N/A"}</td>
                <td>
                  <Badge bg={booking.status === "confirmed" ? "success" : booking.status === "cancelled" ? "danger" : "warning"}>
                    {booking.status}
                  </Badge>
                </td>
                <td>
                  {booking.status === "received" && (
                    <>
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => updateBookingStatus(booking._id, "confirmed")}
                        className="me-2"
                      >
                        Confirm
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => updateBookingStatus(booking._id, "cancelled")}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default FlashSalesManagement;
