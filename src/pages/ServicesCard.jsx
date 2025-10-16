import React from "react";
import { Link } from "react-router-dom";

function ServicesCard({ icon, title, description, link }) {
  return (
    <div>
      <Link to={`${link}`}>
        <div
          className="service-item pt-3"
          style={{ border: "1px #dee2e6", borderRadius: "8px" }}
        >
          <div className="p-4">
            <i className={`fa fa-3x ${icon} text-secondary mb-4`}/>
            <h5
              style={{
                fontFamily:
                  "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif",
                color: "#175aa1",
              }}
            >
             {title}
            </h5>
            <p style={{ color: "#4e4c4cff" }}>
              {description}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ServicesCard;
