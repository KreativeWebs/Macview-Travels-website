import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
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
import Destination from "./pages/Destination";
import ManageBookings from "./pages/ManageBookings";
import Team from "./pages/Team";
import Testimonial from "./pages/Testimonial";
import Contact from "./pages/Contact";
import FlightSuccess from "./pages/FlightSuccess.jsx";
import HotelSuccess from "./pages/HotelSuccess.jsx";
import VisaSuccess from "./pages/VisaSuccess.jsx";
import PackageSuccess from "./pages/PackageSuccess.jsx";
import VisaPayment from "./pages/VisaPayment";
import PackageConfirmation from "./pages/PackageConfirmation.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import { useAuthStore } from "./store/authStore";

import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/pages/AdminHome";
import AdminLogin from "./admin/pages/AdminLogin.jsx";
import Clients from "./admin/pages/Clients";
import ClientProfile from "./admin/pages/ClientProfile";
import VisaRequests from "./admin/pages/VisaRequests";
import FlightBookings from "./admin/pages/FlightBookings";
import HotelBookings from "./admin/pages/HotelBookings";
import Transfers from "./admin/pages/Transfers";
import Settings from "./admin/pages/Settings";
import AddNewVisa from "./admin/pages/AddNewVisa.jsx";
import AddNewFlightRequest from "./admin/pages/AddNewFlightRequest.jsx";
import AddNewHotel from "./admin/pages/AddNewHotel.jsx";
import VisaRequirements from "./admin/pages/VisaRequirements.jsx";
import AddNewVisaRequirement from "./admin/pages/AddNewVisaRequirement.jsx";
import AddNewPackage from "./admin/pages/AddNewPackage";
import PackagesManagement from "./admin/pages/PackagesManagement";
import PackageBookings from "./admin/pages/PackageBookings";
import PackageDetails from "./pages/PackageDetails";

function FloatingButtonsController() {
  const location = useLocation();

  useEffect(() => {
    const floatingButtons = document.getElementById('floating-buttons');
    if (floatingButtons) {
      // Show floating buttons only on public website routes (not admin routes)
      const isAdminRoute = location.pathname.startsWith('/admin');
      floatingButtons.style.display = isAdminRoute ? 'none' : 'block';
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



export default function App() {
  return (
    <div>
      <AuthInitializer />
      <FloatingButtonsController />
      <Routes>
        {/* Public Website Layout */}
        <Route
          path="/*"
          element={
            <>
              <Header />
              <Routes>
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
                <Route path="/destination" element={<Destination />} />
                <Route path="/managebookings" element={<ManageBookings />} />
                <Route path="/team" element={<Team />} />
                <Route path="/testimonial" element={<Testimonial />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/flight-success" element={<FlightSuccess />} />
                <Route path="/hotel-success" element={<HotelSuccess />} />
                <Route path="/visa-success" element={<VisaSuccess />} />
                <Route path="/package-success" element={<PackageSuccess />} />
                <Route path="/package-confirmation" element={<PackageConfirmation />} />
                 <Route path="/visa-payment" element={<VisaPayment />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route
                  path="/reset-password/:token"
                  element={<ResetPassword />}
                />
              </Routes>
              <Footer />
            </>
          }
        />

        {/* Admin Login Route (outside admin layout) */}
        <Route path="/adminlogin" element={<AdminLogin />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="clients" element={<Clients />} />

          <Route path="clients/:id" element={<ClientProfile />} />
          <Route path="visa" element={<VisaRequests />} />
          <Route path="visa/addnewvisa" element={<AddNewVisa />} />
          <Route path="flights" element={<FlightBookings />} />
          <Route path="addnewflight" element={<AddNewFlightRequest />} />
           <Route path="hotels" element={<HotelBookings />} />
          <Route path="transfers" element={<Transfers />} />
          <Route path="settings" element={<Settings />} />
          <Route path="visa-requirements" element={<VisaRequirements />} />
          <Route path="add-visa-requirement" element={<AddNewVisaRequirement />} />
          <Route path="edit-visa-requirement/:id" element={<AddNewVisaRequirement />} />
          
          <Route path="addnewhotel" element={<AddNewHotel />} />
          <Route path="packages" element={<PackagesManagement />} />
          <Route path="package-bookings" element={<PackageBookings />} />
          <Route path="addnewpackage" element={<AddNewPackage />} />
        </Route>

      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
}
