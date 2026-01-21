import React, { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useAuthStore } from "./store/authStore";
import PublicLayout from "./components/PublicLayout";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
import Packages from "./pages/Packages";
import VisaProcessing from "./pages/VisaProcessing";
import FlightBooking from "./pages/FlightBooking";
import HotelBooking from "./pages/HotelBooking";
import StudyAbroad from "./pages/StudyAbroad";
import AirportTransfer from "./pages/AirportTransfer.jsx";
import TravelInsurance from "./pages/TravelInsurance.jsx";
import ProtocolService from "./pages/ProtocolService.jsx";
import CharteredFlight from "./pages/CharteredFlights.jsx";
import Destination from "./pages/Destination";
import ManageBookings from "./pages/ManageBookings";
import Team from "./pages/Team";
import Testimonial from "./pages/Testimonial";
import Contact from "./pages/Contact";
import FlightSuccess from "./pages/FlightSuccess.jsx";
import HotelSuccess from "./pages/HotelSuccess.jsx";
import HotelBookingConfirmation from "./pages/HotelBookingConfirmation.jsx";
import VisaSuccess from "./pages/VisaSuccess.jsx";
import PackageSuccess from "./pages/PackageSuccess.jsx";
import VisaPayment from "./pages/VisaPayment";
import VisaManualPayment from "./pages/VisaManualPayment.jsx";
import PackageConfirmation from "./pages/PackageConfirmation.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import TermsAndConditions from "./pages/Terms.jsx";
import FAQ from "./pages/FAQ.jsx";
import Unsubscribe from "./pages/Unsubscribe.jsx";
import FlashSaleSuccess from "./pages/FlashSaleSuccess.jsx";

import PackageDetails from "./pages/PackageDetails";
import FlashSales from "./pages/FlashSales";
import FlashSaleDetails from "./pages/FlashSaleDetails";
import AllBlogs from "./pages/AllBlogs";
import BlogDetails from "./pages/BlogDetails";


function FloatingButtonsController() {
  const location = useLocation();

  useEffect(() => {
    const floatingButtons = document.getElementById("floating-buttons");
    if (floatingButtons) {
      // Show floating buttons only on public website routes (not admin routes)
      const isAdminRoute = location.pathname.startsWith("/admin");
      floatingButtons.style.display = isAdminRoute ? "none" : "block";
    }
  }, [location]);

  return null;
}

function AuthInitializer() {
  const refreshAccessToken = useAuthStore((state) => state.refreshAccessToken);

  useEffect(() => {
    // Silent refresh on app load
    const refresh = async () => {
      await refreshAccessToken();
    };
    refresh();
  }, [refreshAccessToken]);

  return null;
}

function AdminRedirect() {
  useEffect(() => {
    const isDevelopment = window.location.hostname === "localhost";
    const adminUrl = isDevelopment ? "http://localhost:5174" : "https://admin.macviewtravel.com";
    window.location.href = adminUrl;
  }, []);

  return null;
}

function AdminLoginRedirect() {
  useEffect(() => {
    const isDevelopment = window.location.hostname === "localhost";
    const adminUrl = isDevelopment ? "http://localhost:5174/login" : "https://admin.macviewtravel.com/login";
    window.location.href = adminUrl;
  }, []);

  return null;
}

export default function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div>
      <AuthInitializer />
      <FloatingButtonsController />
      <Routes>
        {/* Redirect /admin to subdomain */}
        <Route path="/admin" element={<AdminRedirect />} />
        <Route path="/adminlogin" element={<AdminLoginRedirect />} />

        {/* Public website */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/package/:id" element={<PackageDetails />} />
          <Route path="/visaprocessing" element={<VisaProcessing />} />
          <Route path="/flightbooking" element={<FlightBooking />} />
          <Route path="/hotelbooking" element={<HotelBooking />} />
          <Route path="/studyabroad" element={<StudyAbroad />} />
          <Route path="/airporttransfer" element={<AirportTransfer />} />
          <Route path="/travelinsurance" element={<TravelInsurance />} />
          <Route path="/protocolservice" element={<ProtocolService />} />
          <Route path="/charteredflight" element={<CharteredFlight />} />
          <Route path="/destination" element={<Destination />} />
          <Route path="/managebookings" element={<ManageBookings />} />
          <Route path="/team" element={<Team />} />
          <Route path="/testimonial" element={<Testimonial />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/flight-success" element={<FlightSuccess />} />
          <Route path="/hotel-success" element={<HotelSuccess />} />
          <Route path="/hotel-booking-confirmation" element={<HotelBookingConfirmation />} />
          <Route path="/visa-success" element={<VisaSuccess />} />
          <Route path="/package-success" element={<PackageSuccess />} />
          <Route
            path="/package-confirmation"
            element={<PackageConfirmation />}
          />
          <Route path="/visa-payment" element={<VisaPayment />} />
          <Route path="/visa-manual-payment" element={<VisaManualPayment />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditions />}
          />
          <Route path="/unsubscribe/:email" element={<Unsubscribe />} />

          <Route path="/faq" element={<FAQ />} />
         
          <Route path="/flash-sales" element={<FlashSales />} />
          <Route path="/flash-sale/:id" element={<FlashSaleDetails />} />
          <Route path="/flash-sale-success" element={<FlashSaleSuccess />} />
          <Route path="/blogs" element={<AllBlogs />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
        </Route>


      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />

      {/* Floating Buttons */}
      
    </div>
  );
}
