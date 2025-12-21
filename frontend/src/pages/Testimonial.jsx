import React from "react";

const testimonials = [
  {
    img: "assets/img/mrnollywood.jpg",
    name: "Mr David Nollywood",
    location: "Lagos, Nigeria",
    text: "Macview Travels services is No 1. Honestly I appreciate you for your honesty",
  },
  // {
  //   img: "assets/img/testimonial-2.jpg",
  //   name: "Rajesh Patel",
  //   location: "Mumbai, India",
  //   text: "Our family trip to Australia was unforgettable. The itinerary was well-planned and the service was top-notch.",
  // },
  // {
  //   img: "assets/img/testimonial-4.jpg",
  //   name: "Linda Chen",
  //   location: "Singapore",
  //   text: "Highly recommend Macview Travels! They helped us organize a corporate retreat in Malaysia and everything went smoothly.",
  // },
  // {
  //   img: "assets/img/testimonial-3.jpg",
  //   name: "Carlos Rivera",
  //   location: "Mexico City, Mexico",
  //   text: "The adventure tour in Indonesia was thrilling! Great guides, amazing locations, and excellent value.",
  // },
];

function Testimonial() {
  return (
    <div className="py-5 wow fadeInUp" data-wow-delay="0.1s">
      {/* Section Title inside container */}
      <div className="container text-center mb-5">
        <h6
          className="section-title text-primary px-3"
          style={{ fontFamily: "'Raleway', sans-serif", color: "#f1741e" }}
        >
          Testimonials
        </h6>
        <h1 style={{ fontFamily: "'Raleway', sans-serif" }}>
          What Our Clients Say
        </h1>
      </div>

      {/* Full-width marquee */}
      <div
        className="testimonial-marquee"
        style={{
          overflow: "hidden",
          width: "100vw",

        }}
      >
        <div
          className="testimonial-track"
          style={{
            display: "flex",
            width: "max-content",
            animation: "scroll 20s linear infinite",
          }}
        >
          {[...testimonials, ...testimonials].map((t, index) => (
            <div
              key={index}
              className="testimonial-item bg-white text-center border p-4 mx-3"
              style={{
                minWidth: "300px",
                maxWidth: "400px",
                flex: "0 0 auto",
                borderRadius: "8px",
              }}
            >
              <img
                className="bg-white rounded-circle shadow p-1 mx-auto mb-3"
                src={t.img}
                style={{ width: 80, height: 80 }}
                alt={t.name}
              />
              <h5
                className="mb-0"
                style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                {t.name}
              </h5>
              <p>{t.location}</p>
              <p className="mt-2 mb-0">{t.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CSS for scrolling */}
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
    </div>
  );
}

export default Testimonial;
