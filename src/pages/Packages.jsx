import React from "react";
import HeroHeader from "./HeroHeader";
import FeaturedPackagesCard from "./FeaturedPackagesCard";
import Process from "./Process";

function Packages() {
  return (
    <div>
      <HeroHeader
        heroheaderbg="assets/img/2151747438.jpg"
        heroheadertitle="Packages"
        pageName="Packages"
        heroheaderdesc="Explore More, Spend Less. Tailored travel experiences designed to give you maximum value."
      />

      {/* Package Start */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6
              className="section-title bg-white text-center text-primary px-3"
              style={{ fontFamily: "Raleway" }}
            >
              Packages
            </h6>
            <h1 className="mb-5" style={{ fontFamily: "Raleway" }}>
              Awesome Packages
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

            <FeaturedPackagesCard
              packagebg="assets/img/Capetown summer.jpeg"
              packagecity="Capetown"
              packagenights={5}
              packagepersons={2}
              packagetitle="Capetown Luxury Package"
              packagedesc=" Cape Town is calling! From beaches to breathtaking views, this
                  summer getaway is your ticket to relaxation, adventure, and
                  endless sunshine."
              packageprice="₦509,999"
            />

            <FeaturedPackagesCard
              packagebg="assets/img/Capetown summer.jpeg"
              packagecity="Capetown"
              packagenights={5}
              packagepersons={2}
              packagetitle="Capetown Luxury Package"
              packagedesc=" Cape Town is calling! From beaches to breathtaking views, this
                  summer getaway is your ticket to relaxation, adventure, and
                  endless sunshine."
              packageprice="₦509,999"
            />
          </div>
        </div>
      </div>
      {/* Package End */}

      <Process />
    </div>
  );
}

export default Packages;
