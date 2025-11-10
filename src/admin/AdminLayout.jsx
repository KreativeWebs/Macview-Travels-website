import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import socket from "../socket";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, fetchUser, fetchingUser } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is authenticated
    const checkAuth = async () => {
      if (!user && !fetchingUser) {
        await fetchUser();
      }
    };

    checkAuth();

    // Initialize socket connection for real-time updates
    socket.on('connect', () => {
      console.log('Admin connected to real-time updates');
    });

    socket.on('disconnect', () => {
      console.log('Admin disconnected from real-time updates');
    });

    // Listen for global refresh events
    socket.on('globalRefresh', () => {
      console.log('Global refresh triggered');
      window.location.reload();
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('globalRefresh');
    };
  }, []); // Only run once on mount

  useEffect(() => {
    // Redirect to login if not authenticated or not admin
    if (!fetchingUser && (!user || user.role !== 'admin')) {
      navigate('/adminlogin');
    }
  }, [user, fetchingUser, navigate]);

  // Don't render if not authenticated or still fetching
  if (fetchingUser || !user || user.role !== 'admin') {
    return null;
  }

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
