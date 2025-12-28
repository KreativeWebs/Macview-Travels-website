import React from "react";
import { Link } from "react-router-dom";
import HeroHeader from "./HeroHeader";

function AboutUs() {
  return (
    <div
      style={{
        fontFamily:
          "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif",
      }}
    >
      <HeroHeader
        heroheadertitle="About Us"
        heroheaderbg="/assets/img/7626.jpg"
        heroheaderdesc="Our mission is to meet all your travel needs while delivering exceptional value for your money."
        pageName="About Us"
      />

      {/* About Start */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5">
            <div
              className="col-lg-6 wow fadeInUp"
              data-wow-delay="0.1s"
              style={{ minHeight: 400 }}
            >
              <div className="position-relative h-100">
                <img
                  className="img-fluid position-absolute w-100 h-100"
                  src="/assets/img/passport-flight-businessman-standing-airport-checking-departure-times-schedule-travel-work-trip-professional-african-male-waiting-by-terminal-with-his-ticket-board-plane.jpg"
                  alt="Travelers enjoying a scenic view"
                  style={{ objectFit: "cover", borderRadius: "8px" }}
                />
              </div>
            </div>
            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
              <h6
                className="section-title bg-white text-start text-secondary pe-3"
                style={{
                  fontFamily:
                    "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif",
                }}
              >
                About Us
              </h6>
              <h1
                className="mb-4"
                style={{
                  fontFamily:
                    "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif",
                  fontWeight: "400",
                  fontSize: "40px",
                }}
              >
                Welcome to{" "}
                <span
                  className="text"
                  style={{ fontWeight: "600", color: "#1A5EA7" }}
                >
                  Macview Travels
                </span>
              </h1>
              <p className="mb-4 text-darkblack">
                Macview Travels is a dependable travel agency committed to
                helping you see the world with ease. Backed by over four years
                of experience, we design customized travel solutions, from
                premium vacations to thrilling adventure trips, tailored to
                individual preferences.
              </p>
              <p className="mb-4 text-black">
                Our professional team manages every stage of your journey,
                providing smooth coordination, special travel offers, and
                continuous support. Whether your plans include beachside
                relaxation, urban discoveries, or rich cultural trips, we bring
                your travel plans to life with confidence and care.
              </p>
              <div className="row gy-2 gx-4 mb-4">
                <div className="col-sm-6">
                  <p className="mb-0">
                    <i className="fa fa-arrow-right text-secondary me-2" />
                    Luxury Flights & Transfers
                  </p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-0">
                    <i className="fa fa-arrow-right text-secondary me-2" />
                    Handpicked Hotels & Resorts
                  </p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-0">
                    <i className="fa fa-arrow-right text-secondary me-2" />
                    Tailored Itineraries
                  </p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-0">
                    <i className="fa fa-arrow-right text-secondary me-2" />
                    Private Guided Tours
                  </p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-0">
                    <i className="fa fa-arrow-right text-secondary me-2" />
                    Adventure & Wellness Packages
                  </p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-0">
                    <i className="fa fa-arrow-right text-secondary me-2" />
                    24/7 Concierge Service
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* About End */}

      <div className="container text-center wow fadeInUp" data-wow-delay="0.1s">
        <div
          className="d-flex flex-column flex-md-row justify-content-center align-items-center mt-4 position-relative"
          style={{ gap: "2rem" }}
        >
          {/* Vision */}
          <div className="flex-fill">
            <i
              class="fa fa-eye"
              style={{ fontSize: "100px", color: "#f1741e" }}
            ></i>

            <h1
              className="mb-4"
              style={{ fontFamily: "Raleway", color: "#175aa1" }}
            >
              Vision
            </h1>
            <p>
              To be the Preferred "Travel Management <br /> Company" in Nigeria
            </p>
          </div>

          {/* Mission */}
          <div className="flex-fill" style={{ fontFamily: "Raleway" }}>
            <i
              class="fa fa-bullseye"
              style={{ fontSize: "100px", color: "#f1741e" }}
            ></i>

            <h1
              className="mb-4"
              style={{ fontFamily: "Raleway", color: "#175aa1" }}
            >
              Mission
            </h1>
            <p>
              To cover all your travel needs and <br /> giving value for your
              money
            </p>
          </div>
        </div>
      </div>

      {/* Team Start */}
      <div
        className="container-xxl py-5"
        style={{ fontFamily: "Raleway", marginTop: "40px" }}
      >
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6
              className="section-title bg-white text-center text-secondary px-3"
              style={{ color: "#f1741e", fontFamily: "Raleway" }}
            >
              Travel Experts
            </h6>
            <h1 className="mb-5" style={{ fontFamily: "Raleway" }}>
              Meet Our Team
            </h1>
          </div>
          <div className="row g-4">
            <div
              className="col-lg-3 col-md-6 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <div className="team-item">
                <div className="overflow-hidden" style={{ objectFit: "cover" }}>
                  <img
                    className="img-fluid"
                    src="/assets/img/mr jerry.png"
                    style={{ width: "" }}
                    alt="Mr Jerry"
                  />
                </div>
                <div
                  className="position-relative d-flex justify-content-center"
                  style={{ marginTop: "-19px" }}
                >
                  <a
                    className="btn btn-square mx-1"
                    href="#"
                    style={{
                      borderRadius: "50%",
                      backgroundColor: "#ffffff",
                      color: "#175aa1",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "38px",
                      height: "38px",
                      textDecoration: "none",
                    }}
                  >
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a
                    className="btn btn-square mx-1"
                    href="#"
                    style={{
                      borderRadius: "50%",
                      backgroundColor: "#ffffff",
                      color: "#175aa1",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "38px",
                      height: "38px",
                      textDecoration: "none",
                    }}
                  >
                    <i className="fab fa-linkedin" />
                  </a>
                  <a
                    className="btn btn-square mx-1"
                    href="#"
                    style={{
                      borderRadius: "50%",
                      backgroundColor: "#ffffff",
                      color: "#175aa1",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "38px",
                      height: "38px",
                      textDecoration: "none",
                    }}
                  >
                    <i className="fab fa-instagram" />
                  </a>
                </div>
                <div className="text-center p-4">
                  <h5 className="mb-0" style={{ fontFamily: "Raleway" }}>
                    Mademoye Balogun. J
                  </h5>
                  <small>MD/CEO</small>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <div className="team-item">
                <div className="overflow-hidden">
                  <img
                    className="img-fluid"
                    src="/assets/img/mr godwin.png"
                    alt="Mr Godwin"
                  />
                </div>
                <div
                  className="position-relative d-flex justify-content-center"
                  style={{ marginTop: "-19px" }}
                >
                  <a
                    className="btn btn-square mx-1"
                    href="#"
                    style={{
                      borderRadius: "50%",
                      backgroundColor: "#ffffff",
                      color: "#175aa1",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "38px",
                      height: "38px",
                      textDecoration: "none",
                    }}
                  >
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a
                    className="btn btn-square mx-1"
                    href="#"
                    style={{
                      borderRadius: "50%",
                      backgroundColor: "#ffffff",
                      color: "#175aa1",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "38px",
                      height: "38px",
                      textDecoration: "none",
                    }}
                  >
                    <i className="fab fa-linkedin" />
                  </a>
                  <a
                    className="btn btn-square mx-1"
                    href="#"
                    style={{
                      borderRadius: "50%",
                      backgroundColor: "#ffffff",
                      color: "#175aa1",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "38px",
                      height: "38px",
                      textDecoration: "none",
                    }}
                  >
                    <i className="fab fa-instagram" />
                  </a>
                </div>
                <div className="text-center p-4">
                  <h5 className="mb-0" style={{ fontFamily: "Raleway" }}>
                    Mr Noah Godwin
                  </h5>
                  <small>COO</small>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 wow fadeInUp"
              data-wow-delay="0.5s"
            >
              <div className="team-item">
                <div className="overflow-hidden">
                  <img
                    className="img-fluid"
                    src="/assets/img/fadekemi.png"
                    alt="fadekemi"
                  />
                </div>
                <div
                  className="position-relative d-flex justify-content-center"
                  style={{ marginTop: "-19px" }}
                >
                  <a
                    className="btn btn-square mx-1"
                    href="#"
                    style={{
                      borderRadius: "50%",
                      backgroundColor: "#ffffff",
                      color: "#175aa1",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "38px",
                      height: "38px",
                      textDecoration: "none",
                    }}
                  >
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a
                    className="btn btn-square mx-1"
                    href="#"
                    style={{
                      borderRadius: "50%",
                      backgroundColor: "#ffffff",
                      color: "#175aa1",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "38px",
                      height: "38px",
                      textDecoration: "none",
                    }}
                  >
                    <i className="fab fa-linkedin" />
                  </a>
                  <a
                    className="btn btn-square mx-1"
                    href="#"
                    style={{
                      borderRadius: "50%",
                      backgroundColor: "#ffffff",
                      color: "#175aa1",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "38px",
                      height: "38px",
                      textDecoration: "none",
                    }}
                  >
                    <i className="fab fa-instagram" />
                  </a>
                </div>
                <div className="text-center p-4">
                  <h5 className="mb-0" style={{ fontFamily: "Raleway" }}>
                    Lateef Fadekemi
                  </h5>
                  <small>Head of Ticketing</small>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 wow fadeInUp"
              data-wow-delay="0.7s"
            >
              <div className="team-item">
                <div className="overflow-hidden">
                  <img
                    className="img-fluid"
                    src="/assets/img/ridwan.png"
                    alt="David Kim"
                  />
                </div>
                <div
                  className="position-relative d-flex justify-content-center"
                  style={{ marginTop: "-19px" }}
                >
                  <a
                    className="btn btn-square mx-1"
                    href="#"
                    style={{
                      borderRadius: "50%",
                      backgroundColor: "#ffffff",
                      color: "#175aa1",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "38px",
                      height: "38px",
                      textDecoration: "none",
                    }}
                  >
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a
                    className="btn btn-square mx-1"
                    href="#"
                    style={{
                      borderRadius: "50%",
                      backgroundColor: "#ffffff",
                      color: "#175aa1",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "38px",
                      height: "38px",
                      textDecoration: "none",
                    }}
                  >
                    <i className="fab fa-linkedin" />
                  </a>
                  <a
                    className="btn btn-square mx-1"
                    href="#"
                    style={{
                      borderRadius: "50%",
                      backgroundColor: "#ffffff",
                      color: "#175aa1",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "38px",
                      height: "38px",
                      textDecoration: "none",
                    }}
                  >
                    <i className="fab fa-instagram" />
                  </a>
                </div>
                <div className="text-center p-4">
                  <h5 className="mb-0" style={{ fontFamily: "Raleway" }}>
                    ABDULJELEEL RIDWAN
                  </h5>
                  <small>Visa Assistant Manager</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Team End */}
    </div>
  );
}

export default AboutUs;
