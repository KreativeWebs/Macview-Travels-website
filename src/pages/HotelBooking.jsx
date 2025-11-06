import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function HotelBooking() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    dob: "",
    destination: "",
    checkInDate: "",
    checkOutDate: "",
    rooms: "",
    guests: "",
    roomType: "",
    starRating: "any", // new field
    amenities: [],     // new field (array of strings)
    budget: "",
    purpose: "",
    notes: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // handle amenities checkbox array
    if (name === "amenities") {
      setFormData((prev) => {
        const existing = new Set(prev.amenities);
        if (checked) existing.add(value);
        else existing.delete(value);
        return { ...prev, amenities: Array.from(existing) };
      });
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { ...formData };

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/hotel-bookings`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error("Failed to submit hotel request");

      navigate("/hotel-success", { state: { name: formData.fullName } });

      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        gender: "",
        dob: "",
        destination: "",
        checkInDate: "",
        checkOutDate: "",
        rooms: "",
        guests: "",
        roomType: "",
        starRating: "any",
        amenities: [],
        budget: "",
        purpose: "",
        notes: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Error submitting request. Try again.");
    }
  };

  return (
    <div className="container-xxl" style={{ paddingTop: "150px" }}>
      <div className="container">
        <h1 className="text-start" style={{ fontFamily: "Raleway" }}>
          Book Your Hotel Stay
        </h1>
        <p>Fill in your details and we will secure the best hotel options for you.</p>

        <form onSubmit={handleSubmit}>
          <p className="mt-5 fw-bold">PERSONAL INFORMATION</p>
          <hr />

          <label className="form-label">Full Name</label>
          <input
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
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="form-control"
            required
          />

          <label className="form-label mt-3">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="form-select"
            required
          >
            <option value=""></option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="prefer_not_to_say">Prefer not to say</option>
          </select>

          <label className="form-label mt-3">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
            className="form-control"
            required
          />

          <p className="mt-5 fw-bold">HOTEL DETAILS</p>
          <hr />

          <label className="form-label mt-3">Destination</label>
          <input
            name="destination"
            value={formData.destination}
            onChange={handleInputChange}
            className="form-control"
            required
          />

          <label className="form-label mt-3">Check-in Date</label>
          <input
            type="date"
            name="checkInDate"
            value={formData.checkInDate}
            onChange={handleInputChange}
            className="form-control"
            required
          />

          <label className="form-label mt-3">Check-out Date</label>
          <input
            type="date"
            name="checkOutDate"
            value={formData.checkOutDate}
            onChange={handleInputChange}
            className="form-control"
            required
          />

          <div className="row">
            <div className="col-md-4">
              <label className="form-label mt-3">Number of Rooms</label>
              <input
                type="number"
                name="rooms"
                value={formData.rooms}
                onChange={handleInputChange}
                className="form-control"
                min="1"
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label mt-3">Number of Guests</label>
              <input
                type="number"
                name="guests"
                value={formData.guests}
                onChange={handleInputChange}
                className="form-control"
                min="1"
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label mt-3">Room Type</label>
              <select
                name="roomType"
                value={formData.roomType}
                onChange={handleInputChange}
                className="form-select"
                required
              >
                <option value=""></option>
                <option value="single">Single</option>
                <option value="double">Double</option>
                <option value="suite">Suite</option>
                <option value="luxury">Luxury / Executive</option>
              </select>
            </div>
          </div>

          {/* NEW: Star rating selector */}
          <label className="form-label mt-3">Preferred Star Rating</label>
          <select
            name="starRating"
            value={formData.starRating}
            onChange={handleInputChange}
            className="form-select"
          >
            <option value="any">Any</option>
            <option value="3">3 ★ (Good)</option>
            <option value="4">4 ★ (Very Good)</option>
            <option value="5">5 ★ (Luxury)</option>
          </select>

          {/* NEW: Amenities checkboxes (optional) */}
          <label className="form-label mt-3">Preferred Amenities (optional)</label>
          <div className="d-flex flex-wrap gap-2">
            {[
              "Free Wifi",
              "Breakfast Included",
              "Swimming Pool",
              "Airport Shuttle",
              "Gym",
              "Parking",
            ].map((amen) => (
              <div className="form-check me-3" key={amen}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="amenities"
                  id={`amen-${amen}`}
                  value={amen}
                  checked={formData.amenities.includes(amen)}
                  onChange={handleInputChange}
                />
                <label className="form-check-label" htmlFor={`amen-${amen}`}>
                  {amen}
                </label>
              </div>
            ))}
          </div>

          <label className="form-label mt-3">Budget per night (optional)</label>
          <input
            name="budget"
            value={formData.budget}
            onChange={handleInputChange}
            className="form-control"
            placeholder="e.g. 500"
          />

          <label className="form-label mt-3">Purpose of Travel (optional)</label>
          <input
            name="purpose"
            value={formData.purpose}
            onChange={handleInputChange}
            className="form-control"
          />

          <label className="form-label mt-3">Special Request / Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            className="form-control"
          />

          <button type="submit" className="btn btn-secondary py-3 px-4 mt-4">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default HotelBooking;
