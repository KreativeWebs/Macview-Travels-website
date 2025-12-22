import React, { useState, useEffect, useRef } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import { useAuthStore } from "../store/authStore";
import Modal from "bootstrap/js/dist/modal";
import PasswordStrength from "../components/PasswordStrength";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Signup() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPasswordStrength, setShowPasswordStrength] = useState(false);
  const modalInstanceRef = useRef(null);

  const { signup } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const modalElement = document.getElementById("signupModal");
    if (!modalElement) return;

    modalInstanceRef.current = new Modal(modalElement, {
      backdrop: true,
      keyboard: true,
      focus: true,
    });

    const clearFormOnShow = () => {
      setStep(1);
      setFirstName("");
      setEmail("");
      setPassword("");
      setShowPassword(false);
      setShowPasswordStrength(false);
    };

    modalElement.addEventListener("show.bs.modal", clearFormOnShow);

    return () => {
      if (modalInstanceRef.current) {
        modalInstanceRef.current.dispose();
        modalInstanceRef.current = null;
      }
      modalElement.removeEventListener("show.bs.modal", clearFormOnShow);
    };
  }, []);

  const handleNextStep = (e) => {
    e.preventDefault();
    if (!firstName || !email) {
      toast.error("Please fill in all fields");
      return;
    }
    setStep(2);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signup(firstName, email, password);

      if (result.success) {
        toast.success("Account created successfully!");

        modalInstanceRef.current?.hide();

        setTimeout(() => {
          document
            .querySelectorAll(".modal-backdrop")
            .forEach((el) => el.remove());
          document.body.classList.remove("modal-open");
        }, 300);

        navigate("/");
      } else {
        toast.error("Signup failed");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchToLogin = (e) => {
    e.preventDefault();
    modalInstanceRef.current?.hide();
    const loginModal = Modal.getOrCreateInstance(
      document.getElementById("loginModal")
    );
    loginModal.show();
  };

  const loginWithGoogle = async () => {
  try {
    setGoogleLoading(true);

    const result = await signInWithPopup(auth, googleProvider);
    const fullName = result.user.displayName || "";
    const googleFirstName = fullName.split(" ")[0];
    const idToken = await result.user.getIdToken();

    const response = await fetch(`${BASE_URL}/api/google-login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        idToken,
        email: result.user.email,
        firstName: googleFirstName,
      }),
    });

    const data = await response.json();
    setGoogleLoading(false);

    if (!response.ok) {
      toast.error(data.message);
      return;
    }

   
    const authStore = useAuthStore.getState();
    authStore.user = data.user; 
    authStore.accessToken = data.accessToken; 

    toast.success("Signup successful");
    modalInstanceRef.current?.hide();
    navigate("/");
  } catch (err) {
    console.error(err);
    toast.error("Google signup failed");
    setGoogleLoading(false);
  }
};


  return (
    <div className="modal fade" id="signupModal" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div
          className="modal-content"
          style={{ width: "600px", borderRadius: "10px" }}
        >
          <Carousel interval={5000} fade>
            <Carousel.Item>
              <img
                src="/assets/img/2151747475.jpg"
                className="d-block w-100"
                style={{ height: "250px", objectFit: "cover" }}
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                src="/assets/img/2151747444.jpg"
                className="d-block w-100"
                style={{ height: "250px", objectFit: "cover" }}
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                src="/assets/img/2151747469.jpg"
                className="d-block w-100"
                style={{ height: "250px", objectFit: "cover" }}
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

            <form onSubmit={step === 1 ? handleNextStep : handleSignup}>
              {step === 1 && (
                <>
                  <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input
                      className="form-control"
                      style={{
                        borderRadius: "4px",
                        boxShadow: "none",
                        borderColor: "#c9b5b5ff",
                      }}
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>

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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <button
                    className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
                    style={{
                      backgroundColor: "#f1741e",
                      border: "none",
                      borderRadius: "4px",
                      fontFamily: "'Raleway', sans-serif",
                    }}
                  >
                    Next
                  </button>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="mb-1 position-relative">
                    <label className="form-label">Password</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      style={{
                        borderRadius: "4px",
                        boxShadow: "none",
                        borderColor: "#c9b5b5ff",
                      }}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setShowPasswordStrength(true);
                      }}
                      required
                    />
                  </div>

                  {showPasswordStrength && (
                    <PasswordStrength password={password} />
                  )}

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
                      "Sign Up"
                    )}
                  </button>
                </>
              )}

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
                    Signup with Google
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
                Have an account?{" "}
                <a
                  href="#"
                  onClick={handleSwitchToLogin}
                  style={{
                    color: "#175aa1",
                    cursor: "pointer",
                    textDecoration: "none",
                  }}
                >
                  Login Here
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
                <a href="/terms-and-conditions" style={{ color: "#175aa1" }}>
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a href="privacy-policy" style={{ color: "#175aa1" }}>
                  Privacy Policy
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
