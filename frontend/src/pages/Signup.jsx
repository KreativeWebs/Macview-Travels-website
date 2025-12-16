import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebaseConfig";
import { Carousel } from "react-bootstrap";
import { useAuthStore } from "../store/authStore";
// Modal is loaded from CDN, so use window.Modal
import PasswordStrength from '../components/PasswordStrength';
import { toast } from 'react-toastify';

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPasswordStrength, setShowPasswordStrength] = useState(false);
  const modalInstanceRef = useRef(null);

  const { signup, error } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const modalElement = document.getElementById("signupModal");
    if (!modalElement) return;

    // Initialize modal instance
    if (typeof Modal !== 'undefined') {
      modalInstanceRef.current = new Modal(modalElement, {
        backdrop: true,
        keyboard: true,
        focus: true,
      });
    }

    const clearFormOnShow = () => {
      setEmail("");
      setPassword("");
      setShowPassword(false);
      setShowPasswordStrength(false);
    };

    modalElement.addEventListener("show.bs.modal", clearFormOnShow);

    // Cleanup function
    return () => {
      if (modalInstanceRef.current) {
        modalInstanceRef.current.dispose();
        modalInstanceRef.current = null;
      }
      modalElement.removeEventListener("show.bs.modal", clearFormOnShow);
      document.querySelectorAll(".modal-backdrop").forEach((el) => el.remove());
      document.body.classList.remove("modal-open");
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signup(email, password);

      if (result.success) {
        toast.success("Account created successfully!");

        if (modalInstanceRef.current) {
          modalInstanceRef.current.hide();
        }

        setTimeout(() => {
          document
            .querySelectorAll(".modal-backdrop")
            .forEach((el) => el.remove());
          document.body.classList.remove("modal-open");
          document.body.style.overflow = "";
          document.body.style.paddingRight = "";
        }, 300);

        setEmail("");
        setPassword("");
        navigate("/");
      } else {
        if (result.status === 400) {
          toast.error("This email already exists, please login instead");
        } else {
          toast.error("Signup failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchToLogin = (e) => {
    e.preventDefault();

    const signupModalElement = document.getElementById("signupModal");
    const loginModalElement = document.getElementById("loginModal");

    if (modalInstanceRef.current && loginModalElement) {
      // Listen for when signup modal is FULLY hidden
      const onSignupHidden = () => {
        // Clean up any lingering backdrops
        document
          .querySelectorAll(".modal-backdrop")
          .forEach((el) => el.remove());
        document.body.classList.remove("modal-open");
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";

        // Now show login modal
        const loginModal = Modal.getOrCreateInstance(loginModalElement);
        loginModal.show();

        // Remove this listener after it fires once
        signupModalElement.removeEventListener(
          "hidden.bs.modal",
          onSignupHidden
        );
      };

      signupModalElement.addEventListener("hidden.bs.modal", onSignupHidden);
      modalInstanceRef.current.hide();
    }
  };

  const loginWithGoogle = async () => {
    try {
      setGoogleLoading(true);

      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const idToken = await user.getIdToken();

      const response = await fetch("http://localhost:5000/api/google-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ idToken, email: user.email }),
      });

      const data = await response.json();
      setGoogleLoading(false);

      if (response.ok) {
        const authStore = useAuthStore.getState();
        authStore.user = data.user;
        authStore.accessToken = data.accessToken;

        toast.success("Signup successful");

        if (modalInstanceRef.current) modalInstanceRef.current.hide();

        setTimeout(() => {
          document
            .querySelectorAll(".modal-backdrop")
            .forEach((el) => el.remove());
          document.body.classList.remove("modal-open");
          document.body.style.overflow = "";
          document.body.style.paddingRight = "";
        }, 300);

        navigate("/");
      } else {
        toast.error(data.message || "Google signup failed");
      }
    } catch (error) {
      console.error("Google signup error:", error);
      toast.error(error.message || "Something went wrong during Google login");
      setGoogleLoading(false);
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
            height: showPasswordStrength ? "820px" : "750px",
            overflow: "hidden",
            borderRadius: "10px",
            transition: "height 0.3s ease",
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

          <Carousel interval={5000} fade>
            <Carousel.Item>
              <img
                src="/assets/img/2151747475.jpg"
                className="d-block w-100"
                alt="Slide 1"
                style={{ objectFit: "cover", height: "250px" }}
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                src="/assets/img/2151747444.jpg"
                className="d-block w-100"
                alt="Slide 2"
                style={{ objectFit: "cover", height: "250px" }}
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                src="/assets/img/2151747469.jpg"
                className="d-block w-100"
                alt="Slide 3"
                style={{ objectFit: "cover", height: "250px" }}
              />
            </Carousel.Item>
          </Carousel>

          <div className="p-4">
            <h5
              className="modal-title mb-3 text-center"
              id="signupModalLabel"
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

            <form onSubmit={handleSignup}>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    borderRadius: "4px",
                    boxShadow: "none",
                    borderColor: "#c9b5b5ff",
                  }}
                />
              </div>
              <div className="mb-1 position-relative">
                <label className="form-label">Password</label>

                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (!showPasswordStrength) setShowPasswordStrength(true);
                  }}
                  required
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
                    className={`fa ${showPassword ? "fa-eye" : "fa-eye-slash"}`}
                  ></i>
                </span>
              </div>
              {showPasswordStrength && <PasswordStrength password={password} />}

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
                style={{
                  backgroundColor: "#f1741e",
                  border: "none",
                  borderRadius: "4px",
                  fontFamily: "'Raleway', sans-serif",
                  marginTop: "10px"
                }}
              >
                {loading ? (
                  <span className="spinner-border spinner-border-sm text-light"></span>
                ) : (
                  "Sign up"
                )}
              </button>

              <button
                type="button"
                onClick={loginWithGoogle}
                disabled={googleLoading}
                className="btn w-100 mt-3 d-flex align-items-center justify-content-center gap-2"
                style={{
                  borderRadius: "4px",
                  borderColor: "#c9b5b5ff",
                  fontWeight: "300",
                }}
              >
                {googleLoading ? (
                  <span className="spinner-border spinner-border-sm text-secondary"></span>
                ) : (
                  <>
                    <img
                      src="/assets/img/google-icon.png"
                      alt=""
                      style={{ width: "30px" }}
                    />{" "}
                    Sign up with Google
                  </>
                )}
              </button>

              <p
                style={{
                  textAlign: "center",
                  marginTop: "20px",
                  color: "#494747ff",
                }}
              >
                Have an account already?{" "}
                <a
                  href="#"
                  onClick={handleSwitchToLogin}
                  style={{
                    color: "#175aa1",
                    cursor: "pointer",
                    textDecoration: "none",
                  }}
                >
                  Log in here
                </a>
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
                <a href="#" style={{ color: "#175aa1" }}>
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a href="#" style={{ color: "#175aa1" }}>
                  Privacy Policy
                </a>{" "}
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
