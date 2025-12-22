import React, { useState, useEffect } from "react";
import HeroHeader from "./HeroHeader";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/authStore";
import Modal from "bootstrap/js/dist/modal";

function Contact() {
  const { user, accessToken } = useAuthStore();

  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if user is authenticated before submitting
    if (!user || !accessToken) {
      // Show login modal for unauthenticated users
      const loginModalElement = document.getElementById("loginModal");
      if (loginModalElement) {
        const loginModal = Modal.getOrCreateInstance(loginModalElement);
        loginModal.show();
      }
      return; // Don't proceed with form submission
    }

    setLoading(true);

    try {
      const response = await fetch("VITE_API_BASE_URL/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send message");
      }

     toast.success("Message sent successfully");
      setFormData({ name: "", subject: "", message: "" });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

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
            <h6
              className="section-title bg-white text-center px-3"
              style={{ color: "#f1741e", fontFamily: "Raleway" }}
            >
              Contact Us
            </h6>
            <h1 className="mb-5" style={{ fontFamily: "Raleway" }}>
              Contact For Any Query
            </h1>
          </div>

          <div className="row g-4">
            {/* LEFT INFO COLUMN — UNCHANGED */}
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
              <h5 style={{ fontFamily: "Raleway" }}>Get In Touch</h5>
              <p className="mb-4" style={{ fontFamily: "Raleway" }}>
                Ready to plan your next adventure? Reach out to us for personalized travel solutions.
              </p>
              <div className="d-flex align-items-center mb-3">
                <div
                  className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary"
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    marginRight: 15,
                  }}
                >
                  <i className="fa fa-map-marker-alt text-white"></i>
                </div>
                <div className="ms-3">
                  <h5 className="text-primary" style={{ fontFamily: "Raleway" }}>Head Office</h5>
                  <p className="mb-0" style={{ fontFamily: "Raleway" }}>
                   Suite 436, Ikeja Plaza, Lagos, Nigeria
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <div
                  className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary"
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    marginRight: 15,
                  }}
                >
                  <i className="fa fa-map-marker-alt text-white"></i>
                </div>
                <div className="ms-3">
                  <h5 className="text-primary" style={{ fontFamily: "Raleway" }}>Branch Office</h5>
                  <p className="mb-0" style={{ fontFamily: "Raleway" }}>
                   Suite K39, Ikota Plaza, Lekki Lagos, Nigeria
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <div
                  className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary"
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    marginRight: 15,
                  }}
                >
                  <i className="fa fa-phone-alt text-white"></i>
                </div>
                <div className="ms-3">
                  <h5 className="text-primary" style={{ fontFamily: "Raleway" }}>Phone Number</h5>
                  <p className="mb-0" style={{ fontFamily: "Raleway" }}>
                    +234 911 011 1120, +234 816 905 6956
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div
                  className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary"
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    marginRight: 15,
                  }}
                >
                  <i className="fa fa-envelope-open text-white"></i>
                </div>
                <div className="ms-3">
                  <h5 className="text-primary" style={{ fontFamily: "Raleway" }}>Email</h5>
                  <p className="mb-0" style={{ fontFamily: "Raleway" }}>
                    info@macviewtravel.com
                  </p>
                </div>
              </div>
            </div>

            {/* MAP — UNCHANGED */}
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
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

            {/* FORM */}
            <div className="col-lg-4 col-md-12 wow fadeInUp" data-wow-delay="0.5s">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={{
                          borderRadius: "4px",
                          boxShadow: "none",
                          borderColor: "#c9b5b5ff",
                        }}
                      />
                      <label htmlFor="name">Your Name</label>
                    </div>
                  </div>



                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="subject"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
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
                        id="message"
                        placeholder="Leave a message here"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        style={{
                          height: 100,
                          borderRadius: "4px",
                          boxShadow: "none",
                          borderColor: "#c9b5b5ff",
                        }}
                      />
                      <label htmlFor="message">Message</label>
                    </div>
                  </div>

                  <div className="col-12">
                    <button
                      className="btn text-white w-100 py-3"
                      type="submit"
                      disabled={loading}
                      style={{
                        backgroundColor: "#f1741e",
                        border: "none",
                        borderRadius: "4px",
                        fontFamily: "'Raleway', sans-serif",
                      }}
                    >
                      {loading ? "Sending..." : "Send Message"}
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













