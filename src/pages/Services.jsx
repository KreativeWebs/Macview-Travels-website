import React from 'react'

function Services() {
  return (
    <div>
      {/* Hero Section */}
      <div className="container-fluid bg-primary py-5 mb-5 hero-header">
        <div className="container py-5">
          <div className="row justify-content-center py-5">
            <div className="col-lg-10 pt-lg-5 mt-lg-5 text-center">
              <h1 className="display-3 text-white animated slideInDown">
                Services
              </h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center">
                  <li className="breadcrumb-item">
                    <a href="/">Home</a>
                  </li>
                  <li
                    className="breadcrumb-item text-white active"
                    aria-current="page"
                  >
                    Services
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {/* Service Start */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Services
            </h6>
            <h1 className="mb-5">Our Services</h1>
          </div>
          <div className="row g-4">
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <i className="fa fa-3x fa-globe text-primary mb-4" />
                  <h5>Worldwide Tours</h5>
                  <p>
                    Explore top destinations across the globe with our expertly guided tours, tailored to your interests and travel style.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <i className="fa fa-3x fa-hotel text-primary mb-4" />
                  <h5>Hotel Reservations</h5>
                  <p>
                    Enjoy exclusive rates and seamless bookings at handpicked hotels and resorts for comfort and luxury.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <i className="fa fa-3x fa-user text-primary mb-4" />
                  <h5>Expert Travel Guides</h5>
                  <p>
                    Discover hidden gems and local culture with our experienced travel guides who make every trip unforgettable.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <i className="fa fa-3x fa-cog text-primary mb-4" />
                  <h5>Event & Group Travel</h5>
                  <p>
                    From destination weddings to corporate retreats, we handle all logistics for memorable group events.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Service End */}
      {/* Testimonial Start */}
      <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
        <div className="container">
          <div className="text-center">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Testimonials
            </h6>
            <h1 className="mb-5">Our Clients Say</h1>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-3 mb-4">
              <div className="testimonial-item bg-white text-center border p-4">
                <img
                  className="bg-white rounded-circle shadow p-1 mx-auto mb-3"
                  src="assets/img/testimonial-1.jpg"
                  style={{ width: 80, height: 80 }}
                  alt="Sarah Johnson"
                />
                <h5 className="mb-0">Sarah Johnson</h5>
                <p>London, UK</p>
                <p className="mb-0">
                  "Diamond Travels made our honeymoon in Bali absolutely perfect. Every detail was taken care of, and the guides were fantastic!"
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mb-4">
              <div className="testimonial-item bg-white text-center border p-4">
                <img
                  className="bg-white rounded-circle shadow p-1 mx-auto mb-3"
                  src="assets/img/testimonial-2.jpg"
                  style={{ width: 80, height: 80 }}
                  alt="Rajesh Patel"
                />
                <h5 className="mb-0">Rajesh Patel</h5>
                <p>Mumbai, India</p>
                <p className="mt-2 mb-0">
                  "Our family trip to Australia was unforgettable. The itinerary was well-planned and the service was top-notch."
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mb-4">
              <div className="testimonial-item bg-white text-center border p-4">
                <img
                  className="bg-white rounded-circle shadow p-1 mx-auto mb-3"
                  src="assets/img/testimonial-4.jpg"
                  style={{ width: 80, height: 80 }}
                  alt="Linda Chen"
                />
                <h5 className="mb-0">Linda Chen</h5>
                <p>Singapore</p>
                <p className="mt-2 mb-0">
                  "Highly recommend Diamond Travels! They helped us organize a corporate retreat in Malaysia and everything went smoothly."
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mb-4">
              <div className="testimonial-item bg-white text-center border p-4">
                <img
                  className="bg-white rounded-circle shadow p-1 mx-auto mb-3"
                  src="assets/img/testimonial-3.jpg"
                  style={{ width: 80, height: 80 }}
                  alt="Carlos Rivera"
                />
                <h5 className="mb-0">Carlos Rivera</h5>
                <p>Mexico City, Mexico</p>
                <p className="mt-2 mb-0">
                  "The adventure tour in Indonesia was thrilling! Great guides, amazing locations, and excellent value."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Testimonial End */}
    </div>
  )
}

export default Services