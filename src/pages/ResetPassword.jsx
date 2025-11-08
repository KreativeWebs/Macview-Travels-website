import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api";
import PasswordStrength from "../components/PasswordStrength";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      toast.error("Invalid reset link");
      navigate("/login");
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post(`/api/reset-password/${token}`, {
        password,
      });

      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "80vh",
        padding: "20px",
      }}
    >
      <div
        className="card border-0"
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#ffffff",
          borderRadius: "10px",
          padding: "32px",
          boxShadow: "0 5px 30px rgba(0, 0, 0, 0.05)",
        }}
      >
        <h3
          className="text-center mb-2"
          style={{ color: "#175aa1", fontWeight: "700" }}
        >
          Reset Password
        </h3>

        <p
          className="text-center mb-4"
          style={{ color: "#000000", fontSize: "13px" }}
        >
          Set a new password and confirm it below.
        </p>

        <form onSubmit={handleSubmit}>
          <label className="fw-semibold mb-2">New Password</label>
          <input
            type="password"
            className="form-control mb-3 p-3"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              borderRadius: "4px",
              boxShadow: "none",
              borderColor: "#c9b5b5ff",
            }}
          />

          {/* Password strength meter */}
          <PasswordStrength password={password} />

          <label className="fw-semibold mb-2 mt-3">Confirm Password</label>
          <input
            type="password"
            className="form-control mb-4 p-3"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{
              borderRadius: "4px",
              boxShadow: "none",
              borderColor: "#c9b5b5ff",
            }}
          />

          <button
            className="btn w-100 py-3 fw-semibold mb-3"
            type="submit"
            disabled={loading}
            style={{
              background: "#f1741e",
              color: "#ffffff",
              borderRadius: "4px",
              transition: "0.3s",
              border: "none",
            }}
          >
            {loading ? (
              <div className="spinner-border spinner-border-sm text-light"></div>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
