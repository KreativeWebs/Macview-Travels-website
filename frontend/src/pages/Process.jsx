function Process(){
return (
    
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center pb-4 wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3" style={{fontFamily: "Raleway", color: "#f1741e"}}>
              Process
            </h6>
            <h1 className="mb-5" style={{fontFamily: "Raleway"}}>How It Works</h1>
          </div>
          <div className="row gy-5 gx-4 justify-content-center">
            <div
              className="col-lg-4 col-sm-6 text-center pt-4 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <div className="position-relative border pt-5 pb-4 px-4">
                <div
                  className="d-inline-flex align-items-center justify-content-center  rounded-circle position-absolute top-0 start-50 translate-middle shadow"
                  style={{ width: 100, height: 100, backgroundColor: "#f1741e" }}
                >
                  <i className="fa fa-globe fa-3x text-white" />
                </div>
                <h5 className="mt-4" style={{fontFamily: "Raleway"}}>Choose Your Travel Needs</h5>
                <p className="mb-0">
                  Browse our curated packages and select the destination or travel needs that
                  excites you most. 
                </p>
              </div>
            </div>
            <div
              className="col-lg-4 col-sm-6 text-center pt-4 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <div className="position-relative border  pt-5 pb-4 px-4">
                <div
                  className="d-inline-flex align-items-center justify-content-center rounded-circle position-absolute top-0 start-50 translate-middle shadow"
                  style={{ width: 100, height: 100, backgroundColor: "#f1741e" }}
                >
                  <i className="fa fa-dollar-sign fa-3x text-white" />
                </div>
                <h5 className="mt-4" style={{fontFamily: "Raleway"}}>Book & Pay Securely</h5>
                <p className="mb-0">
                  Fill out the booking form and pay online with our secure payment
                  system. Our team will confirm your booking and send you all
                  the details.
                </p>
              </div>
            </div>
            <div
              className="col-lg-4 col-sm-6 text-center pt-4 wow fadeInUp"
              data-wow-delay="0.5s"
            >
              <div className="position-relative border pt-5 pb-4 px-4">
                <div
                  className="d-inline-flex align-items-center justify-content-center rounded-circle position-absolute top-0 start-50 translate-middle shadow"
                  style={{ width: 100, height: 100, backgroundColor: "#f1741e" }}
                >
                  <i className="fa fa-plane fa-3x text-white" />
                </div>
                <h5 className="mt-4" style={{fontFamily: "Raleway"}}>Travel & Enjoy</h5>
                <p className="mb-0">
                  Your booking gets processed and then you receive a confirmation. Then you pack your bags and get ready for an amazing experience! 
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
   
)
}

export default Process;