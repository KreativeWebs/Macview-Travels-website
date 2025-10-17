import React from "react";
import { Link } from "react-router-dom";
import FeaturedPackagesCard from "./FeaturedPackagesCard";

function FeaturedPackages() {
  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h6
            className="section-title bg-white text-center text-primary px-3"
            style={{
              fontFamily:
                "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif",
            }}
          >
            Packages
          </h6>
          <h1
            className="mb-5"
            style={{
              fontFamily:
                "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif",
            }}
          >
            Featured Packages
          </h1>
        </div>
        <div className="row g-4 justify-content-center">
          <FeaturedPackagesCard
            packagebg="assets/img/Capetown summer.jpeg"
            packagecity="Capetown"
            packagenights="5 Nights"
            packagepersons="2 Persons"
            packagetitle="Capetown Luxury Package"
            packagedesc=" Cape Town is calling! From beaches to breathtaking views, this
                  summer getaway is your ticket to relaxation, adventure, and
                  endless sunshine."
            packageprice="₦509,999"
          />

          <FeaturedPackagesCard
            packagebg="assets\img\Lagos bridge.jpeg"
            packagecity="Lagos"
            packagenights="1 Day"
            packagepersons="1 Person"
            packagetitle=" One Day Lagos City Tour"
            packagedesc=" Discover the heartbeat of Nigeria in just one day! Experience
                  the perfect mix of culture, art, food, and city life that
                  makes Lagos unforgettable."
            packageprice=" $150.00"
          />

          <FeaturedPackagesCard
            packagebg="assets\img\Así es el Banana Island Resort, el alojamiento de lujo en una isla en Doha.jpeg"
            packagecity="Qatar"
            packagenights="5 Nights"
            packagepersons="1 Person"
            packagetitle="Banana Island Luxury Package"
            packagedesc=" Escape to Banana Island, Qatar’s hidden paradise of luxury and
                  tranquility. Indulge in five-star comfort, stunning ocean
                  views, private beaches, and world-class dining."
            packageprice="₦6,800,000"
          />

          <Link
            to="/packages"
            className="btn btn-secondary py-3 px-1 mt-5"
            style={{
              fontFamily:
                "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif",
              fontWeight: "600",
              outline: "none",
              border: "none",
              borderRadius: "4px",
              width: "170px",
              marginTop: "10px"
            }}
          >
            See More
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FeaturedPackages;
