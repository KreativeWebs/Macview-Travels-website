import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

function FeaturedHotels() {
  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h6
            className="section-title bg-white text-center text-primary px-3"
            style={{ fontFamily: "Raleway", color: "#f1741e" }}
          >
            Hotels
          </h6>
          <h1 className="mb-5" style={{ fontFamily: "Raleway" }}>
            Featured Hotels
          </h1>
        </div>

        <div className="swiper-wrapper-container position-relative">
          <Swiper
            modules={[Navigation]}
            spaceBetween={30}
            slidesPerView={3}
            navigation={{
              prevEl: ".custom-prev",
              nextEl: ".custom-next",
            }}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1400: { slidesPerView: 4 },
            }}
            className="mySwiper"
            style={{ paddingBottom: "50px" }}
          >
            {/* Slide 1 */}
            <SwiperSlide>
              <div
                className="package-item overflow-hidden position-relative"
                style={{ borderRadius: "15px", height: "400px" }}
              >
                {/* Image */}
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src="assets/img/Mövenpick Hotel West Bay Doha.jpeg"
                    alt="Qatar"
                    className="img-fluid"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>

                <div
                  className="position-absolute top-50 start-50 translate-middle text-center text-white"
                  style={{ zIndex: 2 }}
                >
                  <h1
                    style={{
                      fontFamily: "Raleway",
                      fontWeight: "700",
                      color: "#ffffff",
                    }}
                  >
                    Qatar
                  </h1>
                  <div className="d-flex justify-content-center mb-2">
                    <Link
                      to="/booking"
                      className="btn btn-sm btn-secondary px-5"
                      style={{
                        borderRadius: "12px",
                        fontFamily: "Raleway",
                        fontWeight: "800",
                        outline: "none",
                        border: "none",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            {/* Slide 2 */}
            <SwiperSlide>
              {" "}
              <div
                className="package-item overflow-hidden position-relative"
                style={{ borderRadius: "15px", height: "400px" }}
              >
                {/* Image */}
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src="assets/img/download (71).jpeg"
                    alt="Tanzania"
                    className="img-fluid"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>

                <div
                  className="position-absolute top-0 start-0 w-100 h-100"
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    borderRadius: "15px",
                    zIndex: 1,
                  }}
                ></div>

                <div
                  className="position-absolute top-50 start-50 translate-middle text-center text-white"
                  style={{ zIndex: 2 }}
                >
                  <h1
                    style={{
                      fontFamily: "Raleway",
                      fontWeight: "700",
                      color: "#ffffff",
                    }}
                  >
                    Tanzania
                  </h1>
                  <div className="d-flex justify-content-center mb-2">
                    <Link
                      to="/booking"
                      className="btn btn-sm btn-secondary px-5"
                      style={{
                        borderRadius: "12px",
                        fontFamily: "Raleway",
                        fontWeight: "800",
                        outline: "none",
                        border: "none",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            {/* Slide 3 */}
            <SwiperSlide>
              <div
                className="package-item overflow-hidden position-relative"
                style={{ borderRadius: "15px", height: "400px" }}
              >
                {/* Image */}
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src="assets/img/Villa Rosa Kempinski 5 Star Hotel Nairobi.jpeg"
                    alt="Kenya"
                    className="img-fluid"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>

                <div
                  className="position-absolute top-0 start-0 w-100 h-100"
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    borderRadius: "15px",
                    zIndex: 1,
                  }}
                ></div>

                <div
                  className="position-absolute top-50 start-50 translate-middle text-center text-white"
                  style={{ zIndex: 2 }}
                >
                  <h1
                    style={{
                      fontFamily: "Raleway",
                      fontWeight: "700",
                      color: "#ffffff",
                    }}
                  >
                    Kenya
                  </h1>
                  <div className="d-flex justify-content-center mb-2">
                    <Link
                      to="/booking"
                      className="btn btn-sm btn-secondary px-5"
                      style={{
                        borderRadius: "12px",
                        fontFamily: "Raleway",
                        fontWeight: "800",
                        outline: "none",
                        border: "none",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            {/* Slide 3 */}
            <SwiperSlide>
              <div
                className="package-item overflow-hidden position-relative"
                style={{ borderRadius: "15px", height: "400px" }}
              >
                {/* Image */}
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src="assets/img/Eko Hotels.jpeg"
                    alt="Lagos"
                    className="img-fluid"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>

                <div
                  className="position-absolute top-0 start-0 w-100 h-100"
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    borderRadius: "15px",
                    zIndex: 1,
                  }}
                ></div>

                <div
                  className="position-absolute top-50 start-50 translate-middle text-center text-white"
                  style={{ zIndex: 2 }}
                >
                  <h1
                    style={{
                      fontFamily: "Raleway",
                      fontWeight: "700",
                      color: "#ffffff",
                    }}
                  >
                    Lagos
                  </h1>
                  <div className="d-flex justify-content-center mb-2">
                    <Link
                      to="/booking"
                      className="btn btn-sm btn-secondary px-5"
                      style={{
                        borderRadius: "12px",
                        fontFamily: "Raleway",
                        fontWeight: "800",
                        outline: "none",
                        border: "none",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            {/* Slide 3 */}
            <SwiperSlide>
              <div
                className="package-item overflow-hidden position-relative"
                style={{ borderRadius: "15px", height: "400px" }}
              >
                {/* Image */}
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src="assets/img/Mövenpick Hotel West Bay Doha.jpeg"
                    alt="Qatar"
                    className="img-fluid"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>

                <div
                  className="position-absolute top-50 start-50 translate-middle text-center text-white"
                  style={{ zIndex: 2 }}
                >
                  <h1
                    style={{
                      fontFamily: "Raleway",
                      fontWeight: "700",
                      color: "#ffffff",
                    }}
                  >
                    Qatar
                  </h1>
                  <div className="d-flex justify-content-center mb-2">
                    <Link
                      to="/booking"
                      className="btn btn-sm btn-secondary px-5"
                      style={{
                        borderRadius: "12px",
                        fontFamily: "Raleway",
                        fontWeight: "800",
                        outline: "none",
                        border: "none",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            {/* Slide 3 */}
            <SwiperSlide>
              <div
                className="package-item overflow-hidden position-relative"
                style={{ borderRadius: "15px", height: "400px" }}
              >
                {/* Image */}
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src="assets/img/Mövenpick Hotel West Bay Doha.jpeg"
                    alt="Qatar"
                    className="img-fluid"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>

                <div
                  className="position-absolute top-50 start-50 translate-middle text-center text-white"
                  style={{ zIndex: 2 }}
                >
                  <h1
                    style={{
                      fontFamily: "Raleway",
                      fontWeight: "700",
                      color: "#ffffff",
                    }}
                  >
                    Qatar
                  </h1>
                  <div className="d-flex justify-content-center mb-2">
                    <Link
                      to="/booking"
                      className="btn btn-sm btn-secondary px-5"
                      style={{
                        borderRadius: "12px",
                        fontFamily: "Raleway",
                        fontWeight: "800",
                        outline: "none",
                        border: "none",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            {/* Add more slides here */}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <div className="d-none d-lg-flex justify-content-between position-absolute top-50 start-0 end-0 px-3">
            <button className="custom-prev">
              <i className="fa fa-chevron-left"></i>
            </button>
            <button className="custom-next">
              <i className="fa fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturedHotels;
