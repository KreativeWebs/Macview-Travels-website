import { useEffect } from "react";
import io from "socket.io-client";

export default function AdminSocketNotifications() {
  useEffect(() => {
    const socket = io("https://macview-travels-website-production.up.railway.app");

    // New visa request
    socket.on("newVisaRequest", (data) => {
      if (window.electronAPI) {
        window.electronAPI.notify(
          "New Visa Request",
          `User ${data.fullName} submitted a visa request for ${data.destinationCountry}`
        );
      }
    });

    // New flight booking
    socket.on("newFlightBooking", (data) => {
      if (window.electronAPI) {
        window.electronAPI.notify(
          "New Flight Booking",
          `User ${data.fullName} booked a flight to ${data.destinationCity}`
        );
      }
    });

    // New package booking
    socket.on("newPackageBooking", (data) => {
      if (window.electronAPI) {
        window.electronAPI.notify(
          "New Package Booking",
          `User ${data.fullName} booked package: ${data.packageTitle}`
        );
      }
    });

    // New hotel booking
    socket.on("newHotelBooking", (data) => {
      if (window.electronAPI) {
        window.electronAPI.notify(
          "New Hotel Booking",
          `User ${data.fullName} booked hotel in ${data.destination}`
        );
      }
    });

    // New flash sale booking
    socket.on("newFlashSaleBooking", (data) => {
      if (window.electronAPI) {
        const flashSaleTitle = data.flashSaleId ? `${data.flashSaleId.destinationCity} (${data.flashSaleId.airline})` : "Flash Sale";
        window.electronAPI.notify(
          "New Flash Sale Booking",
          `User ${data.name} booked flash sale: ${flashSaleTitle}`
        );
      }
    });

    // Admin login notification
    socket.on("adminLogin", (data) => {
      if (window.electronAPI) {
        window.electronAPI.notify(
          "Admin Login",
          `Admin ${data.adminName} logged into the dashboard`
        );
      }
    });

    return () => socket.disconnect();
  }, []);

  return null;
}
