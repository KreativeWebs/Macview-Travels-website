import React from "react";
import { useLocation, Link } from "react-router-dom";

function SuccessCard ({ title, message1, message2, imageSrc, imageAlt, buttonText, buttonLink }) {
  const location = useLocation();
  const { name } = location.state || { name: "Traveler" };

  return (
    <section
      style={{
        backgroundColor: "#f8f9fa",
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px 20px",
      }}
    >
      <div className="success-card">
        <div className="success-text">
          <h2 style={{ color: "#0d47a1", fontFamily: "Raleway" }}>
            {title}, {name}
          </h2>
          <p style={{ color: "#555", margin: "10px 0" }}>
            {message1}
          </p>
          <p style={{ color: "#777", marginBottom: "20px" }}>
            {message2}
          </p>

          <Link
            to={buttonLink}
            style={{
              display: "inline-block",
              backgroundColor: "#f1741e",
              color: "white",
              padding: "10px 24px",
              borderRadius: "8px",
              textDecoration: "none",
              transition: "0.3s ease",
            }}
          >
            {buttonText}
          </Link>
        </div>

        <div>
          <img
            className="success-image"  
            src={imageSrc}
            alt={imageAlt}
          />
        </div>
      </div>
    </section>
  );

}


export default SuccessCard;