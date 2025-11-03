import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ResetPassword() {
  const { userId, token } = useParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:5000/api/auth/reset-password/${userId}/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        }
      );

      const data = await res.json();
      setMessage(data.message);

      if (res.ok) {
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      setMessage("Something went wrong.");
    }
  };

  return (
    <div className="container" style={{ maxWidth: "400px", marginTop: "100px" }}>
      <h3>Reset Password</h3>
      <form onSubmit={handleReset}>
        <input
          type="password"
          placeholder="Enter new password"
          className="form-control my-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn btn-primary w-100" type="submit">
          Reset Password
        </button>
      </form>
      {message && <p className="mt-3 text-center">{message}</p>}
    </div>
  );
};

export default ResetPassword;
