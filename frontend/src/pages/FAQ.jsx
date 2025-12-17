import HeroHeader from "./HeroHeader";

function FAQ() {
  return (
    <div
      style={{
        fontFamily:
          "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif",
      }}
    >
      <HeroHeader
        heroheadertitle="Frequently Asked Questions"
        heroheaderbg="/assets/img/bg-hero2.jpg"
        heroheaderdesc="Answers to common questions about our services and processes."
        pageName="FAQs"
      />

      {/* FAQ Content */}
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
                FAQs
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
                How Can We Help You at{" "}
                <span
                  className="text"
                  style={{ fontWeight: "600", color: "#1A5EA7" }}
                >
                  Macview Travels
                </span>
              </h1>

              <p className="mb-4 text-darkblack">
                Here are answers to some of the most common questions we receive
                from our clients. If you need further assistance, our support
                team is always available.
              </p>

              {/* FAQ Items */}

              <h3 style={{ color: "#175aa1", marginTop: "30px" }}>
                What services does Macview Travels offer?
              </h3>
              <p>
                We provide flight booking, hotel reservations, visa processing,
                travel insurance, study abroad support, airport transfers,
                protocol services, and curated travel packages.
              </p>

              <h3 style={{ color: "#175aa1", marginTop: "30px" }}>
                How do I apply for a visa through Macview Travels?
              </h3>
              <p>
                You can start your visa application by selecting the visa
                service on our website and submitting the required details.
                Our team will guide you through documentation and processing.
              </p>

              <h3 style={{ color: "#175aa1", marginTop: "30px" }}>
                How long does visa processing take?
              </h3>
              <p>
                Processing time varies by country and visa type. Estimated
                timelines will be communicated to you after your application
                is reviewed.
              </p>

              <h3 style={{ color: "#175aa1", marginTop: "30px" }}>
                Can I make changes to my booking after payment?
              </h3>
              <p>
                Changes depend on airline, hotel, or service provider policies.
                Please contact our support team as soon as possible for
                assistance.
              </p>

              <h3 style={{ color: "#175aa1", marginTop: "30px" }}>
                Do you offer refunds?
              </h3>
              <p>
                Refund eligibility depends on the service booked and third-party
                provider policies. We recommend reviewing the terms before
                making payments.
              </p>

              <h3 style={{ color: "#175aa1", marginTop: "30px" }}>
                Is my payment information secure?
              </h3>
              <p>
                Yes. We use secure payment gateways and industry-standard
                security practices to protect your personal and financial
                information.
              </p>

              <h3 style={{ color: "#175aa1", marginTop: "30px" }}>
                How can I contact customer support?
              </h3>
              <p>
                You can reach us via email, phone, or by visiting our contact
                page. Our support team is ready to assist you.
              </p>

              <p className="mb-4 mt-4">
                Still have questions? Please{" "}
                <a
                  href="/contact"
                  style={{
                    color: "#f1741e",
                    textDecoration: "underline",
                  }}
                >
                  contact us
                </a>{" "}
                and we’ll be happy to help.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
