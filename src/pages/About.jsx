import React from 'react'

function About() {
  return (
    <div style={{ fontFamily: "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif" }}>
      {/* Hero Section */}
      <div className="container-fluid bg-primary py-5 mb-5 hero-header">
        <div className="container py-5">
          <div className="row justify-content-center py-5">
            <div className="col-lg-10 pt-lg-5 mt-lg-5 text-center">
              <h1 className="display-3 text-white animated slideInDown">
                About Us
              </h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center">
                  <li className="breadcrumb-item">
                    <a href="/">Home</a>
                  </li>
                  <li
                    className="breadcrumb-item text-white active"
                    aria-current="page"
                  >
                    About
                  </li>
                </ol>
              </nav>
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
              <h6 className="section-title bg-white text-start text-primary pe-3">
                About Us
              </h6>
              <h1 className="mb-4">
                Welcome to <span className="text-primary">Diamond Travels</span>
              </h1>
              <p className="mb-4">
                Diamond Travels is a leading travel agency dedicated to helping you explore the world with ease and excitement. With years of experience, we offer expertly crafted travel packages, personalized itineraries, and exceptional customer service.
              </p>
              <p className="mb-4">
                Whether you’re seeking adventure, relaxation, or cultural immersion, our team is here to make your dream vacation a reality. We partner with top airlines, hotels, and local guides to ensure every journey is safe, memorable, and tailored to your needs.
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
              <a className="btn btn-primary py-3 px-5 mt-2" href="/contact">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* About End */}
      {/* Team Start */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Travel Guides
            </h6>
            <h1 className="mb-5">Meet Our Team</h1>
          </div>
          <div className="row g-4">
            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
              <div className="team-item">
                <div className="overflow-hidden">
                  <img className="img-fluid" src="assets/img/20801.jpg" alt="Emily Carter" />
                </div>
                <div
                  className="position-relative d-flex justify-content-center"
                  style={{ marginTop: "-19px" }}
                >
                  <a className="btn btn-square mx-1" href="#">
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a className="btn btn-square mx-1" href="#">
                    <i className="fab fa-twitter" />
                  </a>
                  <a className="btn btn-square mx-1" href="#">
                    <i className="fab fa-instagram" />
                  </a>
                </div>
                <div className="text-center p-4">
                  <h5 className="mb-0">Emily Carter</h5>
                  <small>Asia Specialist</small>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
              <div className="team-item">
                <div className="overflow-hidden">
                  <img className="img-fluid" src="assets/img/team-1.jpg" alt="Michael Lee" />
                </div>
                <div
                  className="position-relative d-flex justify-content-center"
                  style={{ marginTop: "-19px" }}
                >
                  <a className="btn btn-square mx-1" href="#">
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a className="btn btn-square mx-1" href="#">
                    <i className="fab fa-twitter" />
                  </a>
                  <a className="btn btn-square mx-1" href="#">
                    <i className="fab fa-instagram" />
                  </a>
                </div>
                <div className="text-center p-4">
                  <h5 className="mb-0">Michael Lee</h5>
                  <small>Adventure Expert</small>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
              <div className="team-item">
                <div className="overflow-hidden">
                  <img className="img-fluid" src="assets/img/team-2.jpg" alt="Sophia Martinez" />
                </div>
                <div
                  className="position-relative d-flex justify-content-center"
                  style={{ marginTop: "-19px" }}
                >
                  <a className="btn btn-square mx-1" href="#">
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a className="btn btn-square mx-1" href="#">
                    <i className="fab fa-twitter" />
                  </a>
                  <a className="btn btn-square mx-1" href="#">
                    <i className="fab fa-instagram" />
                  </a>
                </div>
                <div className="text-center p-4">
                  <h5 className="mb-0">Sophia Martinez</h5>
                  <small>Luxury Travel Advisor</small>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
              <div className="team-item">
                <div className="overflow-hidden">
                  <img className="img-fluid" src="assets/img/1427.jpg" alt="David Kim" />
                </div>
                <div
                  className="position-relative d-flex justify-content-center"
                  style={{ marginTop: "-19px" }}
                >
                  <a className="btn btn-square mx-1" href="#">
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a className="btn btn-square mx-1" href="#">
                    <i className="fab fa-twitter" />
                  </a>
                  <a className="btn btn-square mx-1" href="#">
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
    </div>
  )
}

export default About