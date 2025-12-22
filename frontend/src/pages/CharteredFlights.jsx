import React from "react";
import { useNavigate } from "react-router-dom";


function CharteredFlight() {
  const navigate = useNavigate();

  return (
    <div className="container-xxl" style={{ paddingTop: "150px" }}>
      <div className="container">
        <div className="row g-4">
          <div
            style={{
              height: "400px",
              width: "100%",
              backgroundImage: `url('assets/img/charteredflight.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
            }}
          ></div>
        </div>
        <div className="row g-4 mt-4">
          <div className="col-12 text-start">
            <h1 style={{ fontFamily: "Raleway" }}>Chartered Flight</h1>
            <p className="mb-3">
              Reach out to our chartered flight team to enjoy seamless chartered flight service.
            </p>
            <a
              href="https://wa.me/+2348063641472"
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{
                backgroundColor: "#f1741e",
                border: "none",
                borderRadius: "10px",
                color: "white",
              }}
            >
              <i className="fab fa-whatsapp me-2"></i>
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharteredFlight;
