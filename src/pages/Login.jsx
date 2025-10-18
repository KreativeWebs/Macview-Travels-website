import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className="modal fade"
      id="loginModal"
      tabIndex="-1"
      aria-labelledby="loginModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div
          className="modal-content position-relative"
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
                alt="Slide 3"
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
              Log in
            </h5>
            <p
              style={{
                textAlign: "center",
                fontSize: "15px",
                marginTop: "-15px",
                color: "#494747ff",
              }}
            >
              We’re happy to see you again!
            </p>

            <form>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
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
                Log in
              </button>

              <button
                type="button"
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
                Log in with Google
              </button>

              <p
                style={{
                  textAlign: "center",
                  marginTop: "20px",
                  color: "#494747ff",
                }}
              >
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  data-bs-toggle="modal"
                  data-bs-target="#signupModal"
                  data-bs-dismiss="modal"
                  style={{ color: "#175aa1" }}
                >
                  Sign up for free
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
                By signing in or registering, I confirm that I have read and{" "}
                <br /> agreed to Macview's{" "}
                <Link style={{ color: "#175aa1" }}>Terms and Conditions</Link>{" "}
                and <Link style={{ color: "#175aa1" }}>Privacy Policy</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
