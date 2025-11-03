import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import Destination from "./pages/Destination";
import ManageBooking from "./pages/ManageBooking";
import Team from "./pages/Team";
import Testimonial from "./pages/Testimonial";
import Contact from "./pages/Contact";
import FlightSuccess from "./pages/FlightSuccess.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import { useAuthStore } from "./store/authStore";

export default function App() {
  const { fetchUser, fetchingUser } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (fetchingUser) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/visaprocessing" element={<VisaProcessing />} />
        <Route path="/flightbooking" element={<FlightBooking />} />
        <Route path="/hotelbooking" element={<HotelBooking />} />
        <Route path="/studyabroadprograms" element={<StudyAbroad />} />
        <Route path="/destination" element={<Destination />} />
        <Route path="/managebooking" element={<ManageBooking />} />
        <Route path="/team" element={<Team />} />
        <Route path="/testimonial" element={<Testimonial />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/flight-success" element={<FlightSuccess />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/reset-password/:userId/:token"
          element={<ResetPassword />}
        />
      </Routes>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
}
