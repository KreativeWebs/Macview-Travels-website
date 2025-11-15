import React from "react";
import HeroHeader from "./HeroHeader";

function Contact() {
  return (
    <div>
      
    <HeroHeader
        heroheaderbg="assets/img/251185.jpg"
        heroheadertitle="Contact Us"
        pageName="Contact us"
        heroheaderdesc="Talk to Us, Travel Better. Personalized assistance to guide you every step of the way."
      />

      {/* Contact Start */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center px-3" style={{color: "#f1741e", fontFamily: "Raleway"}}>
              Contact Us
            </h6>
            <h1 className="mb-5" style={{fontFamily: "Raleway"}}>Contact For Any Query</h1>
          </div>
          <div className="row g-4">
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <h5 style={{fontFamily: "Raleway"}}>Get In Touch</h5>

              <div className="d-flex align-items-center mb-4">
                <div
                  className="d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{ width: 50, height: 50, backgroundColor: "#f1741e", borderRadius: "10px" }}
                >
                  <i className="fa fa-map-marker-alt text-white" />
                </div>
                <div className="ms-3">
                  <h5 className="" style={{fontFamily: "Raleway", color: "#f1741e"}}>Head Office</h5>
                  <p className="mb-0">
                    Suites 436, 4th Floor Ikeja Plaza, 81 Mobolaji Bank Anthony
                    way, Ikeja, Lagos state Nigeria
                  </p>
                </div>
              </div>

              <div className="d-flex align-items-center mb-4">
                <div
                  className="d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{ width: 50, height: 50, backgroundColor: "#f1741e", borderRadius: "10px"  }}
                >
                  <i className="fa fa-map-marker-alt text-white" />
                </div>
                <div className="ms-3">
                  <h5 className="" style={{fontFamily: "Raleway", color: "#f1741e"}}>Branch Office</h5>
                  <p className="mb-0">
                    Suite K37, Road 5, Ikota shopping complex, VGC Lekki, Lagos
                    state Nigeria
                  </p>
                </div>
              </div>

              <div className="d-flex align-items-center mb-4">
                <div
                  className="d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{ width: 50, height: 50, backgroundColor: "#f1741e", borderRadius: "10px"  }}
                >
                  <i className="fa fa-phone-alt text-white" />
                </div>
                <div className="ms-3">
                  <h5 className="" style={{fontFamily: "Raleway", color: "#f1741e"}}>Mobile</h5>
                  <p className="mb-0">
                    +234 911 011 1120, +234 816 905 6956, <br /> + 234 906 147
                    6967
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div
                  className="d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{ width: 50, height: 50, backgroundColor: "#f1741e", borderRadius: "10px"}}
                >
                  <i className="fa fa-envelope-open text-white" />  
                </div>
                <div className="ms-3">
                  <h5 className="" style={{fontFamily: "Raleway", color: "#f1741e"}}>Email</h5>
                  <p className="mb-0">info@macviewtravel.com</p>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <iframe
                className="position-relative rounded w-100 h-100"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.426449096433!2d3.3413760760071063!3d6.593801222340315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b939286ab6063%3A0x74e940c08e595f28!2smacviewtravels!5e0!3m2!1sen!2sng!4v1760311595271!5m2!1sen!2sng"
                frameBorder={0}
                style={{ minHeight: 300, border: 0 }}
                allowFullScreen=""
                aria-hidden="false"
                tabIndex={0}
              />
            </div>
            <div
              className="col-lg-4 col-md-12 wow fadeInUp"
              data-wow-delay="0.5s"
            >
              <form>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Your Name"

                        style={{
                        borderRadius: "4px",
                        boxShadow: "none",
                        borderColor: "#c9b5b5ff",
                      }}
                      />
                      <label htmlFor="name">Your Name</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Your Email"

                        style={{
                        borderRadius: "4px",
                        boxShadow: "none",
                        borderColor: "#c9b5b5ff",
                      }}
                      />
                      <label htmlFor="email">Your Email</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="subject"
                        placeholder="Subject"

                        style={{
                        borderRadius: "4px",
                        boxShadow: "none",
                        borderColor: "#c9b5b5ff",
                      }}
                      />
                      <label htmlFor="subject">Subject</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        placeholder="Leave a message here"
                        id="message"
                        style={{
                          height: 100,
                          borderRadius: "4px",
                          boxShadow: "none",
                          borderColor: "#c9b5b5ff",
                        }}
                        defaultValue={""}
                      />
                      <label htmlFor="message">Message</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <button
                      className="btn text-white w-100 py-3"
                      type="submit"

                       style={{
                      backgroundColor: "#f1741e",
                      border: "none",
                      borderRadius: "4px",
                      fontFamily: "'Raleway', sans-serif",
                    }}
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Contact End */}
    </div>
  );
}

export default Contact;
