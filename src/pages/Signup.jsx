import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import { useState } from "react";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      setMessage(data.message);

      if (res.ok) {
        console.log("✅ User created successfully");
        // Optional: redirect to login modal here
      } else {
        console.log("⚠️ Error:", data.message);
      }
    } catch (err) {
      console.error("❌ Error:", err);
      setMessage("Server error");
    }
  };

  return (
    <div
      className="modal fade"
      id="signupModal"
      tabIndex="-1"
      aria-labelledby="signupModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div
          className="modal-content"
          style={{
            width: "600px",
            height: "750px",
            overflow: "hidden",
            borderRadius: "10px",
          }}
        >
          <i
            className="fa fa-times"
            data-bs-dismiss="modal"
            aria-label="Close"
            style={{
              position: "absolute",
              top: "25px",
              right: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
              cursor: "pointer",
              transition: "0.3s ease",
              fontSize: "16px",
              color: "white",
            }}
          ></i>

          {/* Carousel section */}
          <Carousel interval={5000} fade>
            <Carousel.Item>
              <img
                src="assets/img/2151747475.jpg"
                className="d-block w-100"
                alt="Slide 1"
                style={{ objectFit: "cover", height: "250px" }}
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                src="assets/img/2151747444.jpg"
                className="d-block w-100"
                alt="Slide 2"
                style={{ objectFit: "cover", height: "250px" }}
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                src="assets/img/2151747469.jpg"
                className="d-block w-100"
                alt="Slide 2"
                style={{ objectFit: "cover", height: "250px" }}
              />
            </Carousel.Item>
          </Carousel>

          {/* Modal content below */}
          <div className="p-4">
            <h5
              className="modal-title mb-3 text-center"
              id="loginModalLabel"
              style={{ fontFamily: "Raleway", color: "#175aa1" }}
            >
              Sign Up
            </h5>
            <p
              style={{
                textAlign: "center",
                fontSize: "15px",
                marginTop: "-15px",
                color: "#494747ff",
              }}
            >
              Your next experience starts with an account.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    borderRadius: "4px",
                    boxShadow: "none",
                    borderColor: "#c9b5b5ff",
                  }}
                />
              </div>
              <div className="mb-3 position-relative">
                <label className="form-label">Password</label>

                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    borderRadius: "4px",
                    boxShadow: "none",
                    borderColor: "#c9b5b5ff",
                  }}
                />

                <span
                  className="position-absolute end-0 translate-middle-y me-3"
                  style={{ cursor: "pointer", top: "50px" }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i
                    className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                  ></i>
                </span>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
                style={{
                  backgroundColor: "#f1741e",
                  border: "none",
                  borderRadius: "4px",
                  fontFamily: "'Raleway', sans-serif",
                }}
              >
                Sign Up
              </button>

              <button
                type="button"
                // onClick={handleGoogleLogin}
                className="btn w-100 mt-3"
                style={{
                  borderRadius: "4px",
                  boxShadow: "none",
                  borderColor: "#c9b5b5ff",
                  fontWeight: "300",
                }}
              >
                <img
                  src="assets/img/google-icon.png"
                  alt=""
                  style={{ width: "30px" }}
                />{" "}
                Sign up with Google
              </button>

              <p
                style={{
                  textAlign: "center",
                  marginTop: "20px",
                  color: "#494747ff",
                }}
              >
                Have an account already?{" "}
                <Link
                  to="/login"
                  data-bs-toggle="modal"
                  data-bs-target="#loginModal"
                  data-bs-dismiss="modal"
                  style={{ color: "#175aa1" }}
                >
                  Log in here
                </Link>
              </p>

              <p
                style={{
                  fontSize: "12px",
                  textAlign: "center",
                  marginTop: "-7px",
                  color: "#494747ff",
                }}
              >
                By registering or signing in, I confirm that i have read and{" "}
                <br /> agreed to Macview's{" "}
                <Link style={{ color: "#175aa1" }}>Terms and Conditions</Link>{" "}
                and <Link style={{ color: "#175aa1" }}>Privacy Policy</Link>{" "}
              </p>

               {message && <p>{message}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
