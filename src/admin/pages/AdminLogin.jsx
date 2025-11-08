function AdminLogin() {
  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-center px-0 " style={{justifyItem: "center"}}>
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="text-left py-5 px-4 px-sm-5 border mt-5">
                <h4 style={{ fontFamily: "Raleway" }}>Admin Login</h4>
                <h6 style={{ fontFamily: "Raleway", fontWeight: "400" }}>
                  Sign in to access the admin dashboard.
                </h6>
                <form style={{ marginTop: "30px" }}>
                  <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      required
                      style={{
                        borderRadius: "4px",
                        boxShadow: "none",
                        borderColor: "#c9b5b5ff",
                      }}
                    />
                  </div>

                  <div className="mb-3 position-relative">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      required
                      style={{
                        borderRadius: "4px",
                        boxShadow: "none",
                        borderColor: "#c9b5b5ff",
                      }}
                    />
                    <span
                      className="position-absolute end-0 translate-middle-y me-3"
                      style={{ cursor: "pointer", top: "50px" }}
                    >
                      <i className={`"fa-eye-slash"}`}></i>
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
                    style={{
                      backgroundColor: "#f1741e",
                      border: "none",
                      borderRadius: "4px",
                      fontFamily: "'Raleway', sans-serif",
                    }}
                  >
                    Log In
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
