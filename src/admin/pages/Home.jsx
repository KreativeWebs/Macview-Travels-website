export default function Home() {
  const cards = [
    { title: "Visa Applications", value: 120 },
    { title: "Flight Requests", value: 85 },
    { title: "Transfers", value: 42 },
    { title: "Revenue (USD)", value: "$12,900" },
  ];

  return (
    <div className="container-fluid">
      {/* Page Title */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Overview</h2>
      </div>

      {/* Stat Cards */}
      <div className="row g-4 mb-4">
        {cards.map((c) => (
          <div key={c.title} className="col-12 col-md-4 col-lg-3">
            <div className="bg-white p-4 rounded shadow-sm">
              <div className="text-muted small">{c.title}</div>
              <div className="fs-3 fw-bold mt-2">{c.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Lists */}
      <div className="row g-4">
        <div className="col-12 col-lg-6">
          <div className="bg-white p-4 rounded shadow-sm">
            <h5 className="fw-semibold mb-3">Recent Visa Applications</h5>
            <MiniVisaList />
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="bg-white p-4 rounded shadow-sm">
            <h5 className="fw-semibold mb-3">Recent Flight Requests</h5>
            <MiniFlightList />
          </div>
        </div>
      </div>
    </div>
  );
}

export function MiniVisaList() {
  const items = [
    { id: "V-1001", name: "Jane Doe", country: "Kenya", status: "received" },
    { id: "V-1002", name: "John Smith", country: "Egypt", status: "processing" },
    { id: "V-1003", name: "Mary Jay", country: "South Africa", status: "completed" },
  ];

  return (
    <ul className="list-group">
      {items.map((it) => (
        <li
          key={it.id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <div>
            <div className="fw-medium">{it.name}</div>
            <div className="small text-muted">{it.country} • {it.id}</div>
          </div>
          <span className="badge bg-secondary">{it.status}</span>
        </li>
      ))}
    </ul>
  );
}

export function MiniFlightList() {
  const items = [
    { id: "F-2001", name: "Alpha Corp", route: "Lagos → Doha", status: "pending" },
    { id: "F-2002", name: "Beta Travel", route: "Abuja → Cairo", status: "confirmed" },
  ];

  return (
    <ul className="list-group">
      {items.map((it) => (
        <li
          key={it.id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <div>
            <div className="fw-medium">{it.name}</div>
            <div className="small text-muted">{it.route} • {it.id}</div>
          </div>
          <span className="badge bg-secondary">{it.status}</span>
        </li>
      ))}
    </ul>
  );
}
