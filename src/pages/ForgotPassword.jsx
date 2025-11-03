import React, { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      setMessage("Something went wrong.");
    }
  };

  return (
    <section  style={{
        backgroundColor: "#f8f9fa",
        minHeight: "50vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px 20px",
      }}>
      <div
        className="container"
        style={{ maxWidth: "400px", marginTop: "100px" }}
      >
        <h3>Forgot Password</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            className="form-control my-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="btn btn-primary w-100" type="submit">
            Send Reset Link
          </button>
        </form>
        {message && <p className="mt-3 text-center">{message}</p>}
      </div>
    </section>
  );
}

export default ForgotPassword;
