import React from "react";

export default function Home() {
  return (
    <div style={{ fontFamily: "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif" }}>
      {/* Hero Section */}
      <div className="container-fluid bg-primary py-5 mb-5 hero-header">
        <div className="container py-5">
          <div className="row justify-content-center py-5">
            <div className="col-lg-10 pt-lg-5 mt-lg-5 text-center">
              <h1 className="display-3 text-white mb-3 animated slideInDown" style={{ fontFamily: "'Raleway', system-ui, Avenir" }}>
                Discover the World with Diamond Travels
              </h1>
              <p className="fs-4 text-white mb-4 animated slideInDown">
                Explore breathtaking destinations, curated tours, and unforgettable
                experiences. Your journey begins here!
              </p>
              <div className="position-relative w-75 mx-auto animated slideInDown">
                <input
                  className="form-control border-0 rounded-pill w-100 py-3 ps-4 pe-5"
                  type="text"
                  placeholder="Search destinations (e.g., Bali, Paris, Dubai)"
                />
                <button
                  type="button"
                  className="btn btn-primary rounded-pill py-2 px-4 position-absolute top-0 end-0 me-2"
                  style={{ marginTop: 7 }}
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
                  src="assets/img/about.jpg"
                  alt="Travelers enjoying a scenic view"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
              <h6 className="section-title bg-white text-start text-primary pe-3" style={{ fontFamily: "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif" }}>
                About Us
              </h6>
              <h1 className="mb-4"style={{ fontFamily: "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif" }}>
                Welcome to{" "}
                <span className="text-primary">Diamond Travels</span>
              </h1>
              <p className="mb-4">
                Diamond Travels is your trusted partner for exploring the globe.
                With over a decade of experience, we specialize in crafting
                personalized travel packages, luxury escapes, and adventure tours
                for every kind of traveler.
              </p>
              <p className="mb-4">
                Our dedicated team ensures seamless planning, exclusive deals, and
                24/7 support, so you can focus on making memories. Whether you
                dream of relaxing on tropical beaches, discovering vibrant cities,
                or embarking on cultural journeys, we make it happen.
              </p>
              <div className="row gy-2 gx-4 mb-4">
                <div className="col-sm-6">
                  <p className="mb-0">
                    <i className="fa fa-arrow-right text-primary me-2" />
                    Luxury Flights & Transfers
                  </p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-0">
                    <i className="fa fa-arrow-right text-primary me-2" />
                    Handpicked Hotels & Resorts
                  </p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-0">
                    <i className="fa fa-arrow-right text-primary me-2" />
                    Tailored Itineraries
                  </p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-0">
                    <i className="fa fa-arrow-right text-primary me-2" />
                    Private Guided Tours
                  </p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-0">
                    <i className="fa fa-arrow-right text-primary me-2" />
                    Adventure & Wellness Packages
                  </p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-0">
                    <i className="fa fa-arrow-right text-primary me-2" />
                    24/7 Concierge Service
                  </p>
                </div>
              </div>
              <a className="btn btn-primary py-3 px-5 mt-2" href="">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* About End */}
      {/* Service Start */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3" style={{ fontFamily: "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif" }}>
              Services
            </h6>
            <h1 className="mb-5" style={{ fontFamily: "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif" }}>What We Offer</h1>
          </div>
          <div className="row g-4">
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <i className="fa fa-3x fa-globe text-primary mb-4" />
                  <h5 style={{ fontFamily: "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif" }}>Worldwide Tours</h5>
                  <p>
                    Explore top destinations across continents with expertly guided
                    tours and exclusive experiences.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <i className="fa fa-3x fa-hotel text-primary mb-4" />
                  <h5 style={{ fontFamily: "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif" }}>Hotel Reservations</h5>
                  <p>
                    Stay at premium hotels and resorts, handpicked for comfort,
                    luxury, and location.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <i className="fa fa-3x fa-user text-primary mb-4" />
                  <h5 style={{ fontFamily: "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif" }}>Expert Travel Guides</h5>
                  <p>
                    Enjoy personalized tours led by experienced local guides who
                    bring destinations to life.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <i className="fa fa-3x fa-cog text-primary mb-4" />
                  <h5 style={{ fontFamily: "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif" }}>Event & Group Travel</h5>
                  <p>
                    From destination weddings to corporate retreats, we handle all
                    logistics for memorable group events.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Service End */}
      {/* Destination Start */}
      <div className="container-xxl py-5 destination">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3" style={{ fontFamily: "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif" }}>
              Destinations
            </h6>
            <h1 className="mb-5" style={{ fontFamily: "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif" }}>Popular Destinations</h1>
          </div>
          <div className="row g-3">
            <div className="col-lg-7 col-md-6">
              <div className="row g-3">
                <div
                  className="col-lg-12 col-md-12 wow zoomIn"
                  data-wow-delay="0.1s"
                >
                  <a
                    className="position-relative d-block overflow-hidden"
                    href=""
                  >
                    <img
                      className="img-fluid"
                      src="assets/img/destination-1.jpg"
                      alt="Thailand"
                    />
                    <div className="bg-white text-danger fw-bold position-absolute top-0 start-0 m-3 py-1 px-2">
                      30% OFF
                    </div>
                    <div className="bg-white text-primary fw-bold position-absolute bottom-0 end-0 m-3 py-1 px-2">
                      Thailand – Beaches & Culture
                    </div>
                  </a>
                </div>
                <div
                  className="col-lg-6 col-md-12 wow zoomIn"
                  data-wow-delay="0.3s"
                >
                  <a
                    className="position-relative d-block overflow-hidden"
                    href=""
                  >
                    <img
                      className="img-fluid"
                      src="assets/img/destination-2.jpg"
                      alt="Malaysia"
                    />
                    <div className="bg-white text-danger fw-bold position-absolute top-0 start-0 m-3 py-1 px-2">
                      25% OFF
                    </div>
                    <div className="bg-white text-primary fw-bold position-absolute bottom-0 end-0 m-3 py-1 px-2">
                      Malaysia – Urban Adventures
                    </div>
                  </a>
                </div>
                <div
                  className="col-lg-6 col-md-12 wow zoomIn"
                  data-wow-delay="0.5s"
                >
                  <a
                    className="position-relative d-block overflow-hidden"
                    href=""
                  >
                    <img
                      className="img-fluid"
                      src="assets/img/destination-3.jpg"
                      alt="Australia"
                    />
                    <div className="bg-white text-danger fw-bold position-absolute top-0 start-0 m-3 py-1 px-2">
                      35% OFF
                    </div>
                    <div className="bg-white text-primary fw-bold position-absolute bottom-0 end-0 m-3 py-1 px-2">
                      Australia – Nature & Wildlife
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div
              className="col-lg-5 col-md-6 wow zoomIn"
              data-wow-delay="0.7s"
              style={{ minHeight: 350 }}
            >
              <a
                className="position-relative d-block h-100 overflow-hidden"
                href=""
              >
                <img
                  className="img-fluid position-absolute w-100 h-100"
                  src="assets/img/destination-4.jpg"
                  alt="Indonesia"
                  style={{ objectFit: "cover" }}
                />
                <div className="bg-white text-danger fw-bold position-absolute top-0 start-0 m-3 py-1 px-2">
                  20% OFF
                </div>
                <div className="bg-white text-primary fw-bold position-absolute bottom-0 end-0 m-3 py-1 px-2">
                  Indonesia – Islands & Adventure
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Destination End */}
      {/* Package Start */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3" style={{ fontFamily: "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif" }}>
              Packages
            </h6>
            <h1 className="mb-5" style={{ fontFamily: "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif" }}>Featured Packages</h1>
          </div>
          <div className="row g-4 justify-content-center">
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <div className="package-item">
                <div className="overflow-hidden">
                  <img
                    className="img-fluid"
                    src="assets/img/package-1.jpg"
                    alt="Thailand Explorer"
                  />
                </div>
                <div className="d-flex border-bottom">
                  <small className="flex-fill text-center border-end py-2">
                    <i className="fa fa-map-marker-alt text-primary me-2" />
                    Thailand
                  </small>
                  <small className="flex-fill text-center border-end py-2">
                    <i className="fa fa-calendar-alt text-primary me-2" />5 days
                  </small>
                  <small className="flex-fill text-center py-2">
                    <i className="fa fa-user text-primary me-2" />2 Persons
                  </small>
                </div>
                <div className="text-center p-4">
                  <h3 className="mb-0">$499.00</h3>
                  <div className="mb-3">
                    <small className="fa fa-star text-primary" />
                    <small className="fa fa-star text-primary" />
                    <small className="fa fa-star text-primary" />
                    <small className="fa fa-star text-primary" />
                    <small className="fa fa-star text-primary" />
                  </div>
                  <p>
                    Experience the vibrant culture, stunning beaches, and delicious
                    cuisine of Thailand with our all-inclusive package.
                  </p>
                  <div className="d-flex justify-content-center mb-2">
                    <a
                      href="#"
                      className="btn btn-sm btn-primary px-3 border-end"
                      style={{ borderRadius: "30px 0 0 30px" }}
                    >
                      Read More
                    </a>
                    <a
                      href="#"
                      className="btn btn-sm btn-primary px-3"
                      style={{ borderRadius: "0 30px 30px 0" }}
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <div className="package-item">
                <div className="overflow-hidden">
                  <img
                    className="img-fluid"
                    src="assets/img/package-2.jpg"
                    alt="Indonesia Adventure"
                  />
                </div>
                <div className="d-flex border-bottom">
                  <small className="flex-fill text-center border-end py-2">
                    <i className="fa fa-map-marker-alt text-primary me-2" />
                    Indonesia
                  </small>
                  <small className="flex-fill text-center border-end py-2">
                    <i className="fa fa-calendar-alt text-primary me-2" />7 days
                  </small>
                  <small className="flex-fill text-center py-2">
                    <i className="fa fa-user text-primary me-2" />2 Persons
                  </small>
                </div>
                <div className="text-center p-4">
                  <h3 className="mb-0">$699.00</h3>
                  <div className="mb-3">
                    <small className="fa fa-star text-primary" />
                    <small className="fa fa-star text-primary" />
                    <small className="fa fa-star text-primary" />
                    <small className="fa fa-star text-primary" />
                    <small className="fa fa-star text-primary" />
                  </div>
                  <p>
                    Discover the magic of Bali and beyond with guided tours, island
                    hopping, and cultural experiences.
                  </p>
                  <div className="d-flex justify-content-center mb-2">
                    <a
                      href="#"
                      className="btn btn-sm btn-primary px-3 border-end"
                      style={{ borderRadius: "30px 0 0 30px" }}
                    >
                      Read More
                    </a>
                    <a
                      href="#"
                      className="btn btn-sm btn-primary px-3"
                      style={{ borderRadius: "0 30px 30px 0" }}
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.5s"
            >
              <div className="package-item">
                <div className="overflow-hidden">
                  <img
                    className="img-fluid"
                    src="assets/img/package-3.jpg"
                    alt="Malaysia City Lights"
                  />
                </div>
                <div className="d-flex border-bottom">
                  <small className="flex-fill text-center border-end py-2">
                    <i className="fa fa-map-marker-alt text-primary me-2" />
                    Malaysia
                  </small>
                  <small className="flex-fill text-center border-end py-2">
                    <i className="fa fa-calendar-alt text-primary me-2" />4 days
                  </small>
                  <small className="flex-fill text-center py-2">
                    <i className="fa fa-user text-primary me-2" />2 Persons
                  </small>
                </div>
                <div className="text-center p-4">
                  <h3 className="mb-0">$399.00</h3>
                  <div className="mb-3">
                    <small className="fa fa-star text-primary" />
                    <small className="fa fa-star text-primary" />
                    <small className="fa fa-star text-primary" />
                    <small className="fa fa-star text-primary" />
                    <small className="fa fa-star text-primary" />
                  </div>
                  <p>
                    Enjoy the best of Kuala Lumpur and Penang with city tours,
                    culinary delights, and shopping excursions.
                  </p>
                  <div className="d-flex justify-content-center mb-2">
                    <a
                      href="#"
                      className="btn btn-sm btn-primary px-3 border-end"
                      style={{ borderRadius: "30px 0 0 30px" }}
                    >
                      Read More
                    </a>
                    <a
                      href="#"
                      className="btn btn-sm btn-primary px-3"
                      style={{ borderRadius: "0 30px 30px 0" }}
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Package End */}
      {/* Booking Start */}
      <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
        <div className="container">
          <div className="booking p-5">
            <div className="row g-5 align-items-center">
              <div className="col-md-6 text-white">
                <h6 className="text-white text-uppercase" style={{ fontFamily: "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif" }}>Booking</h6>
                <h1 className="text-white mb-4" style={{ fontFamily: "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif" }}>Book Your Next Adventure</h1>
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
                <h1 className="text-white mb-4" style={{ fontFamily: "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif" }}>Book A Tour</h1>
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
                        <select className="form-select bg-transparent" id="select1">
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
            <h6 className="section-title bg-white text-center text-primary px-3" style={{ fontFamily: "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif" }}>
              Process
            </h6>
            <h1 className="mb-5" style={{ fontFamily: "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif" }}>How It Works</h1>
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
                <h5 className="mt-4" style={{ fontFamily: "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif" }}>Choose Your Destination</h5>
                <hr className="w-25 mx-auto bg-primary mb-1" />
                <hr className="w-50 mx-auto bg-primary mt-0" />
                <p className="mb-0">
                  Browse our packages and select the destination that excites you
                  most.
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
                <h5 className="mt-4" style={{ fontFamily: "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif" }}>Book & Pay Securely</h5>
                <hr className="w-25 mx-auto bg-primary mb-1" />
                <hr className="w-50 mx-auto bg-primary mt-0" />
                <p className="mb-0">
                  Reserve your spot and pay online with our secure payment system.
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
                <h5 className="mt-4" style={{ fontFamily: "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif" }}>Travel & Enjoy</h5>
                <hr className="w-25 mx-auto bg-primary mb-1" />
                <hr className="w-50 mx-auto bg-primary mt-0" />
                <p className="mb-0">
                  Pack your bags and get ready for an amazing adventure with
                  Diamond Travels!
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
            <h6 className="section-title bg-white text-center text-primary px-3" style={{ fontFamily: "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif" }}>
              Travel Guides
            </h6>
            <h1 className="mb-5" style={{ fontFamily: "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif" }}>Meet Our Experts</h1>
          </div>
          <div className="row g-4">
            <div
              className="col-lg-3 col-md-6 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <div className="team-item">
                <div className="overflow-hidden">
                  <img className="img-fluid" src="assets/img/20801.jpg" alt="Guide 1" />
                </div>
                <div className="position-relative d-flex justify-content-center" style={{ marginTop: "-19px" }}>
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
                  <img className="img-fluid" src="assets/img/team-1.jpg" alt="Guide 2" />
                </div>
                <div className="position-relative d-flex justify-content-center" style={{ marginTop: "-19px" }}>
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
                  <img className="img-fluid" src="assets/img/team-2.jpg" alt="Guide 3" />
                </div>
                <div className="position-relative d-flex justify-content-center" style={{ marginTop: "-19px" }}>
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
                  <img className="img-fluid" src="assets/img/1427.jpg" alt="Guide 4" />
                </div>
                <div className="position-relative d-flex justify-content-center" style={{ marginTop: "-19px" }}>
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
            <h6 className="section-title bg-white text-center text-primary px-3" style={{ fontFamily: "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif" }}>
              Testimonials
            </h6>
            <h1 className="mb-5" style={{ fontFamily: "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif" }}>What Our Clients Say</h1>
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
                <h5 className="mb-0" style={{ fontFamily: "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif" }}>Sarah Johnson</h5>
                <p>London, UK</p>
                <p className="mb-0">
                  "Diamond Travels made our honeymoon in Bali absolutely perfect. Every detail was taken care of, and the guides were fantastic!"
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
                <h5 className="mb-0" style={{ fontFamily: "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif" }}>Rajesh Patel</h5>
                <p>Mumbai, India</p>
                <p className="mt-2 mb-0">
                  "Our family trip to Australia was unforgettable. The itinerary was well-planned and the service was top-notch."
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
                <h5 className="mb-0" style={{ fontFamily: "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif" }}>Linda Chen</h5>
                <p>Singapore</p>
                <p className="mt-2 mb-0">
                  "Highly recommend Diamond Travels! They helped us organize a corporate retreat in Malaysia and everything went smoothly."
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
                <h5 className="mb-0" style={{ fontFamily: "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif" }}>Carlos Rivera</h5>
                <p>Mexico City, Mexico</p>
                <p className="mt-2 mb-0">
                  "The adventure tour in Indonesia was thrilling! Great guides, amazing locations, and excellent value."
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
