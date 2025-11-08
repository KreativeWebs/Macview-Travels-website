import React from "react";

const PasswordStrength = ({ password }) => {
  const hasLowerCase = /(?=.*[a-z])/.test(password);
  const hasUpperCase = /(?=.*[A-Z])/.test(password);
  const hasNumber = /(?=.*\d)/.test(password);
  const hasSpecialChar = /(?=.*[^a-zA-Z0-9])/.test(password);
  const hasMinLength = password.length >= 8;

  const requirements = [
    { label: "At least 8 characters", met: hasMinLength },
    { label: "At least one uppercase letter", met: hasUpperCase },
    { label: "At least one lowercase letter", met: hasLowerCase },
    { label: "At least one number", met: hasNumber },
  ];

  return (
    <div style={{ marginTop: "5px", marginBottom: "5px" }}>
      {requirements.map((req, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "2px",
            fontSize: "11px",
          }}
        >
          <span
            style={{
              color: req.met ? "green" : "red",
              marginRight: "6px",
              fontSize: "12px",
            }}
          >
            {req.met ? "✓" : "✗"}
          </span>
          <span style={{ color: req.met ? "green" : "red" }}>{req.label}</span>
        </div>
      ))}
    </div>
  );
};

export default PasswordStrength;
