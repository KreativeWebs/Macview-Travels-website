import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";

export default function FlightBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get("/api/admin/flight-bookings");
        const data = Array.isArray(res.data) ? res.data : [];
        setBookings(res.data.bookings || []);
        // console.log("Bookings from API:", data);
      } catch (err) {
        console.log("Error fetching bookings:", err);
        setBookings([]);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="fw-bold mb-3">Flight Booking Requests</h3>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>WhatsApp</th>
            <th>Trip Type</th>
            <th>Date Submitted</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {Array.isArray(bookings) &&
            bookings.map((b) => (
              <tr key={b._id}>
                <td>{b.fullName}</td>
                <td>{b.email}</td>
                <td>{b.phoneNumber}</td>
                <td className="text-capitalize">{b.tripType}</td>
                <td>{new Date(b.createdAt).toLocaleDateString()}</td>
                <td>
                  <Link
                    className="btn btn-sm btn-info"
                    to={`/admin/flight-bookings/${b._id}`}
                    style={{ color: "#ffffff" }}
                  >
                    View More
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
