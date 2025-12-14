import React, { useState, useEffect } from "react";
import HeroHeader from "./HeroHeader";
import FeaturedPackagesCard from "./FeaturedPackagesCard";
import Process from "./Process";
import { getPackages } from "../api/packages";

function Packages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await getPackages();
        setPackages(data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  if (loading) {
    return (
      <div>
        <HeroHeader
          heroheaderbg="assets/img/2151747438.jpg"
          heroheadertitle="Packages"
          pageName="Packages"
          heroheaderdesc="Explore More, Spend Less. Tailored travel experiences designed to give you maximum value."
        />
        <div className="container-xxl py-5">
          <div className="container">
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            {packages.length > 0 ? (
              packages.map((pkg) => (
                <FeaturedPackagesCard
                  key={pkg._id}
                  packagebg={pkg.backgroundImage}
                  packagecity={pkg.city}
                  packagenights={`${pkg.nights} Nights`}
                  packagepersons={`${pkg.persons} Persons`}
                  packagetitle={pkg.title}
                  packagedesc={pkg.description}
                  packageprice={`${pkg.currency === "NGN" ? "₦" : "$"}${pkg.price.toLocaleString()}`}
                  packageId={pkg._id}
                />
              ))
            ) : (
              <div className="col-12 text-center">
                <p>No packages available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Package End */}

      <Process />
    </div>
  );
}

export default Packages;
