import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FeaturedPackagesCard from "./FeaturedPackagesCard";
import { getPackages } from "../api/packages";

function FeaturedPackages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await getPackages();
        // Limit to 3 packages for featured section
        setPackages(data.slice(0, 3));
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
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
        <div className="text-center mt-4">
          <Link
            to="/packages"
            className="btn btn-secondary py-3 px-1"
            style={{
              fontFamily:
                "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif",
              fontWeight: "600",
              outline: "none",
              border: "none",
              borderRadius: "4px",
              width: "170px"
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
