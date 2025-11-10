import { useEffect, useState } from "react";
import adminAxios from "../../api/adminAxios";
import socket from "../../socket";

export default function FlightBookings() {
  const [bookings, setBookings] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [tripTypeFilter, setTripTypeFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, [currentPage, tripTypeFilter, searchTerm]);

  useEffect(() => {
    // Listen for real-time updates
    socket.on('newFlightBooking', (newBooking) => {
      console.log('FlightBookings: New flight booking received:', newBooking);
      // Prepend the new booking to the list
      setBookings(prevBookings => {
        const newBookings = [newBooking, ...prevBookings];
        setTotalPages(Math.ceil(newBookings.length / 10));
        return newBookings;
      });
    });

    // Also listen for global refresh
    socket.on('globalRefresh', () => {
      console.log('FlightBookings: Global refresh triggered');
      fetchBookings();
    });

    return () => {
      socket.off('newFlightBooking');
      socket.off('globalRefresh');
    };
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage,
        limit: 10,
        tripType: tripTypeFilter,
        ...(searchTerm && { search: searchTerm })
      });

      const res = await adminAxios.get(`/flight-bookings?${params}`);
      setBookings(res.data.bookings);
      setTotalPages(res.data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching flight bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchBookings();
    setRefreshing(false);
  };

  const openDetails = (booking) => {
    setSelected(booking);
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
            <h2 className="fw-bold mb-0">Flight Booking Requests</h2>
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

          {/* Filters */}
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <select
                className="form-select form-select-sm"
                value={tripTypeFilter}
                onChange={(e) => setTripTypeFilter(e.target.value)}
              >
                <option value="all">All Trip Types</option>
                <option value="one-way">One Way</option>
                <option value="round-trip">Round Trip</option>
                <option value="multi-city">Multi City</option>
              </select>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle text-sm">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Trip Type</th>
                  <th>Departure</th>
                  <th>Destination</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      <div className="spinner-border spinner-border-sm text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </td>
                  </tr>
                ) : bookings.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4 text-muted">
                      No flight bookings found
                    </td>
                  </tr>
                ) : (
                  bookings.map((b) => (
                    <tr key={b._id}>
                      <td>
                        <div className="d-flex align-items-center">
                          {b.isNew && (
                            <span className="badge bg-danger me-2" style={{ fontSize: '0.7em' }}>NEW</span>
                          )}
                          <div>
                            <div className="fw-medium">{b.fullName}</div>
                            <div className="small text-muted">{b.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>{b.email}</td>
                      <td className="text-capitalize">{b.tripType}</td>
                      <td>
                        {b.tripType === 'multi-city'
                          ? b.multiCityFlights?.[0]?.from || 'Multiple'
                          : b.departureCity
                        }
                      </td>
                      <td>
                        {b.tripType === 'multi-city'
                          ? b.multiCityFlights?.[0]?.to || 'Multiple'
                          : b.destinationCity
                        }
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
            <FlightDetails booking={selected} />
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

export function FlightDetails({ booking }) {
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
            <small className="text-muted d-block">Trip Type</small>
            <span className="small text-capitalize">{booking.tripType}</span>
          </div>
          <div className="col-6">
            <small className="text-muted d-block">Travel Class</small>
            <span className="small text-capitalize">{booking.travelClass}</span>
          </div>
        </div>
      </div>

      {/* Flight Details */}
      <div className="mb-3">
        <small className="text-muted d-block">Flight Details</small>
        {booking.tripType === 'multi-city' ? (
          <div>
            {booking.multiCityFlights?.map((flight, index) => (
              <div key={index} className="mb-2 p-2 bg-light rounded">
                <div className="small">
                  <strong>Flight {index + 1}:</strong> {flight.from} → {flight.to}
                </div>
                <div className="small text-muted">
                  Date: {new Date(flight.date).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-2 bg-light rounded">
            <div className="small">
              <strong>{booking.departureCity} → {booking.destinationCity}</strong>
            </div>
            <div className="small text-muted">
              Departure: {booking.departureDate ? new Date(booking.departureDate).toLocaleDateString() : 'N/A'}
            </div>
            {booking.returnDate && (
              <div className="small text-muted">
                Return: {new Date(booking.returnDate).toLocaleDateString()}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Passengers */}
      <div className="mb-3">
        <small className="text-muted d-block">Passengers</small>
        <div className="row g-2">
          <div className="col-4">
            <div className="p-2 bg-light rounded text-center">
              <div className="small fw-bold">{booking.adults}</div>
              <div className="small text-muted">Adults</div>
            </div>
          </div>
          <div className="col-4">
            <div className="p-2 bg-light rounded text-center">
              <div className="small fw-bold">{booking.children || 0}</div>
              <div className="small text-muted">Children</div>
            </div>
          </div>
          <div className="col-4">
            <div className="p-2 bg-light rounded text-center">
              <div className="small fw-bold">{booking.infants || 0}</div>
              <div className="small text-muted">Infants</div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      {booking.preferredAirline && (
        <div className="mb-3">
          <small className="text-muted d-block">Preferred Airline</small>
          <span className="small">{booking.preferredAirline}</span>
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
