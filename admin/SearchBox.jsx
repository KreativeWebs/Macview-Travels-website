import React from "react";
export default function SearchBox() {
  return (
    <div className="position-relative">
      <input
        type="text"
        className="form-control"
        style={{ width: "280px", boxShadow: "none",
                borderColor: "#c9b5b5ff", }}
        placeholder="Search clients, bookings..."
      />
    </div>
  );
}
