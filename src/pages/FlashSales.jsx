import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";

function FlashSales() {
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
          Flash Sales
        </h6>
        <h1
          className="mb-5"
          style={{
            fontFamily:
              "'Raleway', system-ui, Avenir, Helvetica, Arial, sans-serif",
          }}
        >
          Exclusive Flash Offers
        </h1>
      </div>

      <Carousel interval={4000} pause={false} className="flash-carousel">
        {/* Slide 1 */}
        <Carousel.Item>
          <a
            href="#"
            className="position-relative d-block overflow-hidden"
            style={{ borderRadius: "8px" }}
          >
            <img
              className="d-block w-100"
              src="assets/img/web flash sale 1.png"
              alt="Flash Sale 1"
            />
            <div
              className="bg-white text-danger fw-bold position-absolute top-0 start-0 m-3 py-1 px-2 flash-title"
              style={{
                borderRadius: "4px",
                fontFamily: "'Raleway', sans-serif",
                fontSize: "14px",
              }}
            >
              Flash Sales
            </div>
          </a>
        </Carousel.Item>

        {/* Slide 2 */}
        <Carousel.Item>
          <a
            href="#"
            className="position-relative d-block overflow-hidden"
            style={{ borderRadius: "8px" }}
          >
            <img
              className="d-block w-100"
              src="assets/img/web flash sale 2.png"
              alt="Flash Sale 2"
            />
            <div
              className="bg-white text-danger fw-bold position-absolute top-0 start-0 m-3 py-1 px-2 flash-title"
              style={{
                borderRadius: "4px",
                fontFamily: "'Raleway', sans-serif",
                fontSize: "14px",
              }}
            >
              Flash Sales
            </div>
          </a>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default FlashSales;
