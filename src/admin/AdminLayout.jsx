import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AdminLayout() {
  return (
    <div className="container-fluid p-0">
      <div className="row g-0">
        
        {/* Sidebar */}
        <div className="col-auto">
          <Sidebar />
        </div>

        {/* Main content */}
        <div className="col">
          <Header />

          <main className="p-4">
            <Outlet />
          </main>
        </div>

      </div>
    </div>
  );
}
