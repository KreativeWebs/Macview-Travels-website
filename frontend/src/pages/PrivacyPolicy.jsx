import HeroHeader from "./HeroHeader";

function PrivacyPolicy() {
  return (
    <div
      style={{
        fontFamily:
          "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif",
      }}
    >
      <HeroHeader
        heroheadertitle="Privacy Policy"
        heroheaderbg="/assets/img/bg-hero2.jpg"
        heroheaderdesc="Your privacy is important to us. This policy explains how we handle your data."
        pageName="Privacy Policy"
      />

      {/* Privacy Policy Content */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-12 wow fadeInUp" data-wow-delay="0.1s">
              <h6
                className="section-title bg-white text-start text-secondary pe-3"
                style={{
                  fontFamily:
                    "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif",
                }}
              >
                Privacy Policy
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
                Protecting Your Privacy at{" "}
                <span
                  className="text"
                  style={{ fontWeight: "600", color: "#1A5EA7" }}
                >
                  Macview Travels
                </span>
              </h1>
              <p className="mb-4 text-darkblack">
                At Macview Travels, we value your trust. This Privacy Policy
                explains how we collect, use, and safeguard your personal
                information when you use our services.
              </p>

              <h3 style={{ color: "#175aa1", marginTop: "30px" }}>Information We Collect</h3>
              <p>
                We may collect personal information such as your name, email address,
                phone number, and payment details when you interact with our website or services.
              </p>

              <h3 style={{ color: "#175aa1", marginTop: "30px" }}>How We Use Your Information</h3>
              <p>
                Your data is used to provide our services, improve user experience,
                process payments, send relevant communications, and comply with legal obligations.
              </p>

              <h3 style={{ color: "#175aa1", marginTop: "30px" }}>Sharing Your Information</h3>
              <p>
                We do not sell or rent your personal data to third parties. We may share
                information with trusted service providers for operational purposes only.
              </p>

              <h3 style={{ color: "#175aa1", marginTop: "30px" }}>Data Security</h3>
              <p>
                We implement appropriate security measures to protect your information
                against unauthorized access, alteration, disclosure, or destruction.
              </p>

              <h3 style={{ color: "#175aa1", marginTop: "30px" }}>Your Rights</h3>
              <p>
                You have the right to access, correct, or delete your personal information.
                Contact us if you wish to exercise any of these rights.
              </p>

              <h3 style={{ color: "#175aa1", marginTop: "30px" }}>Changes to This Policy</h3>
              <p>
                We may update this Privacy Policy from time to time. We encourage you
                to review this page periodically for the latest information.
              </p>

              <p className="mb-4 mt-4">
                For any questions about this Privacy Policy or your data, please
                <a href="/contact" style={{ color: "#f1741e", textDecoration: "underline" }}>
                  {" "}contact us
                </a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
