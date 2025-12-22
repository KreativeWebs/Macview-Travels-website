import React from "react";

export default function Maintenance() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#f6f8fa",
      textAlign: "center",
      padding: "20px"
    }}>
      <div style={{
        background: "#fff",
        padding: "40px",
        borderRadius: "12px",
        maxWidth: "500px",
        boxShadow: "0 4px 20px rgba(0,0,0,.1)"
      }}>
        <h1 style={{ color: "#175aa1" }}>We’ll Be Back Soon</h1>
        <p>
          Our website is currently undergoing maintenance.<br />
          We’re improving your experience.
        </p>
      </div>
    </div>
  );
}
