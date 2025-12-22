import React from "react";
import { useState, useEffect } from "react";
import adminAxios from "../../api/adminAxios";
import socket from "../../socket";

export default function AdminHome() {
  const [stats, setStats] = useState({
    visaApplications: 0,
    flightRequests: 0,
    hotelBookings: 0,
    packageBookings: 0,
    airportTransfers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();

    // Listen for real-time stats updates
    socket.on('statsUpdate', (updatedStats) => {
      setStats(prevStats => ({
        ...prevStats,
        ...updatedStats
      }));
    });

    return () => {
      socket.off('statsUpdate');
    };
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);

      // Fetch overview data from backend
    const res = await adminAxios.get('/overview');
      const data = res.data;

      setStats({
        visaApplications: data.visaApplications || 0,
        flightRequests: data.flightBookings || 0,
        hotelBookings: data.hotelBookings || 0,
        packageBookings: data.packageBookings || 0,
        airportTransfers: 0, // Not in backend yet
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    { title: "Visa Applications", value: stats.visaApplications, loading },
    { title: "Flight Requests", value: stats.flightRequests, loading },
    { title: "Hotel Bookings", value: stats.hotelBookings, loading },
    { title: "Package Bookings", value: stats.packageBookings, loading },
  ];

  return (
    <div className="container-fluid">
      {/* Page Title */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Overview</h2>
        <div className="text-muted small">
          Monthly stats for {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}
        </div>
      </div>

      {/* Stat Cards */}
      <div className="row g-4 mb-4">
        {cards.map((c) => (
          <div key={c.title} className="col-12 col-md-4 col-lg-3">
            <div className="bg-white p-4 rounded shadow-sm">
              <div className="text-muted small">{c.title}</div>
              <div className="fs-3 fw-bold mt-2">
                {c.loading ? (
                  <div className="spinner-border spinner-border-sm text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  c.value
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Lists */}
      <div className="row g-4">
        <div className="col-12 col-lg-3">
          <div className="bg-white p-4 rounded shadow-sm">
            <h5 className="fw-semibold mb-3">Recent Visa Applications</h5>
            <MiniVisaList />
          </div>
        </div>

        <div className="col-12 col-lg-3">
          <div className="bg-white p-4 rounded shadow-sm">
            <h5 className="fw-semibold mb-3">Recent Flight Requests</h5>
            <MiniFlightList />
          </div>
        </div>

        <div className="col-12 col-lg-3">
          <div className="bg-white p-4 rounded shadow-sm">
            <h5 className="fw-semibold mb-3">Recent Hotel Bookings</h5>
            <MiniHotelList />
          </div>
        </div>

        <div className="col-12 col-lg-3">
          <div className="bg-white p-4 rounded shadow-sm">
            <h5 className="fw-semibold mb-3">Recent Package Bookings</h5>
            <MiniPackageList />
          </div>
        </div>
      </div>
    </div>
  );
}

export function MiniVisaList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentVisaApplications();

    // Listen for real-time updates
    socket.on('newVisaApplication', (newApplication) => {
      setItems(prevItems => [{ ...newApplication, _id: newApplication.id }, ...prevItems.slice(0, 4)]); // Keep only 5 items
    });

    return () => {
      socket.off('newVisaApplication');
    };
  }, []);

  const fetchRecentVisaApplications = async () => {
    try {
      setLoading(true);
      const res = await adminAxios.get('/visa-applications/recent');
      setItems(res.data.applications || []);
    } catch (error) {
      console.error("Error fetching recent visa applications:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-3">
        <div className="spinner-border spinner-border-sm text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return <div className="text-muted small py-3">No recent visa applications</div>;
  }

  return (
    <ul className="list-group">
      {items.map((it) => (
        <li
          key={it._id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <div className="d-flex align-items-center">
            <div>
              <div className="fw-medium">{it.fullName}</div>
              <div className="small text-muted">{it.destinationCountry} • {it.visaType}</div>
            </div>
            {it.isNew && (
              <div className="ms-2">
                <span className="badge bg-primary rounded-circle" style={{ width: '8px', height: '8px', padding: 0 }}>
                  <span className="visually-hidden">New</span>
                </span>
              </div>
            )}
          </div>
          <span className={`badge ${getStatusBadgeClass(it.status)}`}>{it.status}</span>
        </li>
      ))}
    </ul>
  );
}

export function MiniFlightList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentFlightBookings();

    // Listen for real-time updates
    socket.on('newFlightBooking', (newBooking) => {
      setItems(prevItems => [{ ...newBooking, _id: newBooking.id }, ...prevItems.slice(0, 4)]); // Keep only 5 items
    });

    return () => {
      socket.off('newFlightBooking');
    };
  }, []);

  const fetchRecentFlightBookings = async () => {
    try {
      setLoading(true);
    const res = await adminAxios.get('/flight-bookings/recent');
      setItems(res.data.bookings || []);
    } catch (error) {
      console.error("Error fetching recent flight bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-3">
        <div className="spinner-border spinner-border-sm text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return <div className="text-muted small py-3">No recent flight bookings</div>;
  }

  return (
    <ul className="list-group">
      {items.map((it) => (
        <li
          key={it._id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <div className="d-flex align-items-center">
            <div>
              <div className="fw-medium">{it.fullName}</div>
              <div className="small text-muted">
                {it.tripType === 'multi-city'
                  ? `${it.multiCityFlights?.length || 0} segments`
                  : `${it.departureCity} → ${it.destinationCity}`
                }
              </div>
            </div>
            {it.isNew && (
              <div className="ms-2">
                <span className="badge bg-primary rounded-circle" style={{ width: '8px', height: '8px', padding: 0 }}>
                  <span className="visually-hidden">New</span>
                </span>
              </div>
            )}
          </div>
          <span className={`badge ${getStatusBadgeClass(it.status)}`}>{it.status}</span>
        </li>
      ))}
    </ul>
  );
}

export function MiniHotelList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentHotelBookings();

    // Listen for real-time updates
    socket.on('newHotelBooking', (newBooking) => {
      setItems(prevItems => [{ ...newBooking, _id: newBooking.id }, ...prevItems.slice(0, 4)]); // Keep only 5 items
    });

    // Listen for read updates
    socket.on('hotelBookingRead', (updatedBooking) => {
      setItems(prevItems =>
        prevItems.map(item =>
          item._id === updatedBooking.id ? { ...item, isUnread: false } : item
        )
      );
    });

    return () => {
      socket.off('newHotelBooking');
      socket.off('hotelBookingRead');
    };
  }, []);

  const fetchRecentHotelBookings = async () => {
    try {
      setLoading(true);
      const res = await adminAxios.get('/hotel-bookings/recent');
      setItems(res.data.bookings || []);
    } catch (error) {
      console.error("Error fetching recent hotel bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-3">
        <div className="spinner-border spinner-border-sm text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return <div className="text-muted small py-3">No recent hotel bookings</div>;
  }

  return (
    <ul className="list-group">
      {items.map((it) => (
        <li
          key={it._id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <div className="d-flex align-items-center">
            <div>
              <div className="fw-medium">{it.fullName}</div>
              <div className="small text-muted">{it.destination}</div>
            </div>
            {it.isUnread && (
              <div className="ms-2">
                <span className="badge bg-primary rounded-circle" style={{ width: '8px', height: '8px', padding: 0 }}>
                  <span className="visually-hidden">New</span>
                </span>
              </div>
            )}
          </div>
          <span className={`badge ${getStatusBadgeClass(it.status)}`}>{it.status}</span>
        </li>
      ))}
    </ul>
  );
}

export function MiniPackageList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentPackageBookings();

    // Listen for real-time updates
    socket.on('newPackageBooking', (newBooking) => {
      setItems(prevItems => [{ ...newBooking, _id: newBooking.id }, ...prevItems.slice(0, 4)]); // Keep only 5 items
    });

    return () => {
      socket.off('newPackageBooking');
    };
  }, []);

  const fetchRecentPackageBookings = async () => {
    try {
      setLoading(true);
      const res = await adminAxios.get('/package-bookings/recent');
      setItems(res.data.bookings || []);
    } catch (error) {
      console.error("Error fetching recent package bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-3">
        <div className="spinner-border spinner-border-sm text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return <div className="text-muted small py-3">No recent package bookings</div>;
  }

  return (
    <ul className="list-group">
      {items.map((it) => (
        <li
          key={it._id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <div className="d-flex align-items-center">
            <div>
              <div className="fw-medium">{it.fullName}</div>
              <div className="small text-muted">{it.packageTitle}</div>
            </div>
            {it.isNew && (
              <div className="ms-2">
                <span className="badge bg-primary rounded-circle" style={{ width: '8px', height: '8px', padding: 0 }}>
                  <span className="visually-hidden">New</span>
                </span>
              </div>
            )}
          </div>
          <span className={`badge ${getStatusBadgeClass(it.status)}`}>{it.status}</span>
        </li>
      ))}
    </ul>
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
