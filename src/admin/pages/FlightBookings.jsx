import { useState, useEffect } from "react";

export default function FlightBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // TODO: fetch /api/flight-bookings
    setBookings([
      {
        id: "F-2001",
        client: "Alpha Corp",
        route: "Lagos → Doha",
        status: "pending",
      },
      {
        id: "F-2002",
        client: "Beta Travel",
        route: "Abuja → Cairo",
        status: "confirmed",
      },
    ]);
  }, []);

  return (
    <div>
      <h2 className="h5 fw-bold mb-3">Flight Bookings</h2>

      <div className="bg-white p-3 rounded shadow-sm">
        <table className="table table-sm align-middle">
          <thead className="table-light small">
            <tr>
              <th>Client</th>
              <th>Route</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td>{b.client}</td>
                <td>{b.route}</td>
                <td>
                  <span className="badge bg-secondary">{b.status}</span>
                </td>
                <td>
                  <button className="btn btn-link p-0 text-primary">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
