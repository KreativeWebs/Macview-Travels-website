import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: fetch from API
    setClients([
      {
        id: "C-1",
        name: "Jane Doe",
        email: "jane@example.com",
        phone: "+234...",
      },
      {
        id: "C-2",
        name: "John Smith",
        email: "john@example.com",
        phone: "+234...",
      },
    ]);
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h5 fw-bold m-0">Clients</h2>
        <button className="btn btn-primary">+ New Client</button>
      </div>

      {/* Table */}
      <div className="bg-white rounded shadow-sm p-3">
        <table className="table table-sm align-middle">
          <thead className="table-light small">
            <tr>
              <th>Client</th>
              <th>Email</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {clients.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>
                  <button
                    onClick={() => navigate(`/admin/clients/${c.id}`)}
                    className="btn btn-link p-0 text-primary small"
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
  );
}
