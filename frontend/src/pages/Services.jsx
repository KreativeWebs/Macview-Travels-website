import React from "react";
import { useNavigate } from "react-router-dom";
import HeroHeader from "./HeroHeader";
import ServicesCard from "./ServicesCard";
import { useAuthStore } from "../store/authStore";
import { toast } from "react-toastify";


function Services() {
  const navigate = useNavigate();
  const { accessToken } = useAuthStore(); // get token from memory

  const isLoggedIn = () => {
    return !!accessToken; // check in-memory token
  };

  const handleServiceClick = (link) => {
    if (!isLoggedIn()) {
      toast.info("Please log in to access this service");
      return;
    }
    navigate(link);
  };

  return (
    <div>
      <HeroHeader
        heroheaderbg="assets/img/heroheaderbg1.jpg"
        heroheadertitle="Our Services"
        heroheaderdesc="Reliable travel solutions designed to make every journey smooth, safe, and unforgettable."
        pageName="Services"
      />

      {/* Service Start */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s"></div>
          <div className="row g-4">
            <div
              className="col-lg-3 col-sm-6 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <ServicesCard
                icon="fa-passport"
                title="Visa Processing"
                description="Simplify your travel plans with our fast and reliable visa processing services for top destinations around the world."
                onClick={() => handleServiceClick("/visaprocessing")}
              />
            </div>

            <div
              className="col-lg-3 col-sm-6 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <ServicesCard
                icon="fa-plane"
                title="Flight Booking"
                description="Book affordable flights to your favorite destinations with ease and flexibility, connecting you to the world, one trip at a time."
                onClick={() => handleServiceClick("/flightbooking")}
              />
            </div>

            <div
              className="col-lg-3 col-sm-6 wow fadeInUp"
              data-wow-delay="0.5s"
            >
              <ServicesCard
                icon="fa-bed"
                title="Hotel Booking"
                description="Find and book the perfect stay that matches your comfort, style, and budget, from luxury resorts to cozy city hotels."
                onClick={() => handleServiceClick("/hotelbooking")}
              />
            </div>

            <div
              className="col-lg-3 col-sm-6 wow fadeInUp"
              data-wow-delay="0.7s"
            >
              <ServicesCard
                icon="fa-graduation-cap"
                title="Study Abroad Programs"
                description="Begin your academic journey overseas with trusted guidance on admissions, visas, turning your study dreams into reality."
                onClick={() => handleServiceClick("/studyabroad")}
              />
            </div>

            <div
              className="col-lg-3 col-sm-6 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <ServicesCard
                icon="fa-taxi"
                title="Airport Transfers"
                description="Arrive and depart in style with our private airport transfer service offering comfort, convenience, and class."
                onClick={() => handleServiceClick("/airporttransfer")}
              />
            </div>

            <div
              className="col-lg-3 col-sm-6 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <ServicesCard
                icon="fa-shield-alt"
                title="Travel Insurance"
                description="Your safety matters. Our travel insurance keeps you covered every step of your journey, anywhere in the world."
                onClick={() => handleServiceClick("/travelinsurance")}
              />
            </div>

            <div
              className="col-lg-3 col-sm-6 wow fadeInUp"
              data-wow-delay="0.5s"
            >
              <ServicesCard
                icon="fa-user"
                title="Protocol Service"
                description="Enjoy seamless airport experiences with our exclusive protocol service and VIP handling from arrival to departure."
                onClick={() => handleServiceClick("/protocolservice")}
              />
            </div>

            <div
              className="col-lg-3 col-sm-6 wow fadeInUp"
              data-wow-delay="0.7s"
            >
              <ServicesCard
                icon="fa-plane"
                title="Charted Flights"
                description="Experience exclusive air travel with personalized chartered flights, offering comfort, and privacy tailored to your schedule."
                onClick={() => handleServiceClick("/chartedflights")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
