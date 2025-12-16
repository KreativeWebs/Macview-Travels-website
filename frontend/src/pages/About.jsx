import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
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
              Macview Travels is your trusted partner for exploring the globe.
              With over a decade of experience, we specialize in crafting
              personalized travel packages, luxury escapes, and adventure tours
              for every kind of traveler.
            </p>
            <p className="mb-4 text-black">
              Our dedicated team ensures seamless planning, exclusive deals, and
              24/7 support, so you can focus on making memories. Whether you
              dream of relaxing on tropical beaches, discovering vibrant cities,
              or embarking on cultural journeys, we make it happen.
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
            <Link
              to="/aboutus"
              className="btn btn-secondary py-3 px-5 mt-4"
              style={{
                fontFamily:
                  "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif",
                fontWeight: "600",
                outline: "none",
                border: "none",
                borderRadius: "4px",
              }}
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
