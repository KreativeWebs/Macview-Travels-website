import React from "react";
import { Link } from "react-router-dom";

function FeaturedPackages() {
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
            Packages
          </h6>
          <h1
            className="mb-5"
            style={{
              fontFamily:
                "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif",
            }}
          >
            Featured Packages
          </h1>
        </div>
        <div className="row g-4 justify-content-center">
          <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
            <div
              className="package-item overflow-hidden"
              style={{
                borderRadius: "15px",
                height: "600px",
              }}
            >
              <div
                className="overflow-hidden"
                style={{
                  width: "100%", // makes it stretch full width of parent
                  height: "250px", // set your preferred fixed height
                  overflow: "hidden",
                }}
              >
                <img
                  className="img-fluid overflow-hidden"
                  src="assets/img/Capetown summer.jpeg"
                  alt="Thailand Explorer"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="d-flex border-bottom">
                <small className="flex-fill text-center border-end py-2">
                  <i className="fa fa-map-marker-alt text-secondary me-2" />
                  Capetown
                </small>
                <small className="flex-fill text-center border-end py-2">
                  <i className="fa fa-calendar-alt text-secondary me-2" />5
                  Nights
                </small>
                <small className="flex-fill text-center py-2">
                  <i className="fa fa-user text-secondary me-2" />1 Person
                </small>
              </div>
              <div className="text-center p-4">
                <h3 className="mb-0" style={{ fontFamily: "Raleway" }}>
                  ₦509,999
                </h3>
                <div className="mb-3">
                  <small className="fa fa-star text-secondary" />
                  <small className="fa fa-star text-secondary" />
                  <small className="fa fa-star text-secondary" />
                  <small className="fa fa-star text-secondary" />
                  <small className="fa fa-star text-secondary" />
                </div>

                <h5
                  className="mt-4"
                  style={{ fontFamily: "Raleway", color: "#175AA1" }}
                >
                  CapeTown Summer Package
                </h5>
                <p>
                  Cape Town is calling! From beaches to breathtaking views, this
                  summer getaway is your ticket to relaxation, adventure, and
                  endless sunshine.
                </p>
                <div className="d-flex justify-content-center mb-2">
                  <Link
                    to="/booking"
                    className="btn btn-sm btn-secondary px-5"
                    style={{
                      borderRadius: "12px",
                      fontFamily: "Raleway",
                      fontWeight: "800",
                      outline: "none",
                      border: "none",
                    }}
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div
            className="col-lg-4 col-md-6 wow fadeInUp"
            data-wow-delay="0.1s"
            style={{}}
          >
            <div
              className="package-item overflow-hidden"
              style={{
                borderRadius: "15px",
                height: "600px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "250px",
                  overflow: "hidden",
                }}
              >
                <img
                  className="img-fluid"
                  src="assets\img\Lagos bridge.jpeg"
                  alt="Lagos Tour"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="d-flex border-bottom">
                <small className="flex-fill text-center border-end py-2">
                  <i className="fa fa-map-marker-alt text-secondary me-2" />
                  Lagos
                </small>
                <small className="flex-fill text-center border-end py-2">
                  <i className="fa fa-calendar-alt text-secondary me-2" />1 Day
                </small>
                <small className="flex-fill text-center py-2">
                  <i className="fa fa-user text-secondary me-2" />1 Person
                </small>
              </div>
              <div className="text-center p-4">
                <h3 className="mb-0" style={{ fontFamily: "Raleway" }}>
                  $150.00
                </h3>
                <div className="mb-3">
                  <small className="fa fa-star text-secondary" />
                  <small className="fa fa-star text-secondary" />
                  <small className="fa fa-star text-secondary" />
                  <small className="fa fa-star text-secondary" />
                  <small className="fa fa-star text-secondary" />
                </div>

                <h5
                  className="mt-4"
                  style={{ fontFamily: "Raleway", color: "#175AA1" }}
                >
                  One Day Lagos City Tour
                </h5>
                <p>
                  Discover the heartbeat of Nigeria in just one day! Experience
                  the perfect mix of culture, art, food, and city life that
                  makes Lagos unforgettable.
                </p>
                <div className="d-flex justify-content-center mb-2">
                  <Link
                    to="/booking"
                    className="btn btn-sm btn-secondary px-5"
                    style={{
                      borderRadius: "12px",
                      fontFamily: "Raleway",
                      fontWeight: "800",
                      outline: "none",
                      border: "none",
                    }}
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
            <div
              className="package-item overflow-hidden"
              style={{
                borderRadius: "15px",
                height: "600px",
              }}
            >
              <div
                className="overflow-hidden"
                style={{
                  width: "100%",
                  height: "250px",
                  overflow: "hidden",
                }}
              >
                <img
                  className="img-fluid overflow-hidden"
                  src="assets\img\Así es el Banana Island Resort, el alojamiento de lujo en una isla en Doha.jpeg"
                  alt="Thailand Explorer"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="d-flex border-bottom">
                <small className="flex-fill text-center border-end py-2">
                  <i className="fa fa-map-marker-alt text-secondary me-2" />
                  Qatar
                </small>
                <small className="flex-fill text-center border-end py-2">
                  <i className="fa fa-calendar-alt text-secondary me-2" />5
                  Nights
                </small>
                <small className="flex-fill text-center py-2">
                  <i className="fa fa-user text-secondary me-2" />1 Person
                </small>
              </div>
              <div className="text-center p-4">
                <h3 className="mb-0" style={{ fontFamily: "Raleway" }}>
                  ₦6,800,000
                </h3>
                <div className="mb-3">
                  <small className="fa fa-star text-secondary" />
                  <small className="fa fa-star text-secondary" />
                  <small className="fa fa-star text-secondary" />
                  <small className="fa fa-star text-secondary" />
                  <small className="fa fa-star text-secondary" />
                </div>

                <h5
                  className="mt-4"
                  style={{ fontFamily: "Raleway", color: "#175AA1" }}
                >
                  Banana Island Luxury Package
                </h5>
                <p>
                  Escape to Banana Island, Qatar’s hidden paradise of luxury and
                  tranquility. Indulge in five-star comfort, stunning ocean
                  views, private beaches, and world-class dining.
                </p>
                <div className="d-flex justify-content-center mb-2">
                  <Link
                    to="/booking"
                    className="btn btn-sm btn-secondary px-5"
                    style={{
                      borderRadius: "12px",
                      fontFamily: "Raleway",
                      fontWeight: "800",
                      outline: "none",
                      border: "none",
                    }}
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturedPackages;
