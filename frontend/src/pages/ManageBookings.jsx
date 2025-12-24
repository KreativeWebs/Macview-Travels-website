  import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { toast } from "react-toastify";
import userAxios from "../api/userAxios";

export default function ManageBookings() {
  const { user, accessToken } = useAuthStore();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("visa");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    if (user && accessToken) {
      fetchBookings(activeTab);
    }
  }, [user, accessToken, activeTab]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchBookings = async (type) => {
    setLoading(true);
    try {
      let endpoint = "";
      if (type === "visa") endpoint = "/user/visa-applications";
      else if (type === "flight") endpoint = "/user/flight-bookings";
      else if (type === "hotel") endpoint = "/user/hotel-bookings";
      else if (type === "package") endpoint = "/user/package-bookings";
      else if (type === "flashsale") endpoint = "/flash-sales/user/flash-sale-bookings";

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
    let color = '#f1741e'; // secondary
    if (status === 'confirmed' || status === 'paid') {
      color = '#175aa1'; // primary
    }
    return { backgroundColor: color, color: 'white' };
  };

  const renderVisaApplications = () => {
    if (bookings.length === 0) {
      return <div className="text-center">No Visa Applications yet</div>;
    }
    if (isMobile) {
      return (
        <div className="row">
          {bookings.map((booking) => (
            <div key={booking._id} className="col-12 mb-3">
              <div className="card" style={{ boxShadow: '0 0 45px rgba(0, 0, 0, 0.08)', fontFamily: 'Raleway, sans-serif' }}>
                <div className="card-body">
                  <h5 className="card-title">{booking.fullName}</h5>
                  <div className="card-text">
                    <div className="mb-2"><strong>Destination:</strong> {booking.destinationCountry}</div>
                    <div className="mb-2"><strong>Visa Type:</strong> {booking.visaType}</div>
                    <div className="mb-2"><strong>Status:</strong> <span style={getStatusBadge(booking.status)} className="badge">{booking.status}</span></div>
                    <div className="mb-2"><strong>Payment:</strong> <span style={getStatusBadge(booking.payment?.status)} className="badge">{booking.payment?.status}</span></div>
                    <div className="mb-2"><strong>Date:</strong> {new Date(booking.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
    return (
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
                  <span style={getStatusBadge(booking.status)}>
                    {booking.status}
                  </span>
                </td>
                <td>
                  <span style={getStatusBadge(booking.payment?.status)}>
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
  };

  const renderFlightBookings = () => {
    if (bookings.length === 0) {
      return <div className="text-center">No Flight Bookings yet</div>;
    }
    if (isMobile) {
      return (
        <div className="row">
          {bookings.map((booking) => (
            <div key={booking._id} className="col-12 mb-3">
              <div className="card" style={{ boxShadow: '0 0 45px rgba(0, 0, 0, 0.08)', fontFamily: 'Raleway, sans-serif' }}>
                <div className="card-body">
                  <h5 className="card-title">{booking.fullName}</h5>
                  <div className="card-text">
                    <div className="mb-2"><strong>Trip Type:</strong> {booking.tripType}</div>
                    <div className="mb-2"><strong>Departure:</strong> {booking.departureCity}</div>
                    <div className="mb-2"><strong>Destination:</strong> {booking.destinationCity}</div>
                    <div className="mb-2"><strong>Departure Date:</strong> {booking.departureDate ? new Date(booking.departureDate).toLocaleDateString() : "N/A"}</div>
                    <div className="mb-2"><strong>Status:</strong> <span style={getStatusBadge(booking.status)} className="badge">{booking.status}</span></div>
                    <div className="mb-2"><strong>Payment:</strong> <span style={getStatusBadge(booking.payment?.status)} className="badge">{booking.payment?.status}</span></div>
                    <div className="mb-2"><strong>Date:</strong> {new Date(booking.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
    return (
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
                  <span style={getStatusBadge(booking.status)} className="badge">
                    {booking.status}
                  </span>
                </td>
                <td>
                  <span style={getStatusBadge(booking.payment?.status)} className="badge">
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
  };

  const renderHotelBookings = () => {
    if (bookings.length === 0) {
      return <div className="text-center">No Hotel Bookings yet</div>;
    }
    if (isMobile) {
      return (
        <div className="row">
          {bookings.map((booking) => (
            <div key={booking._id} className="col-12 mb-3">
              <div className="card" style={{ boxShadow: '0 0 45px rgba(0, 0, 0, 0.08)', fontFamily: 'Raleway, sans-serif' }}>
                <div className="card-body">
                  <h5 className="card-title">{booking.fullName}</h5>
                  <div className="card-text">
                    <div className="mb-2"><strong>Destination:</strong> {booking.destination}</div>
                    <div className="mb-2"><strong>Check-in:</strong> {booking.checkInDate ? new Date(booking.checkInDate).toLocaleDateString() : "N/A"}</div>
                    <div className="mb-2"><strong>Check-out:</strong> {booking.checkOutDate ? new Date(booking.checkOutDate).toLocaleDateString() : "N/A"}</div>
                    <div className="mb-2"><strong>Rooms:</strong> {booking.rooms}</div>
                    <div className="mb-2"><strong>Guests:</strong> {booking.guests}</div>
                    <div className="mb-2"><strong>Status:</strong> <span style={getStatusBadge(booking.status)} className="badge">{booking.status}</span></div>
                    <div className="mb-2"><strong>Payment:</strong> <span style={getStatusBadge(booking.payment?.status)} className="badge">{booking.payment?.status}</span></div>
                    <div className="mb-2"><strong>Date:</strong> {new Date(booking.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
    return (
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
                  <span style={getStatusBadge(booking.status)} className="badge">
                    {booking.status}
                  </span>
                </td>
                <td>
                  <span style={getStatusBadge(booking.payment?.status)} className="badge">
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
  };

  const renderPackageBookings = () => {
    if (bookings.length === 0) {
      return <div className="text-center">No Package Bookings yet</div>;
    }
    if (isMobile) {
      return (
        <div className="row">
          {bookings.map((booking) => (
            <div key={booking._id} className="col-12 mb-3">
              <div className="card" style={{ boxShadow: '0 0 45px rgba(0, 0, 0, 0.08)', fontFamily: 'Raleway, sans-serif' }}>
                <div className="card-body">
                  <h5 className="card-title">{booking.fullName}</h5>
                  <div className="card-text">
                    <div className="mb-2"><strong>Package:</strong> {booking.packageTitle}</div>
                    <div className="mb-2"><strong>City:</strong> {booking.packageId?.city || "N/A"}</div>
                    <div className="mb-2"><strong>Travel Date:</strong> {booking.travelDate ? new Date(booking.travelDate).toLocaleDateString() : "N/A"}</div>
                    <div className="mb-2"><strong>Price:</strong> {booking.packageCurrency === "NGN" ? "₦" : "$"}{booking.packagePrice?.toLocaleString()}</div>
                    <div className="mb-2"><strong>Status:</strong> <span style={getStatusBadge(booking.status)} className="badge">{booking.status}</span></div>
                    <div className="mb-2"><strong>Payment:</strong> <span style={getStatusBadge(booking.payment?.status)} className="badge">{booking.payment?.status}</span></div>
                    <div className="mb-2"><strong>Date:</strong> {new Date(booking.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
    return (
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
                  <span style={getStatusBadge(booking.status)} className="badge">
                    {booking.status}
                  </span>
                </td>
                <td>
                  <span style={getStatusBadge(booking.payment?.status)} className="badge">
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
  };

  const renderFlashSaleBookings = () => {
    if (bookings.length === 0) {
      return <div className="text-center">No Flash Sale Bookings yet</div>;
    }
    if (isMobile) {
      return (
        <div className="row">
          {bookings.map((booking) => (
            <div key={booking._id} className="col-12 mb-3">
              <div className="card" style={{ boxShadow: '0 0 45px rgba(0, 0, 0, 0.08)', fontFamily: 'Raleway, sans-serif' }}>
                <div className="card-body">
                  <h5 className="card-title">{booking.name}</h5>
                  <div className="card-text">
                    <div className="mb-2"><strong>Destination:</strong> {booking.flashSaleId?.destinationCity || "N/A"}</div>
                    <div className="mb-2"><strong>Airline:</strong> {booking.flashSaleId?.airline || "N/A"}</div>
                    <div className="mb-2"><strong>Price:</strong> ₦{booking.flashSaleId?.price?.toLocaleString() || "N/A"}</div>
                    <div className="mb-2"><strong>Status:</strong> <span style={getStatusBadge(booking.status)} className="badge">{booking.status}</span></div>
                    <div className="mb-2"><strong>Payment:</strong> <span style={getStatusBadge(booking.payment?.status)} className="badge">{booking.payment?.status}</span></div>
                    <div className="mb-2"><strong>Date:</strong> {new Date(booking.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
    return (
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Destination</th>
              <th>Airline</th>
              <th>Price</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.name}</td>
                <td>{booking.flashSaleId?.destinationCity || "N/A"}</td>
                <td>{booking.flashSaleId?.airline || "N/A"}</td>
                <td>
                  ₦{booking.flashSaleId?.price?.toLocaleString() || "N/A"}
                </td>
                <td>
                  <span style={getStatusBadge(booking.status)} className="badge">
                    {booking.status}
                  </span>
                </td>
                <td>
                  <span style={getStatusBadge(booking.payment?.status)} className="badge">
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
  };

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
      <div className="container" style={{
        marginBottom: "50px"
      }}>
        <h2 className="mb-4" style={{
          marginTop: isMobile ? "20px" : "100px",
        }}>My Bookings</h2>

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
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "flashsale" ? "active" : ""}`}
              onClick={() => setActiveTab("flashsale")}
            >
              Flash Sale Bookings
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
            {activeTab === "flashsale" && renderFlashSaleBookings()}
          </>
        )}
      </div>
    </div>
  );
}
