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
  const truncateDescription = (desc) => {
    if (desc && desc.length > 200) {
      return desc.substring(0, 200) + '...';
    }
    return desc || '';
  };

  return (
    <>
      <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
        <div
          className="package-item overflow-hidden"
          style={{
            borderRadius: "15px",
            height: "600px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            className="overflow-hidden"
            style={{
              width: "100%", // makes it stretch full width of parent
              height: "250px", // set your preferred fixed height
              overflow: "hidden",
              flexShrink: 0,
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
              <i className="fa fa-map-marker-alt me-2" style={{color: "#175AA1"}}/>
              {packagecity}
            </small>
            <small className="flex-fill text-center border-end py-2">
              <i className="fa fa-calendar-alt me-2" style={{color: "#175AA1"}}/>
              {packagenights}
            </small>
            <small className="flex-fill text-center py-2">
              <i className="fa fa-user me-2" style={{color: "#175AA1"}} />
              {packagepersons}
            </small>
          </div>
          <div className="text-center p-4" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <h3 className="mb-0" style={{ fontFamily: "Raleway" }}>
              {packageprice}
            </h3>

            <h5
              className="mt-4"
              style={{ fontFamily: "Raleway", color: "#175AA1", fontWeight: "800", fontSize: "20px" }}
            >
              {packagetitle}
            </h5>
            <p style={{ fontSize: "14px", lineHeight: "1.4", marginBottom: "15px", flexGrow: 1 }}>
             {truncateDescription(packagedesc)}
            </p>
            <div className="d-flex justify-content-center mb-2">
              <Link
                to={`/package/${packageId}`}
                className="btn btn-sm px-5"
                style={{
                  borderRadius: "12px",
                  fontFamily: "Raleway",
                  fontWeight: "800",
                  outline: "none",
                  border: "none",
                  backgroundColor: "#f1741e",
                  color: "white"
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
