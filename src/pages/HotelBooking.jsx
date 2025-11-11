import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { countryCodes } from "../data/countryCodes";
import { useAuthStore } from "../store/authStore";

function HotelBooking() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  // Calculate max date for DOB (16 years ago)
  const maxDobDate = new Date();
  maxDobDate.setFullYear(maxDobDate.getFullYear() - 16);
  const maxDob = maxDobDate.toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    countryCode: "+1",
    gender: "",
    dob: null,
    destination: "",
    checkInDate: null,
    checkOutDate: null,
    rooms: "",
    guests: "",
    roomType: "",
    starRating: "any", // new field
    amenities: [],     // new field (array of strings)
    budget: "",
    purpose: "",
    notes: "",
  });

  const [minCheckInDate, setMinCheckInDate] = useState(new Date());
  const [minCheckOutDate, setMinCheckOutDate] = useState(null);

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

  const handleCheckInDateChange = (date) => {
    setFormData((prev) => ({ ...prev, checkInDate: date }));
    // Set min check-out date to the day after check-in
    if (date) {
      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);
      setMinCheckOutDate(nextDay);
      // Clear check-out if it's before the new min
      if (formData.checkOutDate && formData.checkOutDate < nextDay) {
        setFormData((prev) => ({ ...prev, checkOutDate: null }));
      }
    } else {
      setMinCheckOutDate(null);
    }
  };

  const handleCheckOutDateChange = (date) => {
    setFormData((prev) => ({ ...prev, checkOutDate: date }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    // Security validation
    const sanitizeInput = (input) => {
      if (typeof input !== 'string') return input;
      return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '').trim();
    };

    const validatePhoneNumber = (phone) => {
      const phoneRegex = /^[0-9+\-\s()]+$/;
      return phoneRegex.test(phone) && phone.length >= 7 && phone.length <= 15;
    };

    const validateTextInput = (text, maxLength = 100) => {
      return text.length <= maxLength && !/<[^>]*>/.test(text);
    };

    const validateNumberInput = (num, min = 1, max = 1000) => {
      const parsed = parseInt(num);
      return !isNaN(parsed) && parsed >= min && parsed <= max;
    };

    // Validate inputs
    if (!validateTextInput(formData.fullName, 100)) {
      toast.error("Full name contains invalid characters or is too long.");
      return;
    }

    if (!validatePhoneNumber(formData.phoneNumber)) {
      toast.error("Please enter a valid phone number.");
      return;
    }

    if (!validateTextInput(formData.destination, 100)) {
      toast.error("Destination contains invalid characters or is too long.");
      return;
    }

    if (!validateNumberInput(formData.rooms, 1, 50)) {
      toast.error("Number of rooms must be between 1 and 50.");
      return;
    }

    if (!validateNumberInput(formData.guests, 1, 100)) {
      toast.error("Number of guests must be between 1 and 100.");
      return;
    }

    if (formData.budget && !validateNumberInput(formData.budget, 1, 100000)) {
      toast.error("Budget must be a valid number between 1 and 100,000.");
      return;
    }

    if (!validateTextInput(formData.notes, 500)) {
      toast.error("Notes contain invalid characters or are too long.");
      return;
    }

    // Check dates
    const checkIn = new Date(formData.checkInDate);
    const checkOut = new Date(formData.checkOutDate);
    const dob = new Date(formData.dob);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Calculate age
    const age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    if (age < 16) {
      toast.error("Age too young. You must be at least 16 years old.");
      return;
    }

    if (checkIn < today) {
      toast.error("Check-in date cannot be in the past.");
      return;
    }

    if (checkOut <= checkIn) {
      toast.error("Check-out date must be after check-in date.");
      return;
    }

    // Sanitize inputs
    const sanitizedFormData = {
      ...formData,
      fullName: sanitizeInput(formData.fullName),
      destination: sanitizeInput(formData.destination),
      notes: sanitizeInput(formData.notes),
      purpose: sanitizeInput(formData.purpose),
    };

    const payload = {
      ...sanitizedFormData,
      phoneNumber: `${sanitizedFormData.countryCode}${sanitizedFormData.phoneNumber}`,
      email: user?.email || null,
    };

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

      navigate("/hotel-success", { state: { name: sanitizedFormData.fullName } });

      setFormData({
        fullName: "",
        phoneNumber: "",
        countryCode: "+1",
        gender: "",
        dob: "",
        destination: "",
        checkInDate: null,
        checkOutDate: null,
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



          <label className="form-label mt-3">Whatsapp Number</label>
          <div className="input-group">
            <select
              name="countryCode"
              value={formData.countryCode}
              onChange={handleInputChange}
              className="form-select"
              style={{
                borderRadius: "4px 0 0 4px",
                boxShadow: "none",
                borderColor: "#c9b5b5ff",
                maxWidth: "120px",
              }}
            >
              {countryCodes.map((country, index) => (
                <option key={index} value={country.code}>
                  {country.flag} {country.code}
                </option>
              ))}
            </select>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="form-control"
              required
              placeholder="Enter phone number"
              style={{
                borderRadius: "0 4px 4px 0",
                boxShadow: "none",
                borderColor: "#c9b5b5ff",
              }}
            />
          </div>

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
            max={maxDob}
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
          <DatePicker
            selected={formData.checkInDate}
            onChange={handleCheckInDateChange}
            minDate={minCheckInDate}
            dateFormat="yyyy-MM-dd"
            className="form-control"
            placeholderText="Select check-in date"
            required
          />

          <label className="form-label mt-3">Check-out Date</label>
          <DatePicker
            selected={formData.checkOutDate}
            onChange={handleCheckOutDateChange}
            minDate={minCheckOutDate}
            dateFormat="yyyy-MM-dd"
            className="form-control"
            placeholderText="Select check-out date"
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
