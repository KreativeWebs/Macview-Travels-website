import React, { useState } from "react";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // Handle newsletter subscription logic here (API call)
      console.log("Subscribed:", { name, email });
      setSubmitted(true);
      setEmail("");
      setName("");
    }
  };

  return (
    <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
      <div
        className="container p-0"
        style={{ borderRadius: "15px", overflow: "hidden", boxShadow: "0 0 20px rgba(0,0,0,0.1)" }}
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
              {submitted && (
                <p className="" style={{ color: "#ffffff" }}>
                  Thank you for subscribing!
                </p>
              )}
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
