import React, { useState, useEffect, useRef } from "react";
import { useAuthStore } from "./src/store/authStore.jsx";
import { useNavigate } from "react-router-dom";


export default function Header({ toggleSidebar }) {
  const { user, adminLogout } = useAuthStore();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    // console.log('Toggle dropdown clicked');
    setShowDropdown(!showDropdown);
  };

  const handleLogout = async () => {
    await adminLogout();
    navigate('/adminlogin');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header
      className="bg-white p-3 d-flex justify-content-between align-items-center"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        boxShadow: "0 5px 30px rgba(0, 0, 0, 0.05)",
      }}
    >
      <div className="d-flex align-items-center gap-3">
        <img
          src="/assets\img\logo macview.png"
          alt="Logo Macview"
          style={{ width: "80px", marginLeft: "30px" }}
        />
        <button
          className="btn btn-sm no-focus border-0 bg-transparent"
          onClick={toggleSidebar}
          style={{
            fontSize: "22px",
            marginLeft: "50px",
          }}
          tabIndex="-1"
        >
          <i className="fa-solid fa-bars"></i>
        </button>

        <h5 className="mb-0 fw-bold" style={{ fontFamily: "Raleway" }}>
          Admin Dashboard
        </h5>
      </div>

      <div className="d-flex align-items-center gap-3">
  
        <div className="small">
          Hello, <strong>{user?.email || 'Admin'}</strong>
        </div>
        <div className="dropdown" style={{ position: "relative" }} ref={dropdownRef}>
          <button
            className="btn rounded-circle bg-secondary bg-opacity-50 d-flex align-items-center justify-content-center border-0"
            style={{ width: "40px", height: "40px" }}
            type="button"
            onClick={toggleDropdown}
            aria-expanded={showDropdown}
          >
            <i className="fa-solid fa-user"></i>
          </button>
          {showDropdown && (
            <ul className="dropdown-menu show" style={{
              position: "absolute",
              right: 0,
              top: "100%",
              zIndex: 1050,
              minWidth: "160px",
              backgroundColor: "white",
              border: "1px solid rgba(0,0,0,.15)",
              borderRadius: ".375rem",
              boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.175)"
            }}>
              <li>
                <button
                  className="dropdown-item"
                  style={{
                    width: "100%",
                    padding: ".25rem 1rem",
                    clear: "both",
                    fontWeight: 400,
                    color: "#212529",
                    textAlign: "inherit",
                    whiteSpace: "nowrap",
                    backgroundColor: "transparent",
                    border: 0
                  }}
                  onClick={handleLogout}
                >
                  <i className="fa-solid fa-sign-out-alt me-2"></i>
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}
