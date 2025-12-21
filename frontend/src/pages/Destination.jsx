import React, { useEffect } from "react";
import { Carousel } from "react-bootstrap";

// Frontend logger helper (can be replaced with Sentry or backend API)
const logWarning = (message, context = {}) => {
  // Optional: send to backend
  fetch("/api/log-client-warning", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, context }),
  }).catch(() => {
    // Silent fail – no console noise in production
  });
};

function Destination() {
  useEffect(() => {
    const carouselEl = document.getElementById("destinationCarousel");

    // Check if the element exists and bootstrap is loaded
    if (carouselEl && window.bootstrap) {
      new window.bootstrap.Carousel(carouselEl, {
        interval: 3000,
        ride: "carousel",
        pause: "hover",
      });
    } else {
      logWarning("Bootstrap carousel not initialized", {
        elementFound: !!carouselEl,
        bootstrapLoaded: !!window.bootstrap,
      });
    }
  }, []);

  return (
    <div
      className="container-xxl py-5 destination"
      style={{ borderRadius: "8px", overflow: "hidden" }}
    >
      <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
        <h6
          className="section-title bg-white text-center text-secondary px-3"
          style={{
            fontFamily:
              "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif",
          }}
        >
          DESTINATIONS
        </h6>
        <h1
          className="mb-5"
          style={{
            fontFamily:
              "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif",
          }}
        >
          Popular Destinations
        </h1>
      </div>

      <Carousel interval={5000} pause={false}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="assets/img/11013.jpg"
            alt="Indonesia"
            style={{
              height: "400px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
          <Carousel.Caption
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100%",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <h1
              className="text-white"
              style={{
                fontFamily: "Raleway",
                fontSize: "clamp(50px, 8vw, 100px)",
                lineHeight: "1.1",
                margin: 0,
              }}
            >
              Indonesia
            </h1>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="assets/img/666.jpg"
            alt="Singapore"
            style={{
              height: "400px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
          <Carousel.Caption
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100%",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <h1
              className="text-white"
              style={{
                fontFamily: "Raleway",
                fontSize: "clamp(50px, 8vw, 100px)",
                lineHeight: "1.1",
                margin: 0,
              }}
            >
              Singapore
            </h1>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="assets/img/17878885.jpg"
            alt="Qatar"
            style={{
              height: "400px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
          <Carousel.Caption
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100%",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <h1
              className="text-white"
              style={{
                fontFamily: "Raleway",
                fontSize: "clamp(50px, 8vw, 100px)",
                lineHeight: "1.1",
                margin: 0,
              }}
            >
              Qatar
            </h1>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="assets/img/10880824.jpg"
            alt="South Africa"
            style={{
              height: "400px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
          <Carousel.Caption
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100%",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <h1
              className="text-white"
              style={{
                fontFamily: "Raleway",
                fontSize: "clamp(40px, 8vw, 100px)",
                lineHeight: "1.1",
                margin: 0,
              }}
            >
              South Africa
            </h1>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Destination;
