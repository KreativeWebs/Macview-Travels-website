import SearchBox from "./components.jsx/SearchBox";

export default function Header() {
  return (
    <header className="bg-white p-3 shadow d-flex justify-content-between align-items-center border-bottom">
      <h1 className="h5 mb-0 fw-semibold">Admin Dashboard</h1>

      <div className="d-flex align-items-center gap-3">
        {/* Search bar */}
        <SearchBox />

        <div className="small">
          Hello, <strong>Admin</strong>
        </div>

        {/* User avatar placeholder */}
        <div
          className="rounded-circle bg-secondary bg-opacity-50"
          style={{ width: "40px", height: "40px" }}
        ></div>
      </div>
    </header>
  );
}
