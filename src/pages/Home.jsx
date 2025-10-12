import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Carousel } from "react-bootstrap";

export default function Home() {
  useEffect(() => {
    const carouselEl = document.getElementById("destinationCarousel");
    const carousel = new bootstrap.Carousel(carouselEl, {
      interval: 3000, // 3 seconds
      ride: "carousel", // start automatically
      pause: "hover", // optional: pause on hover
    });
  }, []);

  return (
    <div
      style={{
        fontFamily:
          "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif",
      }}
    >
      {/* Hero Section */}
      <div className="container-fluid bg-primary py-5 mb-5 hero-header">
        <div className="container py-5">
          <div className="row justify-content-center py-5">
            <div className="col-lg-10 pt-lg-5 mt-lg-5 text-center">
              <h1
                className="display-3 fw-light text-white mb-3 animated slideInDown"
                style={{ fontFamily: "'Raleway', system-ui, Avenir" }}
              >
                Discover the World with{" "}
                <span className="fw-bold"> Macview Travels</span>
              </h1>

              <p className="fs-4 text-white mb-4 animated slideInDown">
                Explore breathtaking destinations, curated tours, and
                unforgettable experiences. Your journey begins here!
              </p>
              <div className="position-relative w-75 mx-auto animated slideInDown">
                <input
                  className="form-control border-0 rounded-pill w-100 py-3 ps-4 pe-5"
                  type="text"
                  placeholder="Search destinations (e.g., Bali, Paris, Dubai)"
                />
                <button
                  type="button"
                  className="btn btn-secondary rounded-pill py-2 px-4 position-absolute top-0 end-0 me-2"
                  style={{ marginTop: 7, outline: "none", border: "none" }}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
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
                  src="assets/img/passport-flight-businessman-standing-airport-checking-departure-times-schedule-travel-work-trip-professional-african-male-waiting-by-terminal-with-his-ticket-board-plane.jpg"
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
                personalized travel packages, luxury escapes, and adventure
                tours for every kind of traveler.
              </p>
              <p className="mb-4 text-black">
                Our dedicated team ensures seamless planning, exclusive deals,
                and 24/7 support, so you can focus on making memories. Whether
                you dream of relaxing on tropical beaches, discovering vibrant
                cities, or embarking on cultural journeys, we make it happen.
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
                to="/about"
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
      {/* About End */}
      {/* Service Start */}
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
            <div
              className="col-lg-3 col-sm-6 wow fadeInUp"
              data-wow-delay="0.1s"
            >
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

            <div
              className="col-lg-3 col-sm-6 wow fadeInUp"
              data-wow-delay="0.1s"
            >
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

            <div
              className="col-lg-3 col-sm-6 wow fadeInUp"
              data-wow-delay="0.1s"
            >
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
            <div
              className="col-lg-3 col-sm-6 wow fadeInUp"
              data-wow-delay="0.1s"
            >
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
      {/* Service End */}

      {/* Destination Start */}
      <div
        className="container-xxl py-5 destination"
        style={{ borderRadius: "8px", overflow: "hidden" }}
      >
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h6
            className="section-title bg-white text-center text-secondary px-3"
            style={{
              fontFamily:
                "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif",
            }}
          >
            DESTINATIONS
          </h6>
          <h1
            className="mb-5"
            style={{
              fontFamily:
                "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif",
            }}
          >
            Popular Destinations
          </h1>
        </div>
        <Carousel interval={5000} pause={false}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="assets/img/11013.jpg"
              alt="Thailand"
              style={{
                height: "400px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            <Carousel.Caption
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "100%", // full width so text can be centered
                textAlign: "center",
                whiteSpace: "nowrap", // keeps text on one line
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <h1
                className="carousel-title text-white"
                style={{
                  fontFamily: "Raleway",
                  fontSize: "clamp(50px, 8vw, 100px)",
                  lineHeight: "1.1",
                  margin: 0,
                }}
              >
                {" "}
                Indonesia
              </h1>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src="assets/img/666.jpg"
              alt="Thailand"
              style={{
                height: "400px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />

            <Carousel.Caption
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "100%", // full width so text can be centered
                textAlign: "center",
                whiteSpace: "nowrap", // keeps text on one line
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <h1
                className="text-white"
                style={{
                  fontFamily: "Raleway",
                  fontSize: "clamp(50px, 8vw, 100px)",
                  lineHeight: "1.1",
                  margin: 0,
                }}
              >
                {" "}
                Singapore
              </h1>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src="assets/img/17878885.jpg"
              alt="Thailand"
              style={{
                height: "400px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />

            <Carousel.Caption
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "100%", // full width so text can be centered
                textAlign: "center",
                whiteSpace: "nowrap", // keeps text on one line
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <h1
                className="text-white"
                style={{
                  fontFamily: "Raleway",
                  fontSize: "100px",
                  fontFamily: "Raleway",
                  fontSize: "clamp(50px, 8vw, 100px)",
                  lineHeight: "1.1",
                  margin: 0,
                }}
              >
                {" "}
                Qatar
              </h1>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src="assets/img/10880824.jpg"
              alt="Thailand"
              style={{
                height: "400px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />

            <Carousel.Caption
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "100%", // full width so text can be centered
                textAlign: "center",
                whiteSpace: "nowrap", // keeps text on one line
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <h1
                className="text-white"
                style={{
                  fontFamily: "Raleway",
                  fontSize: "clamp(40px, 8vw, 100px)",
                  lineHeight: "1.1",
                  margin: 0,
                }}
              >
                {" "}
                South Africa
              </h1>
            </Carousel.Caption>
          </Carousel.Item>
          {/* Add other slides similarly */}
        </Carousel>
      </div>

      {/* Destination End */}

      {/* Package Start */}
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
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.1s"
            >
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
                    Cape Town is calling! From beaches to breathtaking views,
                    this summer getaway is your ticket to relaxation, adventure,
                    and endless sunshine.
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
                    <i className="fa fa-calendar-alt text-secondary me-2" />1
                    Day
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
                    Discover the heartbeat of Nigeria in just one day!
                    Experience the perfect mix of culture, art, food, and city
                    life that makes Lagos unforgettable.
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
            >
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
                    Escape to Banana Island, Qatar’s hidden paradise of luxury
                    and tranquility. Indulge in five-star comfort, stunning
                    ocean views, private beaches, and world-class dining.
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
      {/* Package End */}

      {/* Flash Sales Start */}
      <div
        className="container-xxl py-5 destination"
        style={{ borderRadius: "8px", overflow: "hidden" }}
      >
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h6
            className="section-title bg-white text-center text-secondary px-3"
            style={{
              fontFamily:
                "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif",
            }}
          >
            Flash Sales
          </h6>
          <h1
            className="mb-5"
            style={{
              fontFamily:
                "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif",
            }}
          >
            Exclusive Flash Offers
          </h1>
        </div>

        <Carousel interval={4000} pause={false} className="flash-carousel">
          {/* Slide 1 */}
          <Carousel.Item>
            <a
              href="#"
              className="position-relative d-block overflow-hidden"
              style={{ borderRadius: "8px" }}
            >
              <img
                className="d-block w-100"
                src="assets/img/web flash sale 1.png"
                alt="Flash Sale 1"
               
              />
              <div
                className="bg-white text-danger fw-bold position-absolute top-0 start-0 m-3 py-1 px-2 flash-title"
                style={{
                  borderRadius: "4px",
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "14px",
                }}
              >
                Flash Sales
              </div>
            </a>
          </Carousel.Item>

          {/* Slide 2 */}
          <Carousel.Item>
            <a
              href="#"
              className="position-relative d-block overflow-hidden"
              style={{ borderRadius: "8px" }}
            >
              <img
                className="d-block w-100"
                src="assets/img/web flash sale 2.png"
                alt="Flash Sale 2"
             
              />
              <div
                className="bg-white text-danger fw-bold position-absolute top-0 start-0 m-3 py-1 px-2 flash-title"
                style={{
                  borderRadius: "4px",
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "14px",
                }}
              >
                Flash Sales
              </div>
            </a>
          </Carousel.Item>
        </Carousel>
      </div>
      {/* Flash Sales End */}
      

      {/* Hotels Start */}
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
              Hotels
            </h6>
            <h1
              className="mb-5"
              style={{
                fontFamily:
                  "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif",
              }}
            >
              Featured Hotels
            </h1>
          </div>
          <div className="row g-4 justify-content-center">
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.1s"
            >
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
                    Cape Town is calling! From beaches to breathtaking views,
                    this summer getaway is your ticket to relaxation, adventure,
                    and endless sunshine.
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
                    <i className="fa fa-calendar-alt text-secondary me-2" />1
                    Day
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
                    Discover the heartbeat of Nigeria in just one day!
                    Experience the perfect mix of culture, art, food, and city
                    life that makes Lagos unforgettable.
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
            >
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
                    Escape to Banana Island, Qatar’s hidden paradise of luxury
                    and tranquility. Indulge in five-star comfort, stunning
                    ocean views, private beaches, and world-class dining.
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
      {/* Hotels End */}


      {/* Booking Start */}
      <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
        <div className="container">
          <div className="booking p-5">
            <div className="row g-5 align-items-center">
              <div className="col-md-6 text-white">
                <h6
                  className="text-white text-uppercase"
                  style={{
                    fontFamily:
                      "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif",
                  }}
                >
                  Booking
                </h6>
                <h1
                  className="text-white mb-4"
                  style={{
                    fontFamily:
                      "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif",
                  }}
                >
                  Book Your Next Adventure
                </h1>
                <p className="mb-4">
                  Ready to travel? Fill out our booking form and let our experts
                  handle the rest. We’ll customize your trip to fit your
                  preferences and budget.
                </p>
                <p className="mb-4">
                  Enjoy peace of mind with our flexible booking policies and
                  dedicated support team. Your dream vacation is just a click
                  away!
                </p>
                <a className="btn btn-outline-light py-3 px-5 mt-2" href="">
                  Read More
                </a>
              </div>
              <div className="col-md-6">
                <h1
                  className="text-white mb-4"
                  style={{
                    fontFamily:
                      "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif",
                  }}
                >
                  Book A Tour
                </h1>
                <form>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control bg-transparent"
                          id="name"
                          placeholder="Your Name"
                        />
                        <label htmlFor="name">Your Name</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="email"
                          className="form-control bg-transparent"
                          id="email"
                          placeholder="Your Email"
                        />
                        <label htmlFor="email">Your Email</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div
                        className="form-floating date"
                        id="date3"
                        data-target-input="nearest"
                      >
                        <input
                          type="text"
                          className="form-control bg-transparent datetimepicker-input"
                          id="datetime"
                          placeholder="Date & Time"
                          data-target="#date3"
                          data-toggle="datetimepicker"
                        />
                        <label htmlFor="datetime">Date &amp; Time</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <select
                          className="form-select bg-transparent"
                          id="select1"
                        >
                          <option value={1}>Thailand</option>
                          <option value={2}>Indonesia</option>
                          <option value={3}>Malaysia</option>
                        </select>
                        <label htmlFor="select1">Destination</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <textarea
                          className="form-control bg-transparent"
                          placeholder="Special Request"
                          id="message"
                          style={{ height: 100 }}
                          defaultValue={""}
                        />
                        <label htmlFor="message">Special Request</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <button
                        className="btn btn-outline-light w-100 py-3"
                        type="submit"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Booking End */}
      {/* Process Start */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center pb-4 wow fadeInUp" data-wow-delay="0.1s">
            <h6
              className="section-title bg-white text-center text-primary px-3"
              style={{
                fontFamily:
                  "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif",
              }}
            >
              Process
            </h6>
            <h1
              className="mb-5"
              style={{
                fontFamily:
                  "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif",
              }}
            >
              How It Works
            </h1>
          </div>
          <div className="row gy-5 gx-4 justify-content-center">
            <div
              className="col-lg-4 col-sm-6 text-center pt-4 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <div className="position-relative border border-primary pt-5 pb-4 px-4">
                <div
                  className="d-inline-flex align-items-center justify-content-center bg-primary rounded-circle position-absolute top-0 start-50 translate-middle shadow"
                  style={{ width: 100, height: 100 }}
                >
                  <i className="fa fa-globe fa-3x text-white" />
                </div>
                <h5
                  className="mt-4"
                  style={{
                    fontFamily:
                      "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif",
                  }}
                >
                  Choose Your Destination
                </h5>
                <hr className="w-25 mx-auto bg-primary mb-1" />
                <hr className="w-50 mx-auto bg-primary mt-0" />
                <p className="mb-0">
                  Browse our packages and select the destination that excites
                  you most.
                </p>
              </div>
            </div>
            <div
              className="col-lg-4 col-sm-6 text-center pt-4 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <div className="position-relative border border-primary pt-5 pb-4 px-4">
                <div
                  className="d-inline-flex align-items-center justify-content-center bg-primary rounded-circle position-absolute top-0 start-50 translate-middle shadow"
                  style={{ width: 100, height: 100 }}
                >
                  <i className="fa fa-dollar-sign fa-3x text-white" />
                </div>
                <h5
                  className="mt-4"
                  style={{
                    fontFamily:
                      "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif",
                  }}
                >
                  Book & Pay Securely
                </h5>
                <hr className="w-25 mx-auto bg-primary mb-1" />
                <hr className="w-50 mx-auto bg-primary mt-0" />
                <p className="mb-0">
                  Reserve your spot and pay online with our secure payment
                  system.
                </p>
              </div>
            </div>
            <div
              className="col-lg-4 col-sm-6 text-center pt-4 wow fadeInUp"
              data-wow-delay="0.5s"
            >
              <div className="position-relative border border-primary pt-5 pb-4 px-4">
                <div
                  className="d-inline-flex align-items-center justify-content-center bg-primary rounded-circle position-absolute top-0 start-50 translate-middle shadow"
                  style={{ width: 100, height: 100 }}
                >
                  <i className="fa fa-plane fa-3x text-white" />
                </div>
                <h5
                  className="mt-4"
                  style={{
                    fontFamily:
                      "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif",
                  }}
                >
                  Travel & Enjoy
                </h5>
                <hr className="w-25 mx-auto bg-primary mb-1" />
                <hr className="w-50 mx-auto bg-primary mt-0" />
                <p className="mb-0">
                  Pack your bags and get ready for an amazing adventure with
                  Macview Travels!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Process End */}
      {/* Team Start */}
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
              Travel Guides
            </h6>
            <h1
              className="mb-5"
              style={{
                fontFamily:
                  "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif",
              }}
            >
              Meet Our Experts
            </h1>
          </div>
          <div className="row g-4">
            <div
              className="col-lg-3 col-md-6 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <div className="team-item">
                <div className="overflow-hidden">
                  <img
                    className="img-fluid"
                    src="assets/img/20801.jpg"
                    alt="Guide 1"
                  />
                </div>
                <div
                  className="position-relative d-flex justify-content-center"
                  style={{ marginTop: "-19px" }}
                >
                  <a className="btn btn-square mx-1" href="">
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a className="btn btn-square mx-1" href="">
                    <i className="fab fa-twitter" />
                  </a>
                  <a className="btn btn-square mx-1" href="">
                    <i className="fab fa-instagram" />
                  </a>
                </div>
                <div className="text-center p-4">
                  <h5 className="mb-0">Emily Carter</h5>
                  <small>Asia Specialist</small>
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
                    src="assets/img/team-1.jpg"
                    alt="Guide 2"
                  />
                </div>
                <div
                  className="position-relative d-flex justify-content-center"
                  style={{ marginTop: "-19px" }}
                >
                  <a className="btn btn-square mx-1" href="">
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a className="btn btn-square mx-1" href="">
                    <i className="fab fa-twitter" />
                  </a>
                  <a className="btn btn-square mx-1" href="">
                    <i className="fab fa-instagram" />
                  </a>
                </div>
                <div className="text-center p-4">
                  <h5 className="mb-0">Michael Lee</h5>
                  <small>Adventure Expert</small>
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
                    src="assets/img/team-2.jpg"
                    alt="Guide 3"
                  />
                </div>
                <div
                  className="position-relative d-flex justify-content-center"
                  style={{ marginTop: "-19px" }}
                >
                  <a className="btn btn-square mx-1" href="">
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a className="btn btn-square mx-1" href="">
                    <i className="fab fa-twitter" />
                  </a>
                  <a className="btn btn-square mx-1" href="">
                    <i className="fab fa-instagram" />
                  </a>
                </div>
                <div className="text-center p-4">
                  <h5 className="mb-0">Sophia Martinez</h5>
                  <small>Luxury Travel Advisor</small>
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
                    src="assets/img/1427.jpg"
                    alt="Guide 4"
                  />
                </div>
                <div
                  className="position-relative d-flex justify-content-center"
                  style={{ marginTop: "-19px" }}
                >
                  <a className="btn btn-square mx-1" href="">
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a className="btn btn-square mx-1" href="">
                    <i className="fab fa-twitter" />
                  </a>
                  <a className="btn btn-square mx-1" href="">
                    <i className="fab fa-instagram" />
                  </a>
                </div>
                <div className="text-center p-4">
                  <h5 className="mb-0">David Kim</h5>
                  <small>Wildlife Specialist</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Team End */}
      {/* Testimonial Start */}
      <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
        <div className="container">
          <div className="text-center">
            <h6
              className="section-title bg-white text-center text-primary px-3"
              style={{
                fontFamily:
                  "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif",
              }}
            >
              Testimonials
            </h6>
            <h1
              className="mb-5"
              style={{
                fontFamily:
                  "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif",
              }}
            >
              What Our Clients Say
            </h1>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-3 mb-4">
              <div className="testimonial-item bg-white text-center border p-4">
                <img
                  className="bg-white rounded-circle shadow p-1 mx-auto mb-3"
                  src="assets/img/testimonial-1.jpg"
                  style={{ width: 80, height: 80 }}
                  alt="Sarah Johnson"
                />
                <h5
                  className="mb-0"
                  style={{
                    fontFamily:
                      "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif",
                  }}
                >
                  Sarah Johnson
                </h5>
                <p>London, UK</p>
                <p className="mb-0">
                  "Macview Travels made our honeymoon in Bali absolutely
                  perfect. Every detail was taken care of, and the guides were
                  fantastic!"
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mb-4">
              <div className="testimonial-item bg-white text-center border p-4">
                <img
                  className="bg-white rounded-circle shadow p-1 mx-auto mb-3"
                  src="assets/img/testimonial-2.jpg"
                  style={{ width: 80, height: 80 }}
                  alt="Rajesh Patel"
                />
                <h5
                  className="mb-0"
                  style={{
                    fontFamily:
                      "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif",
                  }}
                >
                  Rajesh Patel
                </h5>
                <p>Mumbai, India</p>
                <p className="mt-2 mb-0">
                  "Our family trip to Australia was unforgettable. The itinerary
                  was well-planned and the service was top-notch."
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mb-4">
              <div className="testimonial-item bg-white text-center border p-4">
                <img
                  className="bg-white rounded-circle shadow p-1 mx-auto mb-3"
                  src="assets/img/testimonial-4.jpg"
                  style={{ width: 80, height: 80 }}
                  alt="Linda Chen"
                />
                <h5
                  className="mb-0"
                  style={{
                    fontFamily:
                      "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif",
                  }}
                >
                  Linda Chen
                </h5>
                <p>Singapore</p>
                <p className="mt-2 mb-0">
                  "Highly recommend Macview Travels! They helped us organize a
                  corporate retreat in Malaysia and everything went smoothly."
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mb-4">
              <div className="testimonial-item bg-white text-center border p-4">
                <img
                  className="bg-white rounded-circle shadow p-1 mx-auto mb-3"
                  src="assets/img/testimonial-3.jpg"
                  style={{ width: 80, height: 80 }}
                  alt="Carlos Rivera"
                />
                <h5
                  className="mb-0"
                  style={{
                    fontFamily:
                      "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif",
                  }}
                >
                  Carlos Rivera
                </h5>
                <p>Mexico City, Mexico</p>
                <p className="mt-2 mb-0">
                  "The adventure tour in Indonesia was thrilling! Great guides,
                  amazing locations, and excellent value."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Testimonial End */}
    </div>
  );
}
