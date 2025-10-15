function Hero() {
  return (
    <div className="container-fluid bg-primary py-5 mb-5 hero-header">
      <div className="container py-5">
        <div className="row justify-content-center py-5">
          <div className="col-lg-10 pt-lg-5 mt-lg-5 text-center">
            <h1
              className="display-3 fw-light text-white mb-3 animated slideInDown"
              style={{ fontFamily: "'Raleway', system-ui, Avenir" }}
            >
              Discover the World with{" "}
              <span className="fw-bold"> Macview Travels</span>
            </h1>

            <p className="fs-4 text-white mb-4 animated slideInDown">
              Explore breathtaking destinations, curated tours, and
              unforgettable experiences. Your journey begins here!
            </p>
            <div className="position-relative w-75 mx-auto animated slideInDown">
              <input
                className="form-control border-0 rounded-pill w-100 py-3 ps-4 pe-5"
                type="text"
                placeholder="Search destinations (e.g., Bali, Paris, Dubai)"
              />
              <button
                type="button"
                className="btn btn-secondary rounded-pill py-2 px-4 position-absolute top-0 end-0 me-2"
                style={{ marginTop: 7, outline: "none", border: "none" }}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
