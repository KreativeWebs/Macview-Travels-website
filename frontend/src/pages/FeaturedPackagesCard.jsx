import React from "react";
import { Link } from "react-router-dom";

function FeaturedPackagesCard({
  packagebg,
  packagecity,
  packagenights,
  packagepersons,
  packageprice,
  packagetitle,
  packagedesc,
  packageId,
})

{
  return (
    <>
      <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
        <div
          className="package-item overflow-hidden"
          style={{
            borderRadius: "15px",
            height: "600px",
          }}
        >
          <div
            className="overflow-hidden"
            style={{
              width: "100%", // makes it stretch full width of parent
              height: "250px", // set your preferred fixed height
              overflow: "hidden",
            }}
          >
            <img
                  className="img-fluid overflow-hidden"
                  src={packagebg}
                  alt="Thailand Explorer"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                 />
          </div>
          <div className="d-flex border-bottom">
            <small className="flex-fill text-center border-end py-2">
              <i className="fa fa-map-marker-alt text-secondary me-2" />
              {packagecity}
            </small>
            <small className="flex-fill text-center border-end py-2">
              <i className="fa fa-calendar-alt text-secondary me-2" />
              {packagenights}
            </small>
            <small className="flex-fill text-center py-2">
              <i className="fa fa-user text-secondary me-2" />
              {packagepersons}
            </small>
          </div>
          <div className="text-center p-4">
            <h3 className="mb-0" style={{ fontFamily: "Raleway" }}>
              {packageprice}
            </h3>

            <h5
              className="mt-4"
              style={{ fontFamily: "Raleway", color: "#175AA1" }}
            >
              {packagetitle}
            </h5>
            <p>
             {packagedesc}
            </p>
            <div className="d-flex justify-content-center mb-2">
              <Link
                to={`/package/${packageId}`}
                className="btn btn-sm btn-secondary px-5"
                style={{
                  borderRadius: "12px",
                  fontFamily: "Raleway",
                  fontWeight: "800",
                  outline: "none",
                  border: "none",
                }}
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FeaturedPackagesCard;
