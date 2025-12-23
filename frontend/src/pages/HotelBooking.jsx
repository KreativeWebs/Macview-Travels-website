import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { countryCodes } from "../data/countryCodes";
import { useAuthStore } from "../store/authStore";

function HotelBooking() {
  const navigate = useNavigate();
  const location = useLocation();
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
  const [uploadProgress, setUploadProgress] = useState({});
  const [selectedFiles, setSelectedFiles] = useState({});

  // Pre-populate form data when coming back from confirmation page
  useEffect(() => {
    if (location.state?.formData) {
      const data = location.state.formData;

      // Split phone number back into country code and number
      let countryCode = "+1";
      let phoneNumber = data.phoneNumber || "";

      // Find matching country code
      for (const country of countryCodes) {
        if (phoneNumber.startsWith(country.code)) {
          countryCode = country.code;
          phoneNumber = phoneNumber.slice(country.code.length);
          break;
        }
      }

      setFormData({
        ...data,
        countryCode,
        phoneNumber,
        checkInDate: data.checkInDate ? new Date(data.checkInDate) : null,
        checkOutDate: data.checkOutDate ? new Date(data.checkOutDate) : null,
      });

      // Set selected files for display if passport photograph exists
      if (data.passportPhotograph) {
        setSelectedFiles({
          passportPhotograph: [{ name: data.passportPhotograph.originalName || "Uploaded file" }]
        });
        setUploadProgress({
          "passportPhotograph-0": { status: "success", progress: 100 }
        });
      }
    }
  }, [location.state]);

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

  // Upload file to backend (Cloudinary)
  const handleFileUpload = async (file, reqLabel, fileIndex) => {
    const form = new FormData();
    form.append("file", file);

    // Set initial progress
    setUploadProgress((prev) => ({
      ...prev,
      [`${reqLabel}-${fileIndex}`]: { status: "uploading", progress: 0 },
    }));

    try {
      // Ensure the URL has a protocol
      let baseUrl = import.meta.env.VITE_API_BASE_URL;
      if (baseUrl && !baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
        baseUrl = `https://${baseUrl}`;
      }

      const res = await fetch(
        `${baseUrl}/api/hotel-bookings/upload-document`,
        {
          method: "POST",
          body: form,
        }
      );

      if (!res.ok) throw new Error("File upload failed");
      const data = await res.json();

      if (!data.success) throw new Error(data.error || "File upload failed");

      // Update progress to success
      setUploadProgress((prev) => ({
        ...prev,
        [`${reqLabel}-${fileIndex}`]: { status: "success", progress: 100 },
      }));

      return {
        fileUrl: data.fileUrl,
        originalName: file.name,
      };
    } catch (error) {
      console.error("File upload error:", error);
      toast.error("File upload failed");

      // Update progress to failed
      setUploadProgress((prev) => ({
        ...prev,
        [`${reqLabel}-${fileIndex}`]: { status: "failed", progress: 0 },
      }));

      return null;
    }
  };

  // Dynamic input change (text & file)
  const handleDynamicChange = async (e) => {
    const { name, type, files } = e.target;

    if (type === "file") {
      if (!files || files.length === 0) return;

      const file = files[0];

      if (file.size > 10 * 1024 * 1024) {
        toast.error("File is too large! Max 10MB.");
        return;
      }

      // Store selected files for display
      setSelectedFiles((prev) => ({
        ...prev,
        [name]: [file],
      }));

      // Set initial progress
      setUploadProgress((prev) => ({
        ...prev,
        [`${name}-0`]: { status: "uploading", progress: 0 },
      }));

      const uploaded = await handleFileUpload(file, name, 0);
      setFormData((prev) => ({
        ...prev,
        [name]: uploaded,
      }));

      return;
    }

    handleInputChange(e);
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



  const validateForm = () => {
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
      return false;
    }

    if (!validatePhoneNumber(formData.phoneNumber)) {
      toast.error("Please enter a valid phone number.");
      return false;
    }

    if (!formData.gender) {
      toast.error("Please select your gender.");
      return false;
    }

    if (!formData.dob) {
      toast.error("Please enter your date of birth.");
      return false;
    }

    if (!formData.passportPhotograph) {
      toast.error("Please upload your passport photograph.");
      return false;
    }

    if (!validateTextInput(formData.destination, 100)) {
      toast.error("Destination contains invalid characters or is too long.");
      return false;
    }

    if (!formData.checkInDate) {
      toast.error("Please select check-in date.");
      return false;
    }

    if (!formData.checkOutDate) {
      toast.error("Please select check-out date.");
      return false;
    }

    if (!validateNumberInput(formData.rooms, 1, 50)) {
      toast.error("Number of rooms must be between 1 and 50.");
      return false;
    }

    if (!validateNumberInput(formData.guests, 1, 100)) {
      toast.error("Number of guests must be between 1 and 100.");
      return false;
    }

    if (!formData.roomType) {
      toast.error("Please select room type.");
      return false;
    }

    if (formData.budget && !validateNumberInput(formData.budget, 1, 100000)) {
      toast.error("Budget must be a valid number between 1 and 100,000.");
      return false;
    }

    if (!validateTextInput(formData.notes, 500)) {
      toast.error("Notes contain invalid characters or are too long.");
      return false;
    }

    // Check dates
    const checkIn = new Date(formData.checkInDate);
    const checkOut = new Date(formData.checkOutDate);
    const dob = new Date(formData.dob);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Calculate age
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    if (age < 16) {
      toast.error("Age too young. You must be at least 16 years old.");
      return false;
    }

    if (checkIn < today) {
      toast.error("Check-in date cannot be in the past.");
      return false;
    }

    if (checkOut <= checkIn) {
      toast.error("Check-out date must be after check-in date.");
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (validateForm()) {
      // Sanitize inputs
      const sanitizeInput = (input) => {
        if (typeof input !== 'string') return input;
        return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '').trim();
      };

      const sanitizedFormData = {
        ...formData,
        fullName: sanitizeInput(formData.fullName),
        destination: sanitizeInput(formData.destination),
        notes: sanitizeInput(formData.notes),
        purpose: sanitizeInput(formData.purpose),
        phoneNumber: `${formData.countryCode}${formData.phoneNumber}`,
        email: user?.email || null,
      };

      navigate("/hotel-booking-confirmation", { state: { formData: sanitizedFormData } });
    }
  };

  return (
    <div className="container-xxl" style={{ paddingTop: "150px" }}>
      <div className="container">
        <h1 className="text-start" style={{ fontFamily: "Raleway" }}>
          Book Your Hotel Stay
        </h1>
        <p>Fill in your details and we will secure the best hotel options for you.</p>

        <form>
          <p className="mt-5 fw-bold">PERSONAL INFORMATION</p>
          <hr />

          <label className="form-label">Full Name </label>
          <small className="text-muted"> (Must match name on datapage)</small>
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
              placeholder="Enter phone number without country code"
              className="form-control"
              required
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

          <label className="form-label mt-3">Upload Passport Photograph</label>
          <input
            type="file"
            name="passportPhotograph"
            required
            accept="image/*"
            onChange={handleDynamicChange}
            className="form-control"
            style={{
              borderRadius: "4px",
              boxShadow: "none",
              borderColor: "#c9b5b5ff",
            }}
          />
          {selectedFiles.passportPhotograph &&
            selectedFiles.passportPhotograph.map((file, fileIndex) => {
              const progressKey = `passportPhotograph-${fileIndex}`;
              const progress = uploadProgress[progressKey];
              return (
                <div key={fileIndex} className="mt-2">
                  <small className="text-muted">{file.name}</small>
                  {progress && (
                    <div
                      className="progress mt-1"
                      style={{ height: "6px" }}
                    >
                      <div
                        className={`progress-bar ${
                          progress.status === "success"
                            ? "bg-success"
                            : progress.status === "failed"
                            ? "bg-danger"
                            : "bg-primary"
                        }`}
                        role="progressbar"
                        style={{ width: `${progress.progress}%` }}
                        aria-valuenow={progress.progress}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  )}
                  {progress && progress.status === "success" && (
                    <small className="text-success">
                      ✓ Uploaded successfully
                    </small>
                  )}
                  {progress && progress.status === "failed" && (
                    <small className="text-danger">✗ Upload failed</small>
                  )}
                  {progress && progress.status === "uploading" && (
                    <small className="text-primary">Uploading...</small>
                  )}
                </div>
              );
            })}

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

          <label className="form-label mt-3">Special Request</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Like a Preferred Hotel..."
          />

          <button type="button" onClick={handleNext} className="btn btn-secondary py-3 px-4 mt-4">
            Next
          </button>
        </form>
      </div>
    </div>
  );
}

export default HotelBooking;
