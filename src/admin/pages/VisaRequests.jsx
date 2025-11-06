import { useEffect, useState } from "react";

export default function VisaRequests() {
  const [applications, setApplications] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    // Temporary dummy data
    setApplications([
      {
        _id: "V-1001",
        fullName: "Jane Doe",
        country: "Kenya",
        status: "received",
        createdAt: "2025-10-20",
      },
      {
        _id: "V-1002",
        fullName: "John Smith",
        country: "Egypt",
        status: "processing",
        createdAt: "2025-10-18",
      },
    ]);
  }, []);

  const openDetails = (app) => setSelected(app);

  return (
    <div className="row g-4">
      {/* Applications Table */}
      <div className="col-12 col-lg-8">
        <div className="bg-white p-3 rounded shadow-sm">
          <h2 className="fw-bold mb-3">Visa Applications</h2>

          <div className="table-responsive">
            <table className="table table-hover align-middle text-sm">
              <thead className="table-light">
                <tr>
                  <th>Client</th>
                  <th>Country</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {applications.map((a) => (
                  <tr key={a._id}>
                    <td>{a.fullName}</td>
                    <td>{a.country}</td>
                    <td>
                      <span className="badge bg-secondary">{a.status}</span>
                    </td>
                    <td>{a.createdAt}</td>
                    <td>
                      <button
                        onClick={() => openDetails(a)}
                        className="btn btn-sm btn-outline-primary"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Details Panel */}
      <div className="col-12 col-lg-4">
        <div className="bg-white p-3 rounded shadow-sm">
          <h5 className="fw-semibold mb-3">Details</h5>

          {selected ? (
            <VisaDetails app={selected} />
          ) : (
            <div className="text-muted small">
              Select an application to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function VisaDetails({ app }) {
  return (
    <div>
      <h6 className="fw-bold">{app.fullName}</h6>
      <p className="small text-muted mb-1">Country: {app.country}</p>
      <p className="small text-muted mb-3">Status: {app.status}</p>

      <div className="d-flex gap-2">
        <button className="btn btn-warning btn-sm">Mark Processing</button>
        <button className="btn btn-success btn-sm">Approve</button>
        <button className="btn btn-danger btn-sm">Reject</button>
      </div>
    </div>
  );
}
