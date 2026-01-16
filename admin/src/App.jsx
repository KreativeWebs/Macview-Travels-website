import React, { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { useAuthStore } from "./store/authStore.jsx";
import AdminLayout from "../AdminLayout";

// pages
import Dashboard from "../pages/AdminHome";
import AdminLogin from "../pages/AdminLogin";
import Clients from "../pages/Clients";
import ClientProfile from "../pages/ClientProfile";
import VisaRequests from "../pages/VisaRequests";
import FlightBookings from "../pages/FlightBookings";
import HotelBookings from "../pages/HotelBookings";
import Transfers from "../pages/Transfers";
import Settings from "../pages/Settings";
import AddNewVisa from "../pages/AddNewVisa";
import AddNewFlightRequest from "../pages/AddNewFlightRequest";
import AddNewHotel from "../pages/AddNewHotel";
import VisaRequirements from "../pages/VisaRequirements";
import AddNewVisaRequirement from "../pages/AddNewVisaRequirement";
import AddNewPackage from "../pages/AddNewPackage";
import PackagesManagement from "../pages/PackagesManagement";
import AddNewFlashSale from "../pages/AddNewFlashSale";
import FlashSalesManagement from "../pages/FlashSalesManagement";
import FlashSalesList from "../pages/FlashSalesList";
import AddNewFlashSaleBooking from "../pages/AddNewFlashSaleBooking";
import AddNewPackageBooking from "../pages/AddNewPackageBooking";
import PackageBookings from "../pages/PackageBookings";
import AdminCreateNewsletter from "../pages/AdminCreateNewsletter";
import AdminNewsletterSubscribers from "../pages/AdminNewsletterSubscribers";
import Users from "../pages/Users";
import CreateBlog from "../pages/CreateBlog";
import AllBlogs from "../pages/AllBlogs";
import BlogComments from "../pages/BlogComments";

import AdminSocketNotifications from "./components/AdminSocketNotifications";

function AuthInitializer() {
  const refreshAccessToken = useAuthStore((state) => state.refreshAccessToken);

  useEffect(() => {
    refreshAccessToken();
  }, [refreshAccessToken]);

  return null;
}

export default function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <AuthInitializer />

      <Routes>
        {/* Redirect /admin to / */}
        <Route path="/admin" element={<Navigate to="/" replace />} />

        {/* Login */}
        <Route path="/login" element={<AdminLogin />} />

        {/* Protected admin */}
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="clients" element={<Clients />} />
          <Route path="clients/:id" element={<ClientProfile />} />
          <Route path="visa" element={<VisaRequests />} />
          <Route path="visa/add" element={<AddNewVisa />} />
          <Route path="flights" element={<FlightBookings />} />
          <Route path="flights/add" element={<AddNewFlightRequest />} />
          <Route path="hotels" element={<HotelBookings />} />
          <Route path="hotels/add" element={<AddNewHotel />} />
          <Route path="transfers" element={<Transfers />} />
          <Route path="settings" element={<Settings />} />
          <Route path="visa-requirements" element={<VisaRequirements />} />
          <Route path="visa-requirements/add" element={<AddNewVisaRequirement />} />
          <Route path="visa-requirements/edit/:id" element={<AddNewVisaRequirement />} />
          <Route path="packages" element={<PackagesManagement />} />
          <Route path="packages/add" element={<AddNewPackage />} />
          <Route path="packages/edit/:id" element={<AddNewPackage />} />
          <Route path="package-bookings" element={<PackageBookings />} />
          <Route path="package-bookings/add" element={<AddNewPackageBooking />} />
          <Route path="flash-sales" element={<FlashSalesList />} />
          <Route path="flash-sales/add" element={<AddNewFlashSale />} />
          <Route path="flash-sales/add-booking" element={<AddNewFlashSaleBooking />} />
          <Route path="flash-sales/edit/:id" element={<AddNewFlashSale />} />
          <Route path="flash-sales-bookings" element={<FlashSalesManagement />} />
          <Route path="newsletter/create" element={<AdminCreateNewsletter />} />
          <Route path="newsletter/subscribers" element={<AdminNewsletterSubscribers />} />
          <Route path="users" element={<Users />} />
          <Route path="blogs" element={<AllBlogs />} />
          <Route path="blogs/create" element={<CreateBlog />} />
          <Route path="blogs/create/:id" element={<CreateBlog />} />
          <Route path="blogs/comments" element={<BlogComments />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <AdminSocketNotifications />

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
