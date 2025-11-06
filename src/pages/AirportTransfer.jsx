import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AirportTransfer() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    pickupType: "",
    pickupLocation: "",
    dropoffLocation: "",
    flightNumber: "",
    airline: "",
    arrivalDate: "",
    arrivalTime: "",
    passengers: "",
    luggageCount: "",
    serviceType: "",
    notes: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/airport-transfer`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) throw new Error("Failed to submit request");

      navigate("/success", {
        state: { name: formData.fullName },
      });

      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        pickupType: "",
        pickupLocation: "",
        dropoffLocation: "",
        flightNumber: "",
        airline: "",
        arrivalDate: "",
        arrivalTime: "",
        passengers: "",
        luggageCount: "",
        serviceType: "",
        notes: "",
      });

    } catch (err) {
      console.error(err);
      toast.error("Error submitting form. Please try again.");
    }
  };

  return (
    <div className="container-xxl" style={{ paddingTop: "150px" }}>
      <div className="container">
        <h1 className="text-start" style={{ fontFamily: "Raleway" }}>
          Airport Transfer Request
        </h1>
        <p>Fill the form below to request airport pickup or drop-off.</p>

        <p className="mt-5" style={{ fontWeight: "bold" }}>PERSONAL INFORMATION</p>
        <hr />

        <form onSubmit={handleSubmit}>
          <div className="personalInformation">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="form-control"
              required
            />

            <label className="form-label mt-3">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-control"
              required
            />

            <label className="form-label mt-3">Whatsapp Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="form-control"
              required
            />

            <p className="mt-5" style={{ fontWeight: "bold" }}>TRANSFER DETAILS</p>
            <hr />

            <label className="form-label mt-3">Pickup Type</label>
            <select
              name="pickupType"
              value={formData.pickupType}
              onChange={handleInputChange}
              className="form-select"
              required
            >
              <option value=""></option>
              <option>Airport Pickup</option>
              <option>Airport Drop-off</option>
              <option>Round Trip</option>
            </select>

            <label className="form-label mt-3">Pickup Location</label>
            <input
              type="text"
              name="pickupLocation"
              value={formData.pickupLocation}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Airport or Address"
              required
            />

            <label className="form-label mt-3">Drop-off Location</label>
            <input
              type="text"
              name="dropoffLocation"
              value={formData.dropoffLocation}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Address or Airport"
              required
            />

            <label className="form-label mt-3">Flight Number</label>
            <input
              type="text"
              name="flightNumber"
              value={formData.flightNumber}
              onChange={handleInputChange}
              className="form-control"
              placeholder="e.g. EK202"
            />

            <label className="form-label mt-3">Airline</label>
            <input
              type="text"
              name="airline"
              value={formData.airline}
              onChange={handleInputChange}
              className="form-control"
              placeholder="e.g. Emirates"
            />

            <label className="form-label mt-3">Arrival Date</label>
            <input
              type="date"
              name="arrivalDate"
              value={formData.arrivalDate}
              onChange={handleInputChange}
              className="form-control"
              required
            />

            <label className="form-label mt-3">Arrival Time</label>
            <input
              type="time"
              name="arrivalTime"
              value={formData.arrivalTime}
              onChange={handleInputChange}
              className="form-control"
              required
            />

            <label className="form-label mt-3">Number of Passengers</label>
            <input
              type="number"
              name="passengers"
              value={formData.passengers}
              onChange={handleInputChange}
              className="form-control"
              min="1"
              required
            />

            <label className="form-label mt-3">Luggage Count</label>
            <input
              type="number"
              name="luggageCount"
              value={formData.luggageCount}
              onChange={handleInputChange}
              className="form-control"
              min="0"
            />

            <label className="form-label mt-3">Service Type</label>
            <select
              name="serviceType"
              value={formData.serviceType}
              onChange={handleInputChange}
              className="form-select"
              required
            >
              <option value=""></option>
              <option>Standard Car</option>
              <option>Luxury Car</option>
              <option>Minivan</option>
              <option>Bus / Group Transfer</option>
            </select>

            <p className="mt-5" style={{ fontWeight: "bold" }}>ADDITIONAL INFORMATION</p>
            <hr />

            <label className="form-label mt-3">Notes / Special Requests</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              className="form-control"
            />

            <button
              type="submit"
              className="btn btn-secondary py-3 px-1 mt-5"
              style={{ fontFamily: "Raleway", fontWeight: "600", width: "170px" }}
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AirportTransfer;
