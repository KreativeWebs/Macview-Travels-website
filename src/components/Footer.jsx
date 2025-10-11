import React from 'react'

export default function Footer() {
  return (
    <div>
      {/* Footer Start */}
      <div
        className="container-fluid bg-dark text-light footer pt-5 mt-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-lg-3 col-md-6">
              <h4 className="text-white mb-3">Diamond Travels</h4>
              <p>
                Your trusted partner for unforgettable journeys. We offer curated travel packages, expert guides, and personalized service to make your adventures seamless and memorable.
              </p>
              <a className="btn btn-link" href="/about">
                About Us
              </a>
              <a className="btn btn-link" href="/contact">
                Contact Us
              </a>
              <a className="btn btn-link" href="/privacy">
                Privacy Policy
              </a>
              <a className="btn btn-link" href="/terms">
                Terms &amp; Conditions
              </a>
              <a className="btn btn-link" href="/faq">
                FAQs &amp; Help
              </a>
            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="text-white mb-3">Contact</h4>
              <p className="mb-2">
                <i className="fa fa-map-marker-alt me-3" />
                42 Explorer Avenue, Lagos, Nigeria
              </p>
              <p className="mb-2">
                <i className="fa fa-phone-alt me-3" />
                +234 800 123 4567
              </p>
              <p className="mb-2">
                <i className="fa fa-envelope me-3" />
                info@diamondtravels.com
              </p>
              <div className="d-flex pt-2">
                <a className="btn btn-outline-light btn-social" href="https://twitter.com/diamondtravels">
                  <i className="fab fa-twitter" />
                </a>
                <a className="btn btn-outline-light btn-social" href="https://facebook.com/diamondtravels">
                  <i className="fab fa-facebook-f" />
                </a>
                <a className="btn btn-outline-light btn-social" href="https://instagram.com/diamondtravels">
                  <i className="fab fa-instagram" />
                </a>
                <a className="btn btn-outline-light btn-social" href="https://linkedin.com/company/diamondtravels">
                  <i className="fab fa-linkedin-in" />
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="text-white mb-3">Gallery</h4>
              <div className="row g-2 pt-2">
                <div className="col-4">
                  <img
                    className="img-fluid bg-light p-1"
                    src="assets/img/destination-1.jpg"
                    alt="Thailand"
                  />
                </div>
                <div className="col-4">
                  <img
                    className="img-fluid bg-light p-1"
                    src="assets/img/destination-2.jpg"
                    alt="Malaysia"
                  />
                </div>
                <div className="col-4">
                  <img
                    className="img-fluid bg-light p-1"
                    src="assets/img/destination-3.jpg"
                    alt="Australia"
                  />
                </div>
                <div className="col-4">
                  <img
                    className="img-fluid bg-light p-1"
                    src="assets/img/destination-4.jpg"
                    alt="Indonesia"
                  />
                </div>
                <div className="col-4">
                  <img
                    className="img-fluid bg-light p-1"
                    src="assets/img/package-1.jpg"
                    alt="Package 1"
                  />
                </div>
                <div className="col-4">
                  <img
                    className="img-fluid bg-light p-1"
                    src="assets/img/package-2.jpg"
                    alt="Package 2"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="text-white mb-3">Newsletter</h4>
              <p>
                Subscribe to our newsletter for travel tips, exclusive offers, and the latest updates on new destinations.
              </p>
              <div
                className="position-relative mx-auto"
                style={{ maxWidth: 400 }}
              >
                <input
                  className="form-control border-primary w-100 py-3 ps-4 pe-5"
                  type="email"
                  placeholder="Your email"
                />
                <button
                  type="button"
                  className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="copyright">
            <div className="row">
              <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                ©{" "}
                <a className="border-bottom" href="/">
                  Diamond Travels
                </a>
                , All Rights Reserved. Designed by{" "}
                <a className="border-bottom" href="https://github.com/ParasSalunke">
                  David Ishaka
                </a>
              </div>
              <div className="col-md-6 text-center text-md-end">
                <div className="footer-menu">
                  <a href="/">Home</a>
                  <a href="/cookies">Cookies</a>
                  <a href="/help">Help</a>
                  <a href="/faq">FAQs</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer End */}
    </div>
  )
}
