import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ClientProfile() {
  const { pathname } = useLocation();
  const id = pathname.split("/").pop();
  const [client, setClient] = useState(null);

  useEffect(() => {
    // TODO: fetch client by id and their bookings
    setClient({
      id,
      name: "Jane Doe",
      email: "jane@example.com",
      phone: "+234...",
    });
  }, [id]);

  if (!client) return <div>Loading...</div>;

  return (
    <div className="bg-white p-4 rounded shadow-sm">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="h5 fw-bold m-0">{client.name}</h2>
          <div className="small text-muted">
            {client.email} • {client.phone}
          </div>
        </div>
        <div className="small fw-semibold text-secondary">Client ID: {client.id}</div>
      </div>

      {/* Requests */}
      <h6 className="fw-semibold mb-2">All Requests</h6>

      <div className="d-flex flex-column gap-2">
        {/* Replace with real data later */}
        <div className="border rounded p-2 small">
          Visa • Kenya • V-1001 • <strong>received</strong>
        </div>

        <div className="border rounded p-2 small">
          Flight • Lagos → Doha • F-2001 • <strong>pending</strong>
        </div>
      </div>
    </div>
  );
}
