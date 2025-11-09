import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/api/forgot-password", { email });
      toast.success(response.data.message);
      setEmail("");
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
          Forgot password?
        </h3>

        <p className="text-center mb-4" style={{  color: "#000000", fontSize: "13px"}}>
          Enter your email, we will send you a reset email.
        </p>

        <form onSubmit={handleSubmit}>
          <label className="fw-semibold mb-2" style={{}}>
            Email
          </label>

          <input
            type="email"
            className="form-control mb-4 p-3"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
              background: loading ? "#f1741e" : "#f1741e",
              color: loading ? "#ffffff" : "#ffffff",
              borderRadius: "40px",
              transition: "0.3s",
              border: "none",
            }}
          >
            {loading ? (
              <div className="spinner-border spinner-border-sm text-light"></div>
            ) : (
              "Reset password"
            )}
          </button>

          <div className="text-center">
            <Link
              to="/"
              style={{
                color: "#000000",
                fontWeight: "500",
                fontSize: "0.9rem",
              }}
            >
              Back to login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
