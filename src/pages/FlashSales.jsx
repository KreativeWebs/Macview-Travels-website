import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import axios from "axios";

function FlashSales() {
  const [flashSales, setFlashSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlashSales = async () => {
      try {
        const response = await userAxios.get("/flash-sales");
        setFlashSales(response.data.flashSales || []);
      } catch (error) {
        console.error("Error fetching flash sales:", error);
        setFlashSales([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashSales();
  }, []);

  if (loading) {
    return (
      <div className="container-xxl py-5 destination text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!flashSales || flashSales.length === 0) {
    return (
      <div className="container-xxl py-5 destination text-center">
        <h6 className="section-title bg-white text-center text-secondary px-3">
          Flash Sales
        </h6>
        <h1 className="mb-5">No Flash Sales Available</h1>
      </div>
    );
  }

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
        {flashSales.map((sale) => (
          <Carousel.Item key={sale._id}>
            <Link
              to={`/flash-sale/${sale._id}`}
              className="position-relative d-block overflow-hidden"
              style={{ borderRadius: "8px" }}
            >
              <img
                className="d-block w-100"
                src={sale.backgroundImage}
                alt={`${sale.destinationCity} Flash Sale`}
              />
              <div
                className="bg-white text-danger fw-bold position-absolute top-0 start-0 m-3 py-1 px-2 flash-title"
                style={{
                  borderRadius: "4px",
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "14px",
                }}
              >
                Flash Sale - ${sale.price}
              </div>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default FlashSales;
