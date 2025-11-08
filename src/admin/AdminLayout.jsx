import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh", marginTop: "80px" }}>
      {/* Top Navbar */}
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="d-flex flex-grow-1">
        {/* Sidebar under navbar */}
        <Sidebar open={sidebarOpen} />

        {/* Main content */}
        <div className="flex-grow-1 p-3" style={{ background: "#f8f9fa"}}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
