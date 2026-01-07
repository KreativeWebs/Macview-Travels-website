import React from "react";
import { useEffect, useState } from "react";
import adminAxios from "../src/api/adminAxios";
import socket from "../src/socket";
import { Link } from "react-router-dom";

export default function HotelBookings() {
  const [bookings, setBookings] = useState([]);
  const [selected, setSelected] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedWeek, setSelectedWeek] = useState('');

  useEffect(() => {
    fetchBookings();
  }, [currentPage, searchTerm, statusFilter, selectedYear, selectedMonth, selectedWeek]);

  useEffect(() => {
    // Listen for real-time updates
    socket.on('newHotelBooking', (newBooking) => {
      console.log('HotelBookings: New hotel booking received:', newBooking);
      // Prepend the new booking to the list
      setBookings(prevBookings => {
        const newBookings = [newBooking, ...prevBookings];
        setTotalPages(Math.ceil(newBookings.length / 10));
        return newBookings;
      });
    });

    // Also listen for global refresh
    socket.on('globalRefresh', () => {
      console.log('HotelBookings: Global refresh triggered');
      fetchBookings();
    });

    // Listen for status updates
    socket.on('hotelBookingStatusUpdate', ({ id, status }) => {
      console.log('HotelBookings: Status updated for booking:', id, status);
      setBookings(prevBookings =>
        prevBookings.map(b => b._id === id ? { ...b, status } : b)
      );
    });

    return () => {
      socket.off('newHotelBooking');
      socket.off('globalRefresh');
      socket.off('hotelBookingStatusUpdate');
    };
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage,
        limit: 10,
        status: statusFilter,
        ...(searchTerm && { search: searchTerm }),
        ...(selectedYear && { year: selectedYear }),
        ...(selectedMonth && { month: selectedMonth }),
        ...(selectedWeek && { week: selectedWeek })
      });

      const res = await adminAxios.get(`/hotel-bookings?${params}`);
      setBookings(res.data.bookings);
      setTotalPages(res.data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching hotel bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchBookings();
    setRefreshing(false);
  };

  const openDetails = async (booking) => {
    setSelected(booking);
    setSelectedRow(booking._id);
    // Mark as viewed (remove new indicator)
    if (booking.isUnread) {
      try {
        await adminAxios.put(`/hotel-bookings/${booking._id}/read`);
        setBookings(prevBookings =>
          prevBookings.map(b => b._id === booking._id ? { ...b, isUnread: false } : b)
        );
      } catch (error) {
        console.error("Error marking booking as read:", error);
      }
    }
  };

  const updatePaymentStatus = async (id, newStatus) => {
    try {
      const res = await adminAxios.put(`/hotel-bookings/${id}/payment`, { status: newStatus });
      // Update local state
      setBookings(prev => prev.map(b => b._id === id ? { ...b, payment: res.data.booking.payment } : b));
      if (selected && selected._id === id) setSelected(prev => ({ ...prev, payment: res.data.booking.payment }));
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };

  return (
    <div className="row g-4">
      {/* Bookings Table */}
      <div className="col-12 col-lg-8">
        <div className="bg-white p-3 rounded shadow-sm">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="fw-bold mb-0">Hotel Booking Requests</h2>
            <div className="d-flex gap-2">
              <Link to="/admin/addnewhotel" className="btn btn-primary btn-sm">
                <i className="fas fa-plus me-2"></i>
                New Hotel
              </Link>
            
              <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="btn btn-outline-primary btn-sm"
              title="Refresh bookings"
            >
              {refreshing ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Refreshing...
                </>
              ) : (
                <>
                  <i className="fas fa-sync-alt me-2"></i>
                  Refresh
                </>
              )}
            </button>
          </div>
          </div>

          {/* Search */}
          <div className="row g-3 mb-3">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <select
                className="form-select form-select-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="received">Received</option>
                <option value="booked">Booked</option>
                <option value="not booked">Not Booked</option>
              </select>
            </div>
            <div className="col-md-2">
              <select
                className="form-select form-select-sm"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="">All Years</option>
                {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <select
                className="form-select form-select-sm"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                <option value="">All Months</option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                  <option key={month} value={month}>
                    {new Date(0, month - 1).toLocaleString('default', { month: 'long' })}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <select
                className="form-select form-select-sm"
                value={selectedWeek}
                onChange={(e) => setSelectedWeek(e.target.value)}
              >
                <option value="">All Weeks</option>
                {Array.from({ length: 5 }, (_, i) => i + 1).map(week => (
                  <option key={week} value={week}>Week {week}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle text-sm">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Destination</th>
                  <th>Check-in</th>
                  <th>Check-out</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="8" className="text-center py-4">
                      <div className="spinner-border spinner-border-sm text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </td>
                  </tr>
                ) : !Array.isArray(bookings) || bookings.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-4 text-muted">
                      No hotel bookings found
                    </td>
                  </tr>
                ) : (
                  bookings.map((b) => (
                    <tr key={b._id} className={selectedRow === b._id ? 'table-active' : ''}>
                          <td>
                            <div className="d-flex align-items-center">
                          {b.isUnread && (
                            <span className="badge bg-danger me-2" style={{ fontSize: '0.7em' }}>NEW</span>
                          )}
                          <div>
                            <div className="fw-medium">{b.fullName}</div>
                            <div className="small text-muted">{b.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>{b.email}</td>
                      <td>{b.destination}</td>
                      <td>{new Date(b.checkInDate).toLocaleDateString()}</td>
                      <td>{new Date(b.checkOutDate).toLocaleDateString()}</td>
                      <td>
                        <span className={`badge ${b.status === 'received' ? 'bg-warning' : b.status === 'booked' ? 'bg-success' : 'bg-danger'}`}>
                          {b.status}
                        </span>
                      </td>
                      <td>{new Date(b.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button
                          onClick={() => openDetails(b)}
                          className="btn btn-sm btn-outline-primary"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="mt-3">
              <ul className="pagination pagination-sm justify-content-center">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>

      {/* Details Panel */}
      <div className="col-12 col-lg-4">
        <div className="bg-white p-3 rounded shadow-sm">
          <h5 className="fw-semibold mb-3">Details</h5>

          {selected ? (
            <HotelDetails key={selected._id} booking={selected} onStatusUpdate={(id, newStatus) => {
              setBookings(prevBookings =>
                prevBookings.map(b => b._id === id ? { ...b, status: newStatus } : b)
              );
              setSelected(prevSelected => prevSelected && prevSelected._id === id ? { ...prevSelected, status: newStatus } : prevSelected);
            }} updatePaymentStatus={updatePaymentStatus} />
          ) : (
            <div className="text-muted small">
              Select a booking to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function HotelDetails({ booking, onStatusUpdate, updatePaymentStatus }) {
  const [status, setStatus] = useState(booking.status);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    setStatus(booking.status);
  }, [booking.status]);

  const handleStatusUpdate = async (newStatus) => {
    try {
      setUpdating(true);
      await adminAxios.put(`/hotel-bookings/${booking._id}/status`, { status: newStatus });
      setStatus(newStatus);
      onStatusUpdate(booking._id, newStatus);
    } catch (error) {
      console.error("Error updating hotel booking status:", error);
    } finally {
      setUpdating(false);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(booking.passportPhotograph.fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `passport-${booking.fullName || 'photograph'}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
      // Fallback to opening in new tab if download fails
      window.open(booking.passportPhotograph.fileUrl, '_blank');
    }
  };

  return (
    <div>
      <h6 className="fw-bold">{booking.email}</h6>

      <div className="mb-3">
        <div className="row g-2">
          <div className="col-6">
            <small className="text-muted d-block">Name</small>
            <span className="small">{booking.fullName}</span>
          </div>
          <div className="col-6">
            <small className="text-muted d-block">WhatsApp Number</small>
            <a
              href={`https://wa.me/${booking.phoneNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="small text-primary"
              style={{ textDecoration: 'none' }}
            >
              {booking.phoneNumber}
            </a>
          </div>
          <div className="col-6">
            <small className="text-muted d-block">Gender</small>
            <span className="small text-capitalize">{booking.gender}</span>
          </div>
          <div className="col-6">
            <small className="text-muted d-block">Date of Birth</small>
            <span className="small">{booking.dob}</span>
          </div>
          <div className="col-6">
            <small className="text-muted d-block">Status</small>
            <select
              className="form-select form-select-sm"
              value={status}
              onChange={(e) => handleStatusUpdate(e.target.value)}
              disabled={updating}
            >
              <option value="received">Received</option>
              <option value="booked">Booked</option>
              <option value="not booked">Not Booked</option>
            </select>
          </div>
          <div className="col-6">
            <small className="text-muted d-block">Payment Status</small>
            <div className="d-flex align-items-center gap-2">
              <span className={`badge ${booking.payment?.status === 'paid' ? 'bg-success' : booking.payment?.status === 'pending' ? 'bg-warning' : 'bg-danger'}`}>
                {booking.payment?.status || 'pending'}
              </span>
              <select className="form-select form-select-sm w-auto" value={booking.payment?.status || 'pending'} onChange={(e) => updatePaymentStatus(booking._id, e.target.value)}>
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Hotel Details */}
      <div className="mb-3">
        <small className="text-muted d-block">Hotel Details</small>
        <div className="p-2 bg-light rounded">
          <div className="small">
            <strong>{booking.destination}</strong>
          </div>
          <div className="small text-muted">
            Check-in: {new Date(booking.checkInDate).toLocaleDateString()}
          </div>
          <div className="small text-muted">
            Check-out: {new Date(booking.checkOutDate).toLocaleDateString()}
          </div>
          <div className="small text-muted">
            Rooms: {booking.rooms}, Guests: {booking.guests}
          </div>
          <div className="small text-muted">
            Room Type: {booking.roomType}
          </div>
          {booking.starRating && booking.starRating !== 'any' && (
            <div className="small text-muted">
              Star Rating: {booking.starRating} ★
            </div>
          )}
        </div>
      </div>

      {/* Amenities */}
      {booking.amenities && booking.amenities.length > 0 && (
        <div className="mb-3">
          <small className="text-muted d-block">Preferred Amenities</small>
          <div className="d-flex flex-wrap gap-1">
            {booking.amenities.map((amenity, index) => (
              <span key={index} className="badge bg-secondary small">{amenity}</span>
            ))}
          </div>
        </div>
      )}

      {/* Passport Photograph */}
      {booking.passportPhotograph && booking.passportPhotograph.fileUrl && (
        <div className="mb-3">
          <small className="text-muted d-block">Passport Photograph</small>
          <div className="mt-2">
            <img
              src={booking.passportPhotograph.fileUrl}
              alt="Passport Photograph"
              className="img-fluid rounded"
              style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover', cursor: 'pointer' }}
              onClick={() => window.open(booking.passportPhotograph.fileUrl, '_blank')}
              title="Click to view full size"
            />
            <div className="mt-2">
              <button
                className="btn btn-sm btn-outline-primary me-2"
                onClick={() => window.open(booking.passportPhotograph.fileUrl, '_blank')}
              >
                View Full Size
              </button>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={handleDownload}
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Additional Info */}
      {booking.budget && (
        <div className="mb-3">
          <small className="text-muted d-block">Budget per night</small>
          <span className="small">{booking.budget}</span>
        </div>
      )}

      {booking.purpose && (
        <div className="mb-3">
          <small className="text-muted d-block">Purpose of Travel</small>
          <span className="small">{booking.purpose}</span>
        </div>
      )}

      {booking.notes && (
        <div className="mb-3">
          <small className="text-muted d-block">Notes</small>
          <p className="small mb-0">{booking.notes}</p>
        </div>
      )}
    </div>
  );
}
