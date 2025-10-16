import React from "react";
import { Link } from "react-router-dom";
import ServicesCard from "./ServicesCard";

function WhatWeOffer() {
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
            Services
          </h6>
          <h1
            className="mb-5"
            style={{
              fontFamily:
                "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif",
            }}
          >
            What We Offer
          </h1>
        </div>

        <div className="row g-4">
          <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
            <ServicesCard
              icon="fa-passport"
              title="Visa Processing"
              description="Simplify your travel plans with our fast and reliable visa processing services for top destinations around the world."
              link="/visaprocessing"
            />
          </div>

          <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
            <ServicesCard
              icon="fa-plane"
              title="Flight Booking"
              description="Book affordable flights to your favorite destinations with ease and flexibility, connecting you to the world, one trip at a time."
              link="/flightbooking"
            />
          </div>

          <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
            <ServicesCard
              icon="fa-bed"
              title="Hotel Booking"
              description="Find and book the perfect stay that matches your comfort,
              style, and budget, from luxury resorts to cozy city hotels."
              link="/hotelbooking"
            />
          </div>

          <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
             <ServicesCard
              icon="fa-graduation-cap"
              title="Study Abroad Programs"
              description="Begin your academic journey overseas with trusted guidance
              on admissions, visas, turning your study dreams into
              reality."
              link="/studyabroadprograms"
            />
          </div>

          <div className="text-center mt-5">
            <Link
              to="/services"
              className="btn btn-secondary py-3 px-5 mt-1"
              style={{
                fontFamily:
                  "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif",
                fontWeight: "600",
                outline: "none",
                border: "none",
                borderRadius: "4px",
              }}
            >
              See More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhatWeOffer;
