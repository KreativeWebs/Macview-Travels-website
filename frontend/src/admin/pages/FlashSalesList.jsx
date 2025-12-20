import { useEffect, useState } from "react";
import adminAxios from "../../api/adminAxios";
import { useAuthStore } from "../../store/authStore";
import socket from "../../socket";
import { Link } from "react-router-dom";

export default function FlashSalesList() {
  const [bookings, setBookings] = useState([]);
  const [selected, setSelected] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedWeek, setSelectedWeek] = useState('');

  useEffect(() => {
    fetchBookings();
  }, [currentPage, statusFilter, searchTerm, selectedYear, selectedMonth, selectedWeek]);

  useEffect(() => {
    // Listen for real-time updates
    socket.on('flashSaleBookingStatusUpdate', (update) => {
      console.log('FlashSalesList: Received status update:', update);
      // Update the booking status in real-time
      setBookings(prevBookings =>
        prevBookings.map(booking =>
          booking._id === update.id
            ? { ...booking, status: update.status, updatedAt: update.updatedAt }
            : booking
        )
      );

      // Update selected booking if it's the one being updated
      if (selected && selected._id === update.id) {
        setSelected(prev => ({ ...prev, status: update.status, updatedAt: update.updatedAt }));
      }
    });

    // Listen for new flash sale bookings
    socket.on('newFlashSaleBooking', (newBooking) => {
      console.log('🔌 FlashSalesList: New flash sale booking received:', newBooking);
      // Prepend the new booking to the list
      setBookings(prevBookings => {
        const newBookings = [newBooking, ...prevBookings];
        setTotalPages(Math.ceil(newBookings.length / 10));
        return newBookings;
      });
    });

    // Listen for flash sale booking updates
    socket.on('flashSaleBookingUpdate', (update) => {
      console.log('FlashSalesList: Received booking update:', update);
      // Update the booking in real-time
      setBookings(prevBookings =>
        prevBookings.map(booking =>
          booking._id === update.id ? { ...booking, ...update.booking } : booking
        )
      );

      // Update selected booking if it's the one being updated
      if (selected && selected._id === update.id) {
        setSelected(prev => ({ ...prev, ...update.booking }));
      }
    });

    // Also listen for global refresh
    socket.on('globalRefresh', () => {
      console.log('FlashSalesList: Global refresh triggered');
      fetchBookings();
    });

    return () => {
      socket.off('flashSaleBookingStatusUpdate');
      socket.off('newFlashSaleBooking');
      socket.off('flashSaleBookingUpdate');
      socket.off('globalRefresh');
    };
  }, [selected]);

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

      const res = await adminAxios.get(`/flash-sale-bookings?${params}`);
      setBookings(res.data.bookings);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Error fetching flash sale bookings:", error);
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
    // Always fetch full details to ensure all fields are populated
    try {
      const res = await adminAxios.get(`/flash-sale-bookings/${booking._id}`);
      booking = res.data.booking;
    } catch (error) {
      console.error("Error fetching full booking details:", error);
      return;
    }

    setSelected(booking);
    setSelectedRow(booking._id);
    // Mark as viewed (remove new indicator)
    if (booking.isUnread) {
      setBookings(prevBookings =>
        prevBookings.map(b => b._id === booking._id ? { ...b, isUnread: false } : b)
      );
    }
  };

  return (
    <div className="row g-4">
      {/* Bookings Table */}
      <div className="col-12 col-lg-8">
        <div className="bg-white p-3 rounded shadow-sm">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="fw-bold mb-0">Flash Sale Bookings</h2>
            <div className="d-flex gap-2">
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

          {/* Filters */}
          <div className="row g-3 mb-3">
            <div className="col-md-3">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search by name or WhatsApp..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-3">
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
                  <th>WhatsApp</th>
                  <th>Destination</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      <div className="spinner-border spinner-border-sm text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </td>
                  </tr>
                ) : bookings.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-muted">
                      No flash sale bookings found
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
                            <div className="fw-medium">{b.name}</div>
                          </div>
                        </div>
                      </td>
                      <td>{formatWhatsApp(b.whatsappNumber)}</td>
                      <td>{b.flashSaleId?.destinationCity || 'N/A'}</td>
                      <td>
                        <span className={`badge ${getStatusBadgeClass(b.status)}`}>{b.status}</span>
                      </td>
                      <td>{new Date(b.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button
                          onClick={() => openDetails(b)}
                          className="btn btn-sm btn-outline-primary"
                        >
                          View More
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
          {selected && selected.flashSaleId?.destinationCity && (
            <h6 className="fw-bold mb-3">{selected.flashSaleId.destinationCity} Flash Sale</h6>
          )}

          {selected ? (
            <FlashSaleBookingDetails key={selected._id} booking={selected} onStatusUpdate={(id, newStatus) => {
              setBookings(prevBookings =>
                prevBookings.map(b => b._id === id ? { ...b, status: newStatus } : b)
              );
              setSelected(prevSelected => prevSelected && prevSelected._id === id ? { ...prevSelected, status: newStatus } : prevSelected);
            }} />
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

export function FlashSaleBookingDetails({ booking, onStatusUpdate }) {
  const [status, setStatus] = useState(booking.status);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    setStatus(booking.status);
  }, [booking.status]);

  const updateStatus = async (newStatus) => {
    try {
      setUpdating(true);
      await adminAxios.put(`/flash-sale-bookings/${booking._id}/status`, { status: newStatus });
      setStatus(newStatus);
      onStatusUpdate(booking._id, newStatus);
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setUpdating(false);
    }
  };

  const handleDownload = async (fileUrl, fileName) => {
    try {
      // For Cloudinary URLs, we need to fetch and download as blob
      const response = await fetch(fileUrl);
      const blob = await response.blob();

      // Create a temporary URL for the blob
      const blobUrl = window.URL.createObjectURL(blob);

      // Create a temporary anchor element and trigger download
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback: open in new tab
      window.open(fileUrl, '_blank');
    }
  };

  return (
    <div>
      <div className="mb-3">
        <div className="row g-2">
          <div className="col-6">
            <small className="text-muted d-block">Name</small>
            <span className="small">{booking.name}</span>
          </div>
          <div className="col-6">
            <small className="text-muted d-block">WhatsApp Number</small>
            <a
              href={`https://wa.me/${booking.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="small text-primary"
              style={{ textDecoration: 'none' }}
            >
              {formatWhatsApp(booking.whatsappNumber)}
            </a>
          </div>
          <div className="col-6">
            <small className="text-muted d-block">Date of Birth</small>
            <span className="small">{new Date(booking.dateOfBirth).toLocaleDateString()}</span>
          </div>
          <div className="col-6">
            <small className="text-muted d-block">Gender</small>
            <span className="small">{booking.gender}</span>
          </div>
          <div className="col-6">
            <small className="text-muted d-block">Adults</small>
            <span className="small">{booking.adults || 0}</span>
          </div>
          <div className="col-6">
            <small className="text-muted d-block">Children</small>
            <span className="small">{booking.children || 0}</span>
          </div>
          <div className="col-6">
            <small className="text-muted d-block">Infants</small>
            <span className="small">{booking.infants || 0}</span>
          </div>
          <div className="col-6">
            <small className="text-muted d-block">Status</small>
            <select
              className="form-select form-select-sm"
              value={status}
              onChange={(e) => updateStatus(e.target.value)}
              disabled={updating}
            >
              <option value="received">Received</option>
              <option value="booked">Booked</option>
              <option value="not booked">Not Booked</option>
            </select>
          </div>
          <div className="col-6">
            <small className="text-muted d-block">Payment Status</small>
            <span className={`badge ${booking.payment?.status === 'paid' ? 'bg-success' : 'bg-warning'}`}>
              {booking.payment?.status || 'pending'}
            </span>
          </div>
          <div className="col-6">
            <small className="text-muted d-block">Amount</small>
            <span className="small">₦{booking.flashSaleId?.price?.toLocaleString() || 'N/A'}</span>
          </div>
        </div>
      </div>

      {booking.passportPhotograph && (
        <div className="mb-3">
          <small className="text-muted d-block">Passport Photograph</small>
          <div className="mt-2">
            <img
              src={booking.passportPhotograph}
              alt="Passport Photograph"
              className="img-fluid rounded shadow-sm"
              style={{ maxWidth: '100%', maxHeight: '200px', cursor: 'pointer' }}
              crossOrigin="anonymous"
              onClick={() => window.open(booking.passportPhotograph, '_blank')}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
              }}
            />
            <div className="mt-2 d-flex gap-2 justify-content-center">
              <a
                href={booking.passportPhotograph}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-outline-primary"
              >
                View Full Size
              </a>
              <button
                onClick={() => handleDownload(booking.passportPhotograph, `${booking.name}_passport.jpg`)}
                className="btn btn-sm btn-outline-success"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper function for status badges
const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'received': return 'bg-warning';
    case 'booked': return 'bg-success';
    case 'not booked': return 'bg-danger';
    default: return 'bg-secondary';
  }
};

// Helper function to format WhatsApp number with country code
const formatWhatsApp = (number) => {
  if (!number) return 'N/A';
  if (number.startsWith('+')) {
    // Find the first space or assume country code is 3-4 digits after +
    const match = number.match(/^(\+\d{1,4})(.*)$/);
    if (match) {
      return `${match[1]} ${match[2]}`;
    }
  }
  return number;
};
