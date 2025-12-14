import React from 'react'

function Team() {
  return (
    <div>
      <div className="container-fluid bg-primary py-5 mb-5 hero-header">
        <div className="container py-5">
          <div className="row justify-content-center py-5">
            <div className="col-lg-10 pt-lg-5 mt-lg-5 text-center">
              <h1 className="display-3 text-white animated slideInDown">Guides</h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center">
                  <li className="breadcrumb-item">
                    <a href="/">Home</a>
                  </li>
                  <li className="breadcrumb-item text-white active" aria-current="page">
                    Travel Guides
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {/* Team Start */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Travel Guides
            </h6>
            <h1 className="mb-5">Meet Our Expert Guides</h1>
          </div>
          <div className="row g-4">
            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
              <div className="team-item">
                <div className="overflow-hidden">
                <img className="img-fluid" src="assets/img/20801.jpg" alt="Guide 1" />
                </div>
                <div className="position-relative d-flex justify-content-center" style={{ marginTop: "-19px" }}>
                  <a className="btn btn-square mx-1" href="#"><i className="fab fa-facebook-f" /></a>
                  <a className="btn btn-square mx-1" href="#"><i className="fab fa-twitter" /></a>
                  <a className="btn btn-square mx-1" href="#"><i className="fab fa-instagram" /></a>
                </div>
                <div className="text-center p-4">
                  <h5 className="mb-0">Emily Carter</h5>
                  <small>Asia Specialist</small>
                  <p className="mt-2">Emily has led tours across Thailand, Vietnam, and Indonesia for over 8 years. Her passion is connecting travelers with authentic local experiences.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
              <div className="team-item">
                <div className="overflow-hidden">
                  <img className="img-fluid" src="assets/img/team-1.jpg" alt="Guide 2" />
                </div>
                <div className="position-relative d-flex justify-content-center" style={{ marginTop: "-19px" }}>
                  <a className="btn btn-square mx-1" href="#"><i className="fab fa-facebook-f" /></a>
                  <a className="btn btn-square mx-1" href="#"><i className="fab fa-twitter" /></a>
                  <a className="btn btn-square mx-1" href="#"><i className="fab fa-instagram" /></a>
                </div>
                <div className="text-center p-4">
                  <h5 className="mb-0">Michael Lee</h5>
                  <small>Adventure Expert</small>
                  <p className="mt-2">Michael specializes in adventure travel, from hiking in Australia to diving in Bali. He ensures every trip is safe, exciting, and unforgettable.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
              <div className="team-item">
                <div className="overflow-hidden">
                <img className="img-fluid" src="assets/img/team-2.jpg" alt="Guide 3" />
                </div>
                <div className="position-relative d-flex justify-content-center" style={{ marginTop: "-19px" }}>
                  <a className="btn btn-square mx-1" href="#"><i className="fab fa-facebook-f" /></a>
                  <a className="btn btn-square mx-1" href="#"><i className="fab fa-twitter" /></a>
                  <a className="btn btn-square mx-1" href="#"><i className="fab fa-instagram" /></a>
                </div>
                <div className="text-center p-4">
                  <h5 className="mb-0">Sophia Martinez</h5>
                  <small>Luxury Travel Advisor</small>
                  <p className="mt-2">Sophia crafts luxury escapes and wellness retreats, focusing on comfort and unique experiences in Malaysia and beyond.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
              <div className="team-item">
                <div className="overflow-hidden">
               <img className="img-fluid" src="assets/img/1427.jpg" alt="Guide 4" />
                </div>
                <div className="position-relative d-flex justify-content-center" style={{ marginTop: "-19px" }}>
                  <a className="btn btn-square mx-1" href="#"><i className="fab fa-facebook-f" /></a>
                  <a className="btn btn-square mx-1" href="#"><i className="fab fa-twitter" /></a>
                  <a className="btn btn-square mx-1" href="#"><i className="fab fa-instagram" /></a>
                </div>
                <div className="text-center p-4">
                  <h5 className="mb-0">David Kim</h5>
                  <small>Wildlife Specialist</small>
                  <p className="mt-2">David is passionate about nature and wildlife. He leads eco-tours and safaris, sharing his knowledge of Australia’s and Indonesia’s natural wonders.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Team End */}
    </div>
  )
}

export default Team
