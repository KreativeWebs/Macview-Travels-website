import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  const menu = [
    { name: "Home", path: "" },
    { name: "Clients", path: "clients" },
    { name: "Visa Requests", path: "visa" },
    { name: "Flight Bookings", path: "flights" },
    { name: "Transfers", path: "transfers" },
    { name: "Settings", path: "settings" },
  ];

  return (
    <div
      className={`h-100 bg-white shadow-sm d-flex flex-column ${
        open ? "p-2" : "p-1"
      }`}
      style={{ width: open ? "240px" : "70px", transition: "0.3s", minHeight: "100vh" }}
    >
      {/* Brand + Toggle */}
      <div className="d-flex align-items-center justify-content-between mb-3 p-2 border-bottom">
        <div className="d-flex align-items-center">

          {open && (
            <div className="ms-5">
             <img src="assets\img\logo macview.png" alt="" style={{width: "80px"}} />
            </div>
          )}
        </div>

        <button
          className="btn btn-light btn-sm"
          onClick={() => setOpen(!open)}
        >
          {open ? "⬅" : "➡"}
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-grow-1">
        {menu.map((m) => (
          <NavLink
            key={m.path}
            to={m.path}
            className={({ isActive }) =>
              `d-flex align-items-center rounded p-2 text-decoration-none mb-1 ${
                isActive
                  ? "bg-primary text-white"
                  : "text-dark bg-light hover"
              }`
            }
            style={{
              fontSize: "0.9rem",
              transition: "0.3s",
            }}
          >
            <span
              className="d-flex align-items-center justify-content-center bg-secondary bg-opacity-25 rounded"
              style={{
                width: "28px",
                height: "28px",
                marginRight: open ? "10px" : "0",
              }}
            >
              •
            </span>

            {open && <span>{m.name}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
