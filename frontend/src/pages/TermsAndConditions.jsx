import React from "react";
import HeroHeader from "./HeroHeader";

function TermsAndConditions() {
  return (
    <div
      style={{
        fontFamily:
          "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif",
      }}
    >
      <HeroHeader
        heroheadertitle="Terms & Conditions"
        heroheaderbg="assets/img/7626.jpg"
        heroheaderdesc="Please read these terms carefully before using our services."
        pageName="Terms & Conditions"
      />

      {/* Terms Content */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-12 wow fadeInUp" data-wow-delay="0.1s">
              <h6
                className="section-title bg-white text-start text-secondary pe-3"
                style={{ fontFamily: "Raleway" }}
              >
                Terms & Conditions
              </h6>

              <h1
                className="mb-4"
                style={{
                  fontFamily: "Raleway",
                  fontWeight: "400",
                  fontSize: "40px",
                }}
              >
                Welcome to{" "}
                <span style={{ fontWeight: "600", color: "#1A5EA7" }}>
                  Macview Travels
                </span>
              </h1>

              <p className="mb-4 text-darkblack">
                These Terms and Conditions govern your use of the Macview Travels
                website and services. By accessing or using our platform, you
                agree to be bound by these terms.
              </p>

              {/* Section */}
              <h3 style={{ color: "#175aa1", marginTop: "30px" }}>
                1. Use of Our Services
              </h3>
              <p>
                Macview Travels provides travel-related services including flight
                bookings, visa assistance, travel packages, and consultancy.
                You agree to use our services only for lawful purposes.
              </p>

              {/* Section */}
              <h3 style={{ color: "#175aa1", marginTop: "30px" }}>
                2. Booking & Payments
              </h3>
              <p>
                All bookings are subject to availability and confirmation.
                Payments must be completed as required for your reservation to
                be processed. Prices may change without prior notice.
              </p>

              {/* Section */}
              <h3 style={{ color: "#175aa1", marginTop: "30px" }}>
                3. Cancellations & Refunds
              </h3>
              <p>
                Cancellation and refund policies vary depending on the service
                provider (airlines, hotels, embassies, etc.). Macview Travels is
                not responsible for third-party refund delays or denials.
              </p>

              {/* Section */}
              <h3 style={{ color: "#175aa1", marginTop: "30px" }}>
                4. Visa & Immigration Disclaimer
              </h3>
              <p>
                Visa approvals are at the sole discretion of the issuing
                authorities. Macview Travels does not guarantee visa approval
                and will not be liable for any visa rejection or delays.
              </p>

              {/* Section */}
              <h3 style={{ color: "#175aa1", marginTop: "30px" }}>
                5. User Responsibilities
              </h3>
              <p>
                You are responsible for providing accurate and complete
                information during bookings and applications. Any errors may
                result in service delays or additional charges.
              </p>

              {/* Section */}
              <h3 style={{ color: "#175aa1", marginTop: "30px" }}>
                6. Limitation of Liability
              </h3>
              <p>
                Macview Travels shall not be liable for any indirect, incidental,
                or consequential damages arising from the use of our services or
                website.
              </p>

              {/* Section */}
              <h3 style={{ color: "#175aa1", marginTop: "30px" }}>
                7. Intellectual Property
              </h3>
              <p>
                All content on this website, including text, graphics, logos,
                and images, is the property of Macview Travels and may not be
                reproduced without permission.
              </p>

              {/* Section */}
              <h3 style={{ color: "#175aa1", marginTop: "30px" }}>
                8. Changes to These Terms
              </h3>
              <p>
                We reserve the right to update or modify these Terms &
                Conditions at any time. Continued use of our services
                constitutes acceptance of the updated terms.
              </p>

              {/* Section */}
              <h3 style={{ color: "#175aa1", marginTop: "30px" }}>
                9. Governing Law
              </h3>
              <p>
                These Terms shall be governed and interpreted in accordance with
                the laws of the Federal Republic of Nigeria.
              </p>

              <p className="mt-4">
                If you have any questions regarding these Terms & Conditions,
                please{" "}
                <a
                  href="/contact"
                  style={{
                    color: "#f1741e",
                    textDecoration: "underline",
                  }}
                >
                  contact us
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TermsAndConditions;
