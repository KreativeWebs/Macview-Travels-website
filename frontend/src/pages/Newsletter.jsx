import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuthStore } from "../store/authStore";
import Modal from "bootstrap/js/dist/modal";

const API_BASE_URL = "VITE_API_BASE_URL/api";

function Newsletter() {
  const { user } = useAuthStore();
  const [email, setEmail] = useState(user ? user.email : "");
  const [name, setName] = useState(user ? user.firstName : "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      // Open login modal if not logged in
      const loginModalElement = document.getElementById("loginModal");
      if (loginModalElement) {
        const loginModal = Modal.getOrCreateInstance(loginModalElement);
        loginModal.show();
      }
      return;
    }

    if (!email) return toast.error("Please enter your email");

    setLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/newsletter/subscribe`,
        { email }
      );
      toast.success(response.data.message || "Subscribed successfully!");
      setEmail("");
      setName("");
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      const msg =
        error?.response?.data?.message || "Subscription failed. Try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
      <div
        className="container p-0"
        style={{
          borderRadius: "15px",
          overflow: "hidden",
          boxShadow: "0 0 20px rgba(0,0,0,0.1)",
        }}
      >
        <div className="row g-0">
          {/* Left Side - Text with Background Image */}
          <div
            className="col-md-6 d-flex flex-column justify-content-center p-5"
            style={{
              backgroundImage: "url('assets/img/Traveling car holiday.jpeg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              color: "#fff",
              position: "relative",
            }}
          >
            {/* Dark Overlay */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 1,
              }}
            ></div>

            {/* Text Content */}
            <div style={{ position: "relative", zIndex: 2 }}>
              <h6
                className="text-uppercase mb-3"
                style={{
                  fontFamily: "'Raleway', sans-serif",
                  letterSpacing: "2px",
                  color: "#ffffff",
                }}
              >
                Stay Updated
              </h6>
              <h1
                className="mb-4"
                style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontWeight: "700",
                  color: "#ffffff",
                }}
              >
                Subscribe to Our Newsletter
              </h1>
              <p className="mb-4">
                Get the latest travel deals, tips, and updates delivered
                directly to your inbox.
              </p>
            
            </div>
          </div>

          {/* Right Side - Form with White Background */}
          <div className="col-md-6 p-5" style={{ backgroundColor: "#fff" }}>
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control bg-transparent"
                      id="name"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
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
                      className="form-control bg-transparent"
                      id="email"
                      placeholder="Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
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
                  <button
                    className="btn btn-primary w-100 py-3"
                    type="submit"
                    style={{
                      backgroundColor: "#f1741e",
                      border: "none",
                      borderRadius: "4px",
                      fontFamily: "'Raleway', sans-serif",
                    }}
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Newsletter;
