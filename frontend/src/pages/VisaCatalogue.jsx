import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";

export default function VisaCatalogue() {
  const visas = [
    {
      img: "assets/img/Qatar.jpeg",
      title: "Qatar Visa",
      desc: "Apply for your Qatar travel visa easily and quickly.",
    },
    {
      img: "assets/img/Kenia - Wikipedia, la enciclopedia libre.jpeg",
      title: "Kenya Visa",
      desc: "Get access to Kenya with our simplified visa service.",
    },
    {
      img: "assets/img/Tanzania.jpeg",
      title: "Tanzania Visa",
      desc: "Secure your travel visa to Tanzania for business or leisure.",
    },
    {
      img: "assets/img/Bandera de Egipto - Wikipedia, la enciclopedia libre.jpeg",
      title: "Egypt Visa",
      desc: "Explore Egypt’s wonders with a fast-tracked visa application.",
    },
    {
      img: "assets/img/National Flag of South Africa.jpeg",
      title: "South Africa Visa",
      desc: "Easy visa processing for your South African adventure.",
    },
    {
      img: "assets/img/Zimbabwe Large Flag.jpeg",
      title: "Zimbabwe Visa",
      desc: "Apply now for a smooth Zimbabwe tourist visa experience.",
    },
    {
      img: "assets/img/Morocco.jpeg",
      title: "Morocco Visa",
      desc: "Travel to Morocco hassle-free with our visa services.",
    },
    {
      img: "assets/img/Indonesia - Wikipedia.jpeg",
      title: "Indonesia Visa",
      desc: "Simplified Indonesia visa application process.",
    },
    // NEXT 8 CARDS
   
        {
      img: "assets/img/Qatar.jpeg",
      title: "Qatar Visa",
      desc: "Apply for your Qatar travel visa easily and quickly.",
    },
    {
      img: "assets/img/Kenia - Wikipedia, la enciclopedia libre.jpeg",
      title: "Kenya Visa",
      desc: "Get access to Kenya with our simplified visa service.",
    },
    {
      img: "assets/img/Tanzania.jpeg",
      title: "Tanzania Visa",
      desc: "Secure your travel visa to Tanzania for business or leisure.",
    },
    {
      img: "assets/img/Bandera de Egipto - Wikipedia, la enciclopedia libre.jpeg",
      title: "Egypt Visa",
      desc: "Explore Egypt’s wonders with a fast-tracked visa application.",
    },
    {
      img: "assets/img/National Flag of South Africa.jpeg",
      title: "South Africa Visa",
      desc: "Easy visa processing for your South African adventure.",
    },
    {
      img: "assets/img/Zimbabwe Large Flag.jpeg",
      title: "Zimbabwe Visa",
      desc: "Apply now for a smooth Zimbabwe tourist visa experience.",
    },
    {
      img: "assets/img/Morocco.jpeg",
      title: "Morocco Visa",
      desc: "Travel to Morocco hassle-free with our visa services.",
    },
    {
      img: "assets/img/Indonesia - Wikipedia.jpeg",
      title: "Indonesia Visa",
      desc: "Simplified Indonesia visa application process.",
    },
  ];

  // Split visas into chunks of 8 for desktop slides
  const chunkArray = (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };
  const desktopSlides = chunkArray(visas, 8);

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h6
            className="section-title bg-white text-center text-primary px-3"
            style={{ fontFamily: "Raleway", color: "#f1741e" }}
          >
            Visas
          </h6>
          <h1 className="mb-5" style={{ fontFamily: "Raleway" }}>
            Visa Catalogue
          </h1>
        </div>

        <div
          className="position-relative p-4"
          style={{
            background: "#ffffff",
            borderRadius: "15px",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Swiper
            modules={[Navigation]}
            spaceBetween={30}
            navigation={{
              prevEl: ".visa-prev",
              nextEl: ".visa-next",
            }}
            breakpoints={{
              0: { slidesPerView: 1 }, // Mobile: 1 card per slide
              768: { slidesPerView: 1 }, // Tablet: 1 card per slide
              1024: { slidesPerView: 1 }, // Desktop: 1 grid slide (8 cards per slide)
            }}
            className="visa-swiper"
          >
            {/* Desktop Slides */}
            {desktopSlides.map((slideVisas, idx) => (
              <SwiperSlide key={idx} className="d-none d-lg-block">
                <div
                  className="d-grid gap-4"
                  style={{
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gridTemplateRows: "repeat(2, auto)",
                  }}
                >
                  {slideVisas.map((visa, index) => (
                    <div
                      key={index}
                      className="p-4 text-center"
                      style={{
                        background: "#fff",
                        borderRadius: "10px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      }}
                    >
                      <div
                        style={{
                          width: "80px",
                          height: "80px",
                          margin: "0 auto 15px",
                          borderRadius: "10px",
                          overflow: "hidden",
                          backgroundColor: "#f7f7f7",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <img
                          src={visa.img}
                          alt={visa.title}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <h5
                        style={{
                          fontFamily: "Raleway",
                          fontWeight: "700",
                          marginBottom: "10px",
                        }}
                      >
                        {visa.title}
                      </h5>
                      <p
                        style={{
                          fontFamily: "Raleway",
                          fontSize: "14px",
                          color: "#555",
                          minHeight: "50px",
                        }}
                      >
                        {visa.desc}
                      </p>
                      <Link
                        to="/visaprocessing"
                        className="btn btn-sm btn-primary px-4"
                        style={{
                          borderRadius: "8px",
                          fontFamily: "Raleway",
                          fontWeight: "700",
                          background: "#f1741e",
                          border: "none",
                        }}
                      >
                        Apply Now
                      </Link>
                    </div>
                  ))}
                </div>
              </SwiperSlide>
            ))}

            {/* Mobile Slides (1 card per slide) */}
            {visas.map((visa, index) => (
              <SwiperSlide key={index} className="d-block d-lg-none">
                <div
                  className="p-4 text-center"
                  style={{
                    background: "#fff",
                    borderRadius: "10px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      margin: "0 auto 15px",
                      borderRadius: "10px",
                      overflow: "hidden",
                      backgroundColor: "#f7f7f7",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={visa.img}
                      alt={visa.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <h5
                    style={{
                      fontFamily: "Raleway",
                      fontWeight: "700",
                      marginBottom: "10px",
                    }}
                  >
                    {visa.title}
                  </h5>
                  <p
                    style={{
                      fontFamily: "Raleway",
                      fontSize: "14px",
                      color: "#555",
                      minHeight: "50px",
                    }}
                  >
                    {visa.desc}
                  </p>
                  <Link
                    to="/visa"
                    className="btn btn-sm btn-primary px-4"
                    style={{
                      borderRadius: "8px",
                      fontFamily: "Raleway",
                      fontWeight: "700",
                      background: "#f1741e",
                      border: "none",
                    }}
                  >
                    Apply Now
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <div
            className="d-none d-lg-flex justify-content-between position-absolute top-50 start-0 end-0 px-3"
            style={{ pointerEvents: "none" }}
          >
            <button className="visa-prev" style={{ pointerEvents: "all" }}>
              <i className="fa fa-chevron-left"></i>
            </button>
            <button className="visa-next" style={{ pointerEvents: "all" }}>
              <i className="fa fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
