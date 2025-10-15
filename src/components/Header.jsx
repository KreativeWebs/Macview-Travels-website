import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      {/* Spinner Start */}
      {/* <div
      id="spinner"
      className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
    >
      <div
        className="spinner-border text-primary"
        style={{ width: "3rem", height: "3rem" }}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div> */}
      {/* Spinner End */}

      {/* Topbar Start */}
      <div className="container-fluid bg-dark px-5 d-none d-lg-block">
        <div className="row gx-0">
          <div className="col-lg-8 text-center text-lg-start mb-2 mb-lg-0">
            <div
              className="d-inline-flex align-items-center"
              style={{ height: 45 }}
            >
              <small className="me-3 text-light">
                <i className="fa fa-map-marker-alt me-2" />
                Suite 436, Ikeja Plaza, Lagos, Nigeria
              </small>
              <small className="me-3 text-light">
                <i className="fa fa-phone-alt me-2" />
                +234 911 011 1120, +234 816 905 6956
              </small>
              <small className="text-light">
                <i className="fa fa-envelope-open me-2" />
                info@macviewtravel.com
              </small>
            </div>
          </div>
          <div className="col-lg-4 text-center text-lg-end">
            <div
              className="d-inline-flex align-items-center"
              style={{ height: 45 }}
            >
  
              <a
                className="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2"
                to=""
              >
                <i className="fab fa-facebook-f fw-normal" />
              </a>
              <a
                className="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2"
                to=""
              >
                <i className="fab fa-linkedin-in fw-normal" />
              </a>
              <a
                className="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2"
                to=""
              >
                <i className="fab fa-instagram fw-normal" />
              </a>
              <a
                className="btn btn-sm btn-outline-light btn-sm-square rounded-circle"
                to=""
              >
                <i className="fab fa-youtube fw-normal" />
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Topbar End */}
      {/* Navbar & Hero Start */}
      <div className="container-fluid position-relative p-0">
        <nav
          className="navbar navbar-expand-lg navbar-light sticky-top px-4 px-lg-5 py-3 py-lg-0"
          style={{ alignItems: "center", justifyItems: "center"}}
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
                  fontWeight: "600",
                }}
              >
                Home
              </Link>

              <Link
                to="/AboutUs"
                className="nav-item nav-link"
                style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontWeight: "600",
                }}
              >
                About Us
              </Link>

              <Link
                to="/Services"
                className="nav-item nav-link"
                style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontWeight: "600",
                }}
              >
                Services
              </Link>
              <Link
                to="/Packages"
                className="nav-item nav-link"
                style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                Packages
              </Link>

              <Link
                to="/Contact"
                className="nav-item nav-link"
                style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                Contact Us
              </Link>

                <Link
                  to="/"
                  className="btn btn-secondary py-2 px-4 signin"
                  style={{
                    width: "120px",
                    height: "30px",
                    fontFamily: "Raleway",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "8px",
                    border: "none"
              
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
