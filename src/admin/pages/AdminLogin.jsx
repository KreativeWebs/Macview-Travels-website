import React, { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const { adminLogin, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    const result = await adminLogin(email, password);

    if (result.success) {
      navigate("/admin");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-center px-0 " style={{justifyItem: "center", paddingTop: "200px"}}>
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="text-left py-5 px-4 px-sm-5 border mt-5">
                <h4 style={{ fontFamily: "Raleway", color: "#175aa1" }}>Admin Login</h4>
                <h6 style={{ fontFamily: "Raleway", fontWeight: "400" }}>
                  Sign in to access the admin dashboard.
                </h6>
                {error && (
                  <div className="alert alert-danger mt-3" role="alert">
                    {error}
                  </div>
                )}
                <form style={{ marginTop: "30px" }} onSubmit={handleSubmit}>
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

                  <div className="mb-3 position-relative">
                    <label className="form-label">Password</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                      <i className={`fa ${showPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
                    disabled={isLoading}
                    style={{
                      backgroundColor: "#f1741e",
                      border: "none",
                      borderRadius: "4px",
                      fontFamily: "'Raleway', sans-serif",
                    }}
                  >
                    {isLoading ? "Logging In..." : "Log In"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
