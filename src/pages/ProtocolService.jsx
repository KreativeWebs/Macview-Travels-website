import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ProtocolService() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    serviceType: "",
    airportName: "",
    airline: "",
    flightNumber: "",
    arrivalDate: "",
    arrivalTime: "",
    departureDate: "",
    departureTime: "",
    passengerCount: "",
    luggageCount: "",
    vipPreference: "",
    notes: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/protocol-service`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error("Failed to submit request");

      navigate("/success", { state: { name: formData.fullName } });

      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        serviceType: "",
        airportName: "",
        airline: "",
        flightNumber: "",
        arrivalDate: "",
        arrivalTime: "",
        departureDate: "",
        departureTime: "",
        passengerCount: "",
        luggageCount: "",
        vipPreference: "",
        notes: "",
      });

    } catch (error) {
      console.error(error);
      toast.error("Error submitting request. Please try again.");
    }
  };

  return (
    <div className="container-xxl" style={{ paddingTop: "150px" }}>
      <div className="container">
        <h1 className="text-start" style={{ fontFamily: "Raleway" }}>
          Airport Protocol Service Request
        </h1>
        <p>Request VIP airport arrival or departure assistance.</p>

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

            <p className="mt-5" style={{ fontWeight: "bold" }}>SERVICE DETAILS</p>
            <hr />

            <label className="form-label mt-3">Service Type</label>
            <select
              name="serviceType"
              value={formData.serviceType}
              onChange={handleInputChange}
              className="form-select"
              required
            >
              <option value=""></option>
              <option value="arrival">Arrival Assistance</option>
              <option value="departure">Departure Assistance</option>
              <option value="full-service">Full VIP Protocol Service</option>
            </select>

            <label className="form-label mt-3">Airport Name</label>
            <input
              type="text"
              name="airportName"
              value={formData.airportName}
              onChange={handleInputChange}
              className="form-control"
              required
            />

            <label className="form-label mt-3">Airline</label>
            <input
              type="text"
              name="airline"
              value={formData.airline}
              onChange={handleInputChange}
              className="form-control"
              required
            />

            <label className="form-label mt-3">Flight Number</label>
            <input
              type="text"
              name="flightNumber"
              value={formData.flightNumber}
              onChange={handleInputChange}
              className="form-control"
              required
            />

            {/* Arrival / Departure Fields */}
            <div className="mt-4">
              <p style={{ fontWeight: "600" }}>Arrival Details</p>

              <label className="form-label mt-2">Arrival Date</label>
              <input
                type="date"
                name="arrivalDate"
                value={formData.arrivalDate}
                onChange={handleInputChange}
                className="form-control"
              />

              <label className="form-label mt-2">Arrival Time</label>
              <input
                type="time"
                name="arrivalTime"
                value={formData.arrivalTime}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>

            <div className="mt-4">
              <p style={{ fontWeight: "600" }}>Departure Details</p>

              <label className="form-label mt-2">Departure Date</label>
              <input
                type="date"
                name="departureDate"
                value={formData.departureDate}
                onChange={handleInputChange}
                className="form-control"
              />

              <label className="form-label mt-2">Departure Time</label>
              <input
                type="time"
                name="departureTime"
                value={formData.departureTime}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>

            <label className="form-label mt-3">Number of Passengers</label>
            <input
              type="number"
              name="passengerCount"
              value={formData.passengerCount}
              onChange={handleInputChange}
              className="form-control"
              required
            />

            <label className="form-label mt-3">Number of Luggage</label>
            <input
              type="number"
              name="luggageCount"
              value={formData.luggageCount}
              onChange={handleInputChange}
              className="form-control"
            />

            <label className="form-label mt-3">VIP Preference</label>
            <select
              name="vipPreference"
              value={formData.vipPreference}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value=""></option>
              <option>Standard Protocol</option>
              <option>Premium VIP Meet & Greet</option>
              <option>Private Fast-Track</option>
              <option>Luxury Pick-up + Escort</option>
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
              style={{
                fontFamily: "Raleway",
                fontWeight: "600",
                border: "none",
                borderRadius: "4px",
                width: "180px",
              }}
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProtocolService;
