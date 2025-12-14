import { useEffect, useState } from "react";
import adminAxios from "../../api/adminAxios";
import { useAuthStore } from "../../store/authStore";
import socket from "../../socket";
import { Link } from "react-router-dom";

export default function PackageBookings() {
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
    socket.on('packageBookingStatusUpdate', (update) => {
      console.log('PackageBookings: Received status update:', update);
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

    // Listen for new package bookings
    socket.on('newPackageBooking', (newBooking) => {
      console.log('PackageBookings: New package booking received:', newBooking);
      // Prepend the new booking to the list
      setBookings(prevBookings => {
        const newBookings = [newBooking, ...prevBookings];
        setTotalPages(Math.ceil(newBookings.length / 10));
        return newBookings;
      });
    });

    // Also listen for global refresh
    socket.on('globalRefresh', () => {
      console.log('PackageBookings: Global refresh triggered');
      fetchBookings();
    });

    return () => {
      socket.off('packageBookingStatusUpdate');
      socket.off('newPackageBooking');
      socket.off('globalRefresh');
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

      const res = await adminAxios.get(`/package-bookings?${params}`);
      setBookings(res.data.bookings);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Error fetching package bookings:", error);
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
      const res = await adminAxios.get(`/package-bookings/${booking._id}`);
      booking = res.data.booking;
    } catch (error) {
      console.error("Error fetching full booking details:", error);
      return;
    }

    setSelected(booking);
    setSelectedRow(booking._id);
    // Mark as viewed (remove new indicator)
    if (booking.isNew) {
      setBookings(prevBookings =>
        prevBookings.map(b => b._id === booking._id ? { ...b, isNew: false } : b)
      );
    }
  };

  return (
    <div className="row g-4">
      {/* Bookings Table */}
      <div className="col-12 col-lg-8">
        <div className="bg-white p-3 rounded shadow-sm">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="fw-bold mb-0">Package Bookings</h2>
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
                placeholder="Search by name, email or package..."
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
                  <th>Email</th>
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
                      No package bookings found
                    </td>
                  </tr>
                ) : (
                  bookings.map((b) => (
                    <tr key={b._id} className={selectedRow === b._id ? 'table-active' : ''}>
                      <td>
                        <div className="d-flex align-items-center">
                          {b.isNew && (
                            <span className="badge bg-danger me-2" style={{ fontSize: '0.7em' }}>NEW</span>
                          )}
                          <div>
                            <div className="fw-medium">{b.fullName}</div>
                          </div>
                        </div>
                      </td>
                      <td>{b.email || 'N/A'}</td>
                      <td>{b.packageId?.city || 'N/A'}</td>
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
          {selected && selected.packageId?.title && (
            <h6 className="fw-bold mb-3">{selected.packageId.title}</h6>
          )}

          {selected ? (
            <PackageBookingDetails key={selected._id} booking={selected} onStatusUpdate={(id, newStatus) => {
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

export function PackageBookingDetails({ booking, onStatusUpdate }) {
  const [status, setStatus] = useState(booking.status);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    setStatus(booking.status);
  }, [booking.status]);

  const updateStatus = async (newStatus) => {
    try {
      setUpdating(true);
      await adminAxios.put(`/package-bookings/${booking._id}/status`, { status: newStatus });
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
            <span className="small">{booking.fullName}</span>
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
              {booking.whatsappNumber}
            </a>
          </div>

          <div className="col-6">
            <small className="text-muted d-block">Travel Date</small>
            <span className="small">{new Date(booking.travelDate).toLocaleDateString()}</span>
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
            <small className="text-muted d-block">Email</small>
            <span className="small">{booking.email || 'N/A'}</span>
          </div>
          <div className="col-6">
            <small className="text-muted d-block">Payment Status</small>
            <span className={`badge ${booking.payment?.status === 'paid' ? 'bg-success' : 'bg-warning'}`}>
              {booking.payment?.status || 'pending'}
            </span>
          </div>
          <div className="col-6">
            <small className="text-muted d-block">Amount</small>
            <span className="small">{booking.packageCurrency === "NGN" ? "₦" : "$"}{booking.packagePrice?.toLocaleString() || 'N/A'}</span>
          </div>
        </div>
      </div>

      {booking.packageId?.inclusions && booking.packageId.inclusions.length > 0 && (
        <div className="mb-3">
          <small className="text-muted d-block">Package Inclusions</small>
          <ul className="list-unstyled small">
            {booking.packageId.inclusions.map((inclusion, index) => (
              <li key={index} className="mb-1">
                <i className="fa fa-check text-success me-2" />
                {inclusion}
              </li>
            ))}
          </ul>
        </div>
      )}

      {booking.packageId?.requirements && booking.packageId.requirements.length > 0 && (
        <div className="mb-3">
          <small className="text-muted d-block">Requirements</small>
          <ul className="list-unstyled small">
            {booking.packageId.requirements.map((req, index) => (
              <li key={index} className="mb-1">
                <i className="fa fa-list text-primary me-2" />
                {req.label}
              </li>
            ))}
          </ul>
        </div>
      )}

      {booking.documents && booking.documents.length > 0 && (
        <div className="mb-3">
          <small className="text-muted d-block">Uploaded Documents</small>
          {booking.documents.map((doc, index) => (
            <div key={index} className="mb-3">
              <strong className="small">{doc.label}:</strong>
              {doc.fileUrl ? (
                <div className="mt-2">
                  {doc.fileUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                    <div className="text-center">
                      <img
                        src={doc.fileUrl}
                        alt={doc.label}
                        className="img-fluid rounded shadow-sm"
                        style={{ maxWidth: '100%', maxHeight: '200px', cursor: 'pointer' }}
                        onClick={() => window.open(doc.fileUrl, '_blank')}
                      />
                      <div className="mt-2 d-flex gap-2 justify-content-center">
                        <a
                          href={doc.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline-primary"
                        >
                          View Full Size
                        </a>
                        <button
                          onClick={() => handleDownload(doc.fileUrl, doc.originalName || `${doc.label}.jpg`)}
                          className="btn btn-sm btn-outline-success"
                        >
                          Download
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="d-flex gap-2 align-items-center">
                        <a
                          href={doc.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline-primary"
                        >
                          View Document
                        </a>
                        <button
                          onClick={() => handleDownload(doc.fileUrl, doc.originalName || `${doc.label}.pdf`)}
                          className="btn btn-sm btn-outline-success"
                        >
                          Download
                        </button>
                      </div>
                      <small className="text-muted d-block mt-1">
                        {doc.originalName || 'Document file'}
                      </small>
                    </div>
                  )}
                </div>
              ) : (
                <div className="small text-muted">
                  Not uploaded
                </div>
              )}
            </div>
          ))}
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
