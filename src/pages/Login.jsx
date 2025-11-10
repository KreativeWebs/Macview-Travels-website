import React, { useState, useEffect, useRef } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import { useAuthStore } from "../store/authStore";
import Modal from "bootstrap/js/dist/modal";
import { toast } from "react-toastify";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const modalInstanceRef = useRef(null);

  const { login, error } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const modalElement = document.getElementById("loginModal");
    if (!modalElement) return;

    modalInstanceRef.current = new Modal(modalElement, {
      backdrop: true,
      keyboard: true,
      focus: true,
    });

    const cleanupOnHide = () => {
      document.querySelectorAll(".modal-backdrop").forEach((el) => el.remove());
      document.body.classList.remove("modal-open");
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };

    const clearFormOnShow = () => {
      setEmail("");
      setPassword("");
      setShowPassword(false);
    };

    modalElement.addEventListener("hidden.bs.modal", cleanupOnHide);
    modalElement.addEventListener("show.bs.modal", clearFormOnShow);

    return () => {
      if (modalInstanceRef.current) {
        modalInstanceRef.current.dispose();
        modalInstanceRef.current = null;
      }
      modalElement.removeEventListener("hidden.bs.modal", cleanupOnHide);
      modalElement.removeEventListener("show.bs.modal", clearFormOnShow);
      cleanupOnHide();
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { success } = await login(email, password);

      if (success) {
        toast.success("Login successful");

        if (modalInstanceRef.current) modalInstanceRef.current.hide();

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
        toast.error("Invalid email or password");
      }
    } catch (err) {
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchToSignup = (e) => {
    e.preventDefault();
    const loginModalElement = document.getElementById("loginModal");
    const signupModalElement = document.getElementById("signupModal");

    if (modalInstanceRef.current && signupModalElement) {
      const onLoginHidden = () => {
        document
          .querySelectorAll(".modal-backdrop")
          .forEach((el) => el.remove());
        document.body.classList.remove("modal-open");
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";

        const signupModal = Modal.getOrCreateInstance(signupModalElement);
        signupModal.show();
        loginModalElement.removeEventListener("hidden.bs.modal", onLoginHidden);
      };

      loginModalElement.addEventListener("hidden.bs.modal", onLoginHidden);
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

        toast.success("Login successful");

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
        toast.error(data.message || "Google login failed");
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast.error(error.message || "Something went wrong during Google login");
      setGoogleLoading(false);
    }
  };

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
            height: "780px",
            overflow: "hidden",
            borderRadius: "10px",
          }}
        >
          {/* Close Button */}
          <i
            className="fa fa-times"
            data-bs-dismiss="modal"
            aria-label="Close"
            style={{
              position: "absolute",
              top: "25px",
              right: "20px",
              zIndex: 10,
              cursor: "pointer",
              color: "white",
            }}
          ></i>

          {/* Carousel */}
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

          {/* Form */}
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
              We're happy to see you again!
            </p>

            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  required
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
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

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
                style={{
                  backgroundColor: "#f1741e",
                  border: "none",
                  borderRadius: "4px",
                  fontFamily: "'Raleway', sans-serif",
                }}
              >
                {loading ? (
                  <span className="spinner-border spinner-border-sm text-light"></span>
                ) : (
                  "Log in"
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
                      src="assets/img/google-icon.png"
                      alt=""
                      style={{ width: "30px" }}
                    />{" "}
                    Log in with Google
                  </>
                )}
              </button>

              <p
                style={{
                  textAlign: "center",
                  marginTop: "10px",
                  color: "#494747ff",
                }}
              >
                <a
                  href="#"
                  onClick={() => (window.location.href = "/forgot-password")}
                  style={{
                    color: "#175aa1",
                    cursor: "pointer",
                    textDecoration: "none",
                  }}
                >
                  Forgot your password?
                </a>
              </p>
              <p
                style={{
                  textAlign: "center",
                  marginTop: "20px",
                  color: "#494747ff",
                }}
              >
                Don't have an account?{" "}
                <a
                  href="#"
                  onClick={handleSwitchToSignup}
                  style={{
                    color: "#175aa1",
                    cursor: "pointer",
                    textDecoration: "none",
                  }}
                >
                  Sign up for free
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
                By signing in or registering, I confirm that i have read and{" "}
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

export default Login;
