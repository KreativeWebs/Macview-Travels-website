import React from "react";
import { Link } from "react-router-dom";
import Signup from "../pages/signup";
import Login from "../pages/Login";


function Header() {
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
                }}
              >
                <i class="fa fa-home pe-2"></i>
                Home
              </Link>

              <Link
                to="/AboutUs"
                className="nav-item nav-link"
                style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontWeight: "500",
                }}
              >
                <i class="fa fa-users pe-2"></i>
                About Us
              </Link>

              <Link
                to="/Services"
                className="nav-item nav-link"
                style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontWeight: "500",
                }}
              >
                <i class="fa fa-briefcase pe-2"></i>
                Services
              </Link>

              <Link
                to="/Packages"
                className="nav-item nav-link"
                style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontWeight: "500",
                }}
              >
                <i class="fa fa-suitcase pe-2"></i>
                Packages
              </Link>

              <Link
                to="/Contact"
                className="nav-item nav-link"
                style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontWeight: "500",
                }}
              >
                <i class="fa fa-envelope pe-2"></i>
                Contact Us
              </Link>

              <Link
                to="/"
                className="btn btn-secondary py-2 px-4 signin"
                data-bs-toggle="modal"
                data-bs-target="#loginModal"
                style={{
                  width: "120px",
                  height: "30px",
                  fontFamily: "Raleway",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "8px",
                  border: "none",
                }}
              >
                Login
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Header;
