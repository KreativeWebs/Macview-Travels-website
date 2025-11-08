import SearchBox from "./SearchBox";

export default function Header({ toggleSidebar }) {
  return (
    <header
      className="bg-white p-3 d-flex justify-content-between align-items-center"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        boxShadow: "0 5px 30px rgba(0, 0, 0, 0.05)",
      }}
    >
      <div className="d-flex align-items-center gap-3">
        <img
          src="/assets\img\logo macview.png"
          alt="Logo Macview"
          style={{ width: "80px", marginLeft: "30px" }}
        />
        <button
          className="btn btn-sm no-focus border-0 bg-transparent"
          onClick={toggleSidebar}
          style={{
            fontSize: "22px",
            marginLeft: "50px",
          }}
          tabIndex="-1"
        >
          <i className="fa-solid fa-bars"></i>
        </button>

        <h5 className="mb-0 fw-bold" style={{ fontFamily: "Raleway" }}>
          Admin Dashboard
        </h5>
      </div>

      <div className="d-flex align-items-center gap-3">
        <SearchBox />
        <div className="small">
          Hello, <strong>Admin</strong>
        </div>
        <div
          className="rounded-circle bg-secondary bg-opacity-50"
          style={{ width: "40px", height: "40px" }}
        ></div>
      </div>
    </header>
  );
}
