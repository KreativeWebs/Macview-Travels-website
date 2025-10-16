import React from "react";
import { Link } from "react-router-dom";

function WhatWeOffer() {
  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h6
            className="section-title bg-white text-center text-primary px-3"
            style={{
              fontFamily:
                "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif",
            }}
          >
            Services
          </h6>
          <h1
            className="mb-5"
            style={{
              fontFamily:
                "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif",
            }}
          >
            What We Offer
          </h1>
        </div>
        <div className="row g-4">
          <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
            <div
              className="service-item pt-3"
              style={{ border: "1px #dee2e6", borderRadius: "8px" }}
            >
              <div className="p-4">
                <i className="fa fa-3x fa-passport text-secondary mb-4" />
                <h5
                  style={{
                    fontFamily:
                      "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif",
                    color: "#175aa1",
                  }}
                >
                  Visa Processing
                </h5>
                <p>
                  Explore top destinations across continents with expertly
                  guided tours and exclusive experiences.
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
            <div
              className="service-item pt-3"
              style={{ border: "1px #dee2e6", borderRadius: "8px" }}
            >
              <div className="p-4">
                <i className="fa fa-3x fa-plane text-secondary mb-4" />
                <h5
                  style={{
                    fontFamily:
                      "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif",
                    color: "#175aa1",
                  }}
                >
                  Flight Booking
                </h5>
                <p>
                  Explore top destinations across continents with expertly
                  guided tours and exclusive experiences.
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
            <div
              className="service-item pt-3"
              style={{ border: "1px #dee2e6", borderRadius: "8px" }}
            >
              <div className="p-4">
                <i className="fa fa-3x fa-bed text-secondary mb-4" />
                <h5
                  style={{
                    fontFamily:
                      "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif",
                    color: "#175aa1",
                  }}
                >
                  Hotel Booking
                </h5>
                <p>
                  Explore top destinations across continents with expertly
                  guided tours and exclusive experiences.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
            <div
              className="service-item pt-3"
              style={{ border: "1px #dee2e6", borderRadius: "8px" }}
            >
              <div className="p-4">
                <i className="fa fa-3x fa-graduation-cap text-secondary mb-4" />
                <h5
                  style={{
                    fontFamily:
                      "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif",
                    color: "#175aa1",
                  }}
                >
                  Study Abroad Programs
                </h5>
                <p>
                  Explore top destinations across continents with expertly
                  guided tours and exclusive experiences.
                </p>
              </div>
            </div>
          </div>
          <div className="text-center mt-5">
            <Link
              to="/services"
              className="btn btn-secondary py-3 px-5 mt-1"
              style={{
                fontFamily:
                  "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif",
                fontWeight: "600",
                outline: "none",
                border: "none",
                borderRadius: "4px",
              }}
            >
              See More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhatWeOffer;
