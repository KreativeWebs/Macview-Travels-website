import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { toast } from "react-toastify";
import userAxios from "../api/userAxios";

export default function ManageBookings() {
  const { user, accessToken } = useAuthStore();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("visa");

  useEffect(() => {
    if (user && accessToken) {
      fetchBookings(activeTab);
    }
  }, [user, accessToken, activeTab]);

  const fetchBookings = async (type) => {
    setLoading(true);
    try {
      let endpoint = "";
      if (type === "visa") endpoint = "/user/visa-applications";
      else if (type === "flight") endpoint = "/user/flight-bookings";
      else if (type === "hotel") endpoint = "/user/hotel-bookings";
      else if (type === "package") endpoint = "/user/package-bookings";

      const res = await userAxios.get(endpoint);

      setBookings(res.data.bookings || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      received: "badge bg-warning",
      confirmed: "badge bg-success",
      cancelled: "badge bg-danger",
      pending: "badge bg-secondary",
      paid: "badge bg-info",
      failed: "badge bg-danger",
    };
    return statusClasses[status] || "badge bg-secondary";
  };

  const renderVisaApplications = () => (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Destination</th>
            <th>Visa Type</th>
            <th>Status</th>
            <th>Payment</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.fullName}</td>
              <td>{booking.destinationCountry}</td>
              <td>{booking.visaType}</td>
              <td>
                <span className={getStatusBadge(booking.status)}>
                  {booking.status}
                </span>
              </td>
              <td>
                <span className={getStatusBadge(booking.payment?.status)}>
                  {booking.payment?.status}
                </span>
              </td>
              <td>{new Date(booking.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderFlightBookings = () => (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Trip Type</th>
            <th>Departure</th>
            <th>Destination</th>
            <th>Departure Date</th>
            <th>Status</th>
            <th>Payment</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.fullName}</td>
              <td>{booking.tripType}</td>
              <td>{booking.departureCity}</td>
              <td>{booking.destinationCity}</td>
              <td>
                {booking.departureDate
                  ? new Date(booking.departureDate).toLocaleDateString()
                  : "N/A"}
              </td>
              <td>
                <span className={getStatusBadge(booking.status)}>
                  {booking.status}
                </span>
              </td>
              <td>
                <span className={getStatusBadge(booking.payment?.status)}>
                  {booking.payment?.status}
                </span>
              </td>
              <td>{new Date(booking.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderHotelBookings = () => (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Destination</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Rooms</th>
            <th>Guests</th>
            <th>Status</th>
            <th>Payment</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.fullName}</td>
              <td>{booking.destination}</td>
              <td>
                {booking.checkInDate
                  ? new Date(booking.checkInDate).toLocaleDateString()
                  : "N/A"}
              </td>
              <td>
                {booking.checkOutDate
                  ? new Date(booking.checkOutDate).toLocaleDateString()
                  : "N/A"}
              </td>
              <td>{booking.rooms}</td>
              <td>{booking.guests}</td>
              <td>
                <span className={getStatusBadge(booking.status)}>
                  {booking.status}
                </span>
              </td>
              <td>
                <span className={getStatusBadge(booking.payment?.status)}>
                  {booking.payment?.status}
                </span>
              </td>
              <td>{new Date(booking.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderPackageBookings = () => (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Package</th>
            <th>City</th>
            <th>Travel Date</th>
            <th>Price</th>
            <th>Status</th>
            <th>Payment</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.fullName}</td>
              <td>{booking.packageTitle}</td>
              <td>{booking.packageId?.city || "N/A"}</td>
              <td>
                {booking.travelDate
                  ? new Date(booking.travelDate).toLocaleDateString()
                  : "N/A"}
              </td>
              <td>
                {booking.packageCurrency === "NGN" ? "₦" : "$"}
                {booking.packagePrice?.toLocaleString()}
              </td>
              <td>
                <span className={getStatusBadge(booking.status)}>
                  {booking.status}
                </span>
              </td>
              <td>
                <span className={getStatusBadge(booking.payment?.status)}>
                  {booking.payment?.status}
                </span>
              </td>
              <td>{new Date(booking.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  if (!user) {
    return (
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center">
            <h3>Please login to view your bookings</h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <h2 className="mt-5 mb-4">My Bookings</h2>

        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "visa" ? "active" : ""}`}
              onClick={() => setActiveTab("visa")}
            >
              Visa Applications
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "flight" ? "active" : ""}`}
              onClick={() => setActiveTab("flight")}
            >
              Flight Bookings
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "hotel" ? "active" : ""}`}
              onClick={() => setActiveTab("hotel")}
            >
              Hotel Bookings
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "package" ? "active" : ""}`}
              onClick={() => setActiveTab("package")}
            >
              Package Bookings
            </button>
          </li>
        </ul>

        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            {activeTab === "visa" && renderVisaApplications()}
            {activeTab === "flight" && renderFlightBookings()}
            {activeTab === "hotel" && renderHotelBookings()}
            {activeTab === "package" && renderPackageBookings()}
          </>
        )}
      </div>
    </div>
  );
}
