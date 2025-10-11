import React from 'react'

function Testimonial() {
  return (
    <div>
      <div className="container-fluid bg-primary py-5 mb-5 hero-header">
        <div className="container py-5">
          <div className="row justify-content-center py-5">
            <div className="col-lg-10 pt-lg-5 mt-lg-5 text-center">
              <h1 className="display-3 text-white animated slideInDown">
                Testimonial
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
                    Testimonial
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {/* Testimonial Start */}
      <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
        <div className="container">
          <div className="text-center">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Testimonial
            </h6>
            <h1 className="mb-5">Our Clients Say!!!</h1>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-3 mb-4">
              <div className="testimonial-item bg-white text-center border p-4">
                <img
                  alt="testimonial 1"
                  className="bg-white rounded-circle shadow p-1 mx-auto mb-3"
                  src="assets/img/testimonial-1.jpg"
                  style={{ width: 80, height: 80 }}
                />
                <h5 className="mb-0">Sarah Johnson</h5>
                <p>London, UK</p>
                <p className="mb-0">
                  "Diamond Travels made our honeymoon in Bali absolutely perfect.
                  Every detail was taken care of, and the guides were fantastic!"
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mb-4">
              <div className="testimonial-item bg-white text-center border p-4">
                <img
                  alt="testimonial 2"
                  className="bg-white rounded-circle shadow p-1 mx-auto mb-3"
                  src="assets/img/testimonial-2.jpg"
                  style={{ width: 80, height: 80 }}
                />
                <h5 className="mb-0">Rajesh Patel</h5>
                <p>Mumbai, India</p>
                <p className="mt-2 mb-0">
                  "Our family trip to Australia was unforgettable. The itinerary
                  was well-planned and the service was top-notch."
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mb-4">
              <div className="testimonial-item bg-white text-center border p-4">
                <img
                  alt="testimonial 3"
                  className="bg-white rounded-circle shadow p-1 mx-auto mb-3"
                  src="assets/img/testimonial-3.jpg"
                  style={{ width: 80, height: 80 }}
                />
                <h5 className="mb-0">Linda Chen</h5>
                <p>Singapore</p>
                <p className="mt-2 mb-0">
                  "Highly recommend Diamond Travels! They helped us organize a
                  corporate retreat in Malaysia and everything went smoothly."
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mb-4">
              <div className="testimonial-item bg-white text-center border p-4">
                <img
                  alt="testimonial 4"
                  className="bg-white rounded-circle shadow p-1 mx-auto mb-3"
                  src="assets/img/testimonial-4.jpg"
                  style={{ width: 80, height: 80 }}
                />
                <h5 className="mb-0">Carlos Rivera</h5>
                <p>Mexico City, Mexico</p>
                <p className="mt-2 mb-0">
                  "The adventure tour in Indonesia was thrilling! Great guides,
                  amazing locations, and excellent value."
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

export default Testimonial
