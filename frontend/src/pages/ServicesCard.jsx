import React from "react";

function ServicesCard({ icon, title, description, onClick}) {
  return (
    <div>
      <div
        onClick={onClick}
        className="service-item pt-3"
        style={{ border: "1px #dee2e6", borderRadius: "8px", cursor: "pointer", outline: "0.5px solid #e8edf1ff" }}
      >
        <div className="p-4">
          <i className={`fa fa-3x ${icon} mb-4`} style={{color: "#175aa1"}} />
          <h5
            style={{
              fontFamily:
                "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif",
              color: "#175aa1",

            }}
          >
            {title}
          </h5>
          <p style={{ color: "#4e4c4cff" }}>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default ServicesCard;
