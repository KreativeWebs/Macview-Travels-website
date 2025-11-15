import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Signup from "../pages/signup";
import Login from "../pages/Login";
import { useAuthStore } from "../store/authStore";
import Modal from "bootstrap/js/dist/modal";

function Header() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const getInitialsFromEmail = (email) => {
    if (!email) return "";
    const namePart = email.split("@")[0];
    const parts = namePart.split(/[._]/); // split on . or _
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return namePart.slice(0, 2).toUpperCase();
  };

  const initials = user ? getInitialsFromEmail(user.email) : "";

  const handleLogout = async () => {
    // Clean up any open modals
    document.querySelectorAll(".modal-backdrop").forEach((el) => el.remove());
    document.body.classList.remove("modal-open");
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";

    await logout();
    navigate("/");
  };

  const handleOpenLogin = (e) => {
    e.preventDefault();
    const loginModalElement = document.getElementById("loginModal");
    if (loginModalElement) {
      const loginModal = Modal.getOrCreateInstance(loginModalElement);
      loginModal.show();
    }
  };

  const handleManageBookings = (e) => {
    e.preventDefault();

    if (user) {
      // User is logged in, navigate to bookings page
      navigate("/managebookings");
    } else {
      // User not logged in, show login modal
      const loginModalElement = document.getElementById("loginModal");
      if (loginModalElement) {
        const loginModal = Modal.getOrCreateInstance(loginModalElement);
        loginModal.show();
      }
    }
  };

  return (
    <div>
      <Signup />
      <Login />
      {/* Navbar */}
      <div className="container-fluid position-relative p-0">
       <nav
  className="navbar navbar-expand-lg navbar-light sticky-top px-4 px-lg-5 py-3 py-lg-0"
  style={{
    alignItems: "center",
    justifyItems: "center",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  }}
>
  <Link
    to="/"
    className="navbar-brand p-0"
    style={{ display: "flex", alignItems: "center" }}
  >
    <img
      src="/assets/img/logo macview.png"
      style={{ width: "60px" }}
      alt="Macview Travels Logo"
    ></img>
    <h1
      className="text-primary m-0"
      style={{
        fontSize: "1rem",
        paddingLeft: "10px",
        fontFamily:
          "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif",
      }}
    >
      Macview Travels
    </h1>
  </Link>

  {/* Avatar beside hamburger on mobile */}
  <div className="d-flex align-items-center d-lg-none ms-auto me-2">
    <div
      style={{
        width: "30px",
        height: "30px",
        borderRadius: "50%",
        backgroundColor: user ? "#f1741e" : "#000000",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        fontSize: "14px",
        marginRight: "10px",
      }}
    >
      {user ? initials : <i className="fa fa-user"></i>}
    </div>
  </div>

  <button
    className="navbar-toggler"
    type="button"
    data-bs-toggle="collapse"
    data-bs-target="#navbarCollapse"
  >
    <span className="fa fa-bars" />
  </button>

  <div className="collapse navbar-collapse" id="navbarCollapse">
    <div className="navbar-nav ms-auto py-0 d-flex align-items-lg-center">
      <Link
        to="/"
        className="nav-item nav-link"
        style={{
          fontFamily: "'Raleway', sans-serif",
          fontWeight: "500",
          fontSize: "15px",
        }}
      >
        <i className="fa fa-home pe-2"></i>
        Home
      </Link>

      <Link
        to="/AboutUs"
        className="nav-item nav-link"
        style={{
          fontFamily: "'Raleway', sans-serif",
          fontWeight: "500",
          fontSize: "15px",
        }}
      >
        <i className="fa fa-users pe-4"></i>
       About Us
      </Link>

      <Link
        to="/Services"
        className="nav-item nav-link"
        style={{
          fontFamily: "'Raleway', sans-serif",
          fontWeight: "500",
          fontSize: "15px",
        }}
      >
        <i className="fa fa-briefcase pe-2"></i>
        Services
      </Link>

      <Link
        to="/Packages"
        className="nav-item nav-link"
        style={{
          fontFamily: "'Raleway', sans-serif",
          fontWeight: "500",
          fontSize: "15px",
        }}
      >
        <i className="fa fa-suitcase pe-2"></i>
        Packages
      </Link>

      <a
        href="#"
        onClick={handleManageBookings}
        className="nav-item nav-link"
        style={{
          fontFamily: "'Raleway', sans-serif",
          fontWeight: "500",
          fontSize: "15px",
          cursor: "pointer",
        }}
      >
        <i className="fa fa-plane pe-2"></i>
        Manage My Bookings
      </a>

      <Link
        to="/Contact"
        className="nav-item nav-link"
        style={{
          fontFamily: "'Raleway', sans-serif",
          fontWeight: "500",
          fontSize: "15px",
        }}
      >
        <i className="fa fa-envelope pe-2"></i>
        Contact Us
      </Link>

      {/* Avatar stays in place on desktop */}
      <div className="d-none d-lg-flex align-items-center ms-1 me-3">
        <div
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            backgroundColor: user ? "#f1741e" : "#000000",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "14px",
            marginRight: "10px",
          }}
        >
          {user ? initials : <i className="fa fa-user"></i>}
        </div>
      </div>

      {!user ? (
        <a
          href="#"
          onClick={handleOpenLogin}
          className="btn btn-secondary py-2 px-4 signin"
          style={{
            width: "120px",
            height: "30px",
            fontFamily: "Raleway",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Login
        </a>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <button
            onClick={handleLogout}
            className="btn py-2 px-4 text-white"
            style={{
              width: "120px",
              height: "30px",
              fontFamily: "Raleway",
              display: "flex",
              backgroundColor: "#f1741e",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  </div>
</nav>

      </div>
    </div>
  );
}

export default Header;
