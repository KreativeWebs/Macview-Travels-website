import React from "react";
import { Link } from "react-router-dom";

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
            {/* About Section */}
            <div className="col-lg-4 col-md-6">
              <h4 className="text-white mb-3" style={{ fontFamily: "Raleway" }}>
                Macview Travels
              </h4>
              <p>
                Your trusted partner for unforgettable journeys. We offer
                curated travel packages, expert guides, and personalized service
                to make your adventures seamless and memorable.
              </p>

              <Link className="btn btn-link" to="/aboutus">
                About Us
              </Link>
              <Link className="btn btn-link" to="/contact">
                Contact Us
              </Link>
              <Link className="btn btn-link" to="/privacy-policy">
                Privacy Policy
              </Link>
              <Link className="btn btn-link" to="/terms">
                Terms &amp; Conditions
              </Link>
              <Link className="btn btn-link" to="/faq">
                FAQs &amp; Help
              </Link>
            </div>

            {/* Contact Section */}
            <div className="col-lg-4 col-md-6">
              <h4 className="text-white mb-3" style={{ fontFamily: "Raleway" }}>
                Contact
              </h4>
              <p className="mb-2">
                <i className="fa fa-map-marker-alt me-3" />
                Suite 436, Ikeja Plaza, Lagos, Nigeria
              </p>
              <p className="mb-2">
                <i className="fa fa-phone-alt me-3" />
                +234 911 011 1120, +234 816 905 6956
              </p>
              <p className="mb-2">
                <i className="fa fa-envelope me-3" />
                info@macviewtravel.com
              </p>

              {/* External links stay as <a> */}
              <div className="d-flex pt-2">
                <a
                  className="btn btn-outline-light btn-social"
                  href="https://facebook.com/macviewtravels"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-facebook-f" />
                </a>
                <a
                  className="btn btn-outline-light btn-social"
                  href="https://instagram.com/macviewtravels"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-instagram" />
                </a>
                <a
                  className="btn btn-outline-light btn-social"
                  href="https://linkedin.com/company/macviewtravels"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-linkedin-in" />
                </a>
              </div>
            </div>

            {/* Google Map Section */}
            <div className="col-lg-4 col-md-12">
              <h4 className="text-white mb-3" style={{ fontFamily: "Raleway" }}>
                Our Location
              </h4>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  paddingBottom: "56.25%",
                  height: 0,
                }}
              >
                <iframe
                  title="Macview Travels Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.426449096433!2d3.3413760760071063!3d6.593801222340315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b939286ab6063%3A0x74e940c08e595f28!2smacviewtravels!5e0!3m2!1sen!2sng!4v1760311595271!5m2!1sen!2sng"
                  style={{
                    border: 0,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="container">
          <div className="copyright">
            <div className="row">
              <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                ©{" "}
                <Link className="border-bottom" to="/">
                  Macview Travels
                </Link>
                , All Rights Reserved. Designed by{" "}
                <Link className="border-bottom" to="/">
                  David Ishaka
                </Link>
              </div>

              <div className="col-md-6 text-center text-md-end">
                <div className="footer-menu">
                  <Link to="/">Home</Link>
                  <Link to="/cookies">Cookies</Link>
                  <Link to="/help">Help</Link>
                  <Link to="/faq">FAQs</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer End */}
    </div>
  );
}
