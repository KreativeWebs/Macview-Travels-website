import React from "react";

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

function HotelBookingConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state?.formData;

  useEffect(() => {
    if (!formData) {
      navigate("/hotelbooking");
      return;
    }
  }, [formData, navigate]);

  if (!formData) {
    return null;
  }

  const handleSubmit = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/hotel-bookings`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("Failed to submit hotel request");

      navigate("/hotel-success", { state: { name: formData.fullName } });
    } catch (err) {
      console.error(err);
      toast.error("Error submitting request. Try again.");
    }
  };

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="container-xxl" style={{ paddingTop: "150px" }}>
      <div className="container">
        <h1 className="text-start" style={{ fontFamily: "Raleway" }}>
          Confirm Your Hotel Booking
        </h1>
        <p>Please review your information before submitting.</p>

        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Personal Information</h5>
                <hr />
                <div className="row">
                  <div className="col-md-6">
                    <p><strong>Full Name:</strong> {formData.fullName}</p>
                    <p><strong>Phone Number:</strong> {formData.phoneNumber}</p>
                    <p><strong>Gender:</strong> {formData.gender}</p>
                    <p><strong>Date of Birth:</strong> {formatDate(formData.dob)}</p>
                  </div>
                  <div className="col-md-6">
                    {formData.passportPhotograph && (
                      <div>
                        <p><strong>Passport Photograph:</strong></p>
                        <img
                          src={formData.passportPhotograph.fileUrl}
                          alt="Passport Photograph"
                          style={{ maxWidth: "200px", maxHeight: "200px" }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="card mt-4">
              <div className="card-body">
                <h5 className="card-title">Hotel Details</h5>
                <hr />
                <div className="row">
                  <div className="col-md-6">
                    <p><strong>Destination:</strong> {formData.destination}</p>
                    <p><strong>Check-in Date:</strong> {formatDate(formData.checkInDate)}</p>
                    <p><strong>Check-out Date:</strong> {formatDate(formData.checkOutDate)}</p>
                    <p><strong>Number of Rooms:</strong> {formData.rooms}</p>
                  </div>
                  <div className="col-md-6">
                    <p><strong>Number of Guests:</strong> {formData.guests}</p>
                    <p><strong>Room Type:</strong> {formData.roomType}</p>
                    <p><strong>Preferred Star Rating:</strong> {formData.starRating === "any" ? "Any" : `${formData.starRating} ★`}</p>
                    {formData.budget && <p><strong>Budget per night:</strong> ${formData.budget}</p>}
                  </div>
                </div>
                {formData.amenities && formData.amenities.length > 0 && (
                  <div className="mt-3">
                    <p><strong>Preferred Amenities:</strong></p>
                    <div className="d-flex flex-wrap gap-2">
                      {formData.amenities.map((amenity, index) => (
                        <span key={index} className="badge bg-secondary">{amenity}</span>
                      ))}
                    </div>
                  </div>
                )}
                {formData.purpose && <p><strong>Purpose of Travel:</strong> {formData.purpose}</p>}
                {formData.notes && <p><strong>Special Request:</strong> {formData.notes}</p>}
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Booking Summary</h5>
                <hr />
                <p><strong>Destination:</strong> {formData.destination}</p>
                <p><strong>Check-in:</strong> {formatDate(formData.checkInDate)}</p>
                <p><strong>Check-out:</strong> {formatDate(formData.checkOutDate)}</p>
                <p><strong>Rooms:</strong> {formData.rooms}</p>
                <p><strong>Guests:</strong> {formData.guests}</p>
                <p><strong>Room Type:</strong> {formData.roomType}</p>
              </div>
            </div>

            <div className="mt-4">
              <button
                onClick={() => navigate("/hotelbooking", { state: { formData } })}
                className="btn btn-outline-secondary w-100 mb-2"
              >
                Edit Information
              </button>
              <button
                onClick={handleSubmit}
                className="btn btn-secondary w-100"
              >
                Confirm & Submit Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelBookingConfirmation;
