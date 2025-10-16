import React from "react";

function HeroHeader({ heroheadertitle, heroheaderdesc, pageName, heroheaderbg }) {
  return (
    <div>
      <div
        className="container-fluid bg-primary py-5 mb-5"
        style={{
          background: `linear-gradient(rgba(20, 20, 31, 0.7), rgba(20, 20, 31, 0.83)), url(${heroheaderbg})`,
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="container py-5">
          <div className="row justify-content-center py-5">
            <div className="col-lg-10 pt-lg-5 mt-lg-5 text-center">
              <h1
                className="display-3 text-white animated slideInDown"
                style={{ fontFamily: "Raleway" }}
              >
                {heroheadertitle}
              </h1>
              <p className="text-white animated slideInDown">
                {heroheaderdesc}
              </p>

              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center">
                  <li className="breadcrumb-item">
                    <a href="/" style={{ color: "#f1741e", textDecoration: "none" }}>Home</a>
                  </li>
                  <li
                    className="breadcrumb-item text-white active"
                    aria-current="page"
                  >
                    {pageName}
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroHeader;
