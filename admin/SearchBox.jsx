import React from "react";
export default function SearchBox() {
  return (
    <div className="position-relative">
      <input
        type="text"
        className="form-control"
        style={{ width: "280px", boxShadow: "none",
                borderColor: "#ced4da", }}
        placeholder="Search clients, bookings..."
      />
    </div>
  );
}
