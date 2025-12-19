import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { countryCodes } from "../data/countryCodes";
import { useAuthStore } from "../store/authStore";

function FlightBooking() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const formRef = useRef(null);

  useEffect(() => {
    if (!user) {
      toast.error("Please log in to book a flight.");
      navigate("/");
    }
  }, [user, navigate]);

  if (!user) {
    return <div className="text-center mt-5">Redirecting to login...</div>;
  }

  const [tripType, setTripType] = useState("");
  const [multiCityFlights, setMultiCityFlights] = useState([
    { from: "", to: "", date: "" },
  ]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [selectedFiles, setSelectedFiles] = useState({});
  const [currentStep, setCurrentStep] = useState("form");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    countryCode: "+1",
    gender: "",
    dob: "",
    departureCity: "",
    destinationCity: "",
    departureDate: "",
    returnDate: "",
    preferredAirline: "",
    travelClass: "",
    adults: "",
    children: "",
    infants: "",
    notes: "",
    passportDatapage: null,
  });

  // Handle field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
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
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/flight-bookings/upload-document`,
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

  // Add/remove multi-city flights
  const handleAddFlight = () => {
    setMultiCityFlights([...multiCityFlights, { from: "", to: "", date: "" }]);
  };

  const handleChange = (index, field, value) => {
    const updatedFlights = [...multiCityFlights];
    updatedFlights[index][field] = value;
    setMultiCityFlights(updatedFlights);
  };

  const handleRemoveFlight = (index) => {
    const updatedFlights = multiCityFlights.filter((_, i) => i !== index);
    setMultiCityFlights(updatedFlights);
  };

  // Submit handler
  const handleFinalSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      fullName: formData.fullName,
      email: user.email,
      phoneNumber: `${formData.countryCode}${formData.phoneNumber}`,
      gender: formData.gender || "",
      dob: formData.dob || "",
      passportDatapage: formData.passportDatapage,
      tripType,
      departureCity: formData.departureCity,
      destinationCity: formData.destinationCity,
      departureDate: formData.departureDate,
      returnDate: tripType === "round-trip" ? formData.returnDate : "",
      multiCityFlights: tripType === "multi-city" ? multiCityFlights : [],
      preferredAirline: formData.preferredAirline || "",
      travelClass: formData.travelClass,
      adults: Number(formData.adults || 1),
      children: Number(formData.children || 0),
      infants: Number(formData.infants || 0),
      notes: formData.notes || "",
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/flight-bookings`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) throw new Error("Failed to submit booking");

      //Redirect to success page with name
      navigate("/flight-success", {
        state: { name: formData.fullName },
      });

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        countryCode: "+1",
        gender: "",
        dob: "",
        departureCity: "",
        destinationCity: "",
        departureDate: "",
        returnDate: "",
        preferredAirline: "",
        travelClass: "",
        adults: "",
        children: "",
        infants: "",
        notes: "",
        passportDatapage: null,
      });
      setUploadProgress({});
      setSelectedFiles({});
      setTripType("");
      setMultiCityFlights([{ from: "", to: "", date: "" }]);
      setCurrentStep("form");
    } catch (err) {
      console.error(err);
      toast.error("Error submitting form. Please try again.");
    }
  };

  const handleNext = () => {
    if (formRef.current && formRef.current.checkValidity()) {
      setCurrentStep("confirmation");
    } else {
      formRef.current.reportValidity();
    }
  };

  const handleBack = () => {
    setCurrentStep("form");
  };

  return (
    <div className="container-xxl" style={{ paddingTop: "150px" }}>
      <div className="container">
        <h1 className="text-start" style={{ fontFamily: "Raleway" }}>
          Book Your Next Flight
        </h1>
        <p>
          Fill out the details below and let us handle the rest. Comfort,
          convenience, and the best fares guaranteed.
        </p>

        <p className="mt-5" style={{ fontWeight: "bold" }}>
          PERSONAL INFORMATION
        </p>
        <hr />

        {currentStep === "form" && (
          <form ref={formRef}>
            <div className="personalInformation">
              {/* Personal Info */}
              <label className="form-label">Full Name</label>
              <small className="text-muted">
                {" "}
                (Must match name on datapage)
              </small>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="form-control"
                required
                style={{
                  borderRadius: "4px",
                  boxShadow: "none",
                  borderColor: "#c9b5b5ff",
                }}
              />

              <label className="form-label mt-3">Whatsapp Number</label>
              <div className="d-flex">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleInputChange}
                  className="form-select me-2"
                  style={{
                    width: "120px",
                    borderRadius: "4px",
                    boxShadow: "none",
                    borderColor: "#c9b5b5ff",
                  }}
                  required
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
                    borderRadius: "4px",
                    boxShadow: "none",
                    borderColor: "#c9b5b5ff",
                  }}
                />
              </div>

              <div className="mb-3 mt-3">
                <label htmlFor="gender" className="form-label">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  required
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="form-select"
                  aria-label="Gender"
                  style={{
                    borderRadius: "4px",
                    boxShadow: "none",
                    borderColor: "#c9b5b5ff",
                  }}
                >
                  <option value=""></option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="prefer_not_to_say">Prefer not to say</option>
                </select>
              </div>

              <label className="form-label mt-3">Date of Birth</label>
              <input
                type="date"
                name="dob"
                required
                value={formData.dob}
                onChange={handleInputChange}
                className="form-control"
                style={{
                  borderRadius: "4px",
                  boxShadow: "none",
                  borderColor: "#c9b5b5ff",
                }}
              />

              <label className="form-label mt-3">Upload Datapage Image</label>
              <input
                type="file"
                name="passportDatapage"
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
              {selectedFiles.passportDatapage &&
                selectedFiles.passportDatapage.map((file, fileIndex) => {
                  const progressKey = `passportDatapage-${fileIndex}`;
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

              {/* Flight Details */}
              <p className="mt-5" style={{ fontWeight: "bold" }}>
                FLIGHT DETAILS
              </p>
              <hr />

              <div>
                <label className="form-label d-block">Trip Type</label>
                {["one-way", "round-trip", "multi-city"].map((type) => (
                  <label
                    key={type}
                    style={{ marginRight: "20px", cursor: "pointer" }}
                  >
                    <input
                      type="radio"
                      name="tripType"
                      value={type}
                      checked={tripType === type}
                      onChange={(e) => setTripType(e.target.value)}
                      required
                      style={{
                        appearance: "none",
                        width: "18px",
                        height: "18px",
                        border: "1px solid #f1741e",
                        borderRadius: "50%",
                        cursor: "pointer",
                        backgroundColor:
                          tripType === type ? "#f1741e" : "transparent",
                      }}
                    />{" "}
                    {type === "one-way"
                      ? "One Way"
                      : type === "round-trip"
                      ? "Round Trip"
                      : "Multi-City"}
                  </label>
                ))}
              </div>

              {/* One-way / Round-trip */}
              {tripType !== "multi-city" && (
                <>
                  <label className="form-label mt-3">Departure City</label>
                  <input
                    type="text"
                    name="departureCity"
                    value={formData.departureCity}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                    style={{
                      borderRadius: "4px",
                      boxShadow: "none",
                      borderColor: "#c9b5b5ff",
                    }}
                  />

                  <label className="form-label mt-3">Destination City</label>
                  <input
                    type="text"
                    name="destinationCity"
                    value={formData.destinationCity}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                    style={{
                      borderRadius: "4px",
                      boxShadow: "none",
                      borderColor: "#c9b5b5ff",
                    }}
                  />

                  <label className="form-label mt-3">Departure Date</label>
                  <input
                    type="date"
                    name="departureDate"
                    value={formData.departureDate}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                    style={{
                      borderRadius: "4px",
                      boxShadow: "none",
                      borderColor: "#c9b5b5ff",
                    }}
                  />

                  {tripType === "round-trip" && (
                    <>
                      <label className="form-label mt-3">Return Date</label>
                      <input
                        type="date"
                        name="returnDate"
                        value={formData.returnDate}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                        style={{
                          borderRadius: "4px",
                          boxShadow: "none",
                          borderColor: "#c9b5b5ff",
                        }}
                      />
                    </>
                  )}
                </>
              )}

              {/* Multi-city */}
              {tripType === "multi-city" && (
                <>
                  {multiCityFlights.map((flight, index) => (
                    <div
                      key={index}
                      className="mt-4 p-3 border rounded position-relative"
                    >
                      <p
                        style={{
                          fontWeight: "bold",
                          color: "#f1741e",
                          fontFamily: "Raleway",
                        }}
                      >
                        Segment {index + 1}
                      </p>

                      <label className="form-label mt-2">Departure City</label>
                      <input
                        type="text"
                        value={flight.from}
                        onChange={(e) =>
                          handleChange(index, "from", e.target.value)
                        }
                        className="form-control"
                        required
                        style={{
                          borderRadius: "4px",
                          boxShadow: "none",
                          borderColor: "#c9b5b5ff",
                        }}
                      />

                      <label className="form-label mt-3">
                        Destination City
                      </label>
                      <input
                        type="text"
                        value={flight.to}
                        onChange={(e) =>
                          handleChange(index, "to", e.target.value)
                        }
                        className="form-control"
                        required
                        style={{
                          borderRadius: "4px",
                          boxShadow: "none",
                          borderColor: "#c9b5b5ff",
                        }}
                      />

                      <label className="form-label mt-3">Departure Date</label>
                      <input
                        type="date"
                        value={flight.date}
                        onChange={(e) =>
                          handleChange(index, "date", e.target.value)
                        }
                        className="form-control"
                        required
                        style={{
                          borderRadius: "4px",
                          boxShadow: "none",
                          borderColor: "#c9b5b5ff",
                        }}
                      />

                      {multiCityFlights.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveFlight(index)}
                          className="btn btn-sm btn-outline-danger mt-3"
                          style={{
                            fontFamily: "Raleway",
                            fontWeight: "600",
                            border: "none",
                            borderRadius: "4px",
                            width: "170px",
                            backgroundColor: "#f1741e",
                            color: "#fff",
                          }}
                        >
                          Remove City
                        </button>
                      )}
                    </div>
                  ))}

                  <button
                    type="button"
                    className="btn mt-3"
                    onClick={handleAddFlight}
                    style={{
                      fontFamily: "Raleway",
                      fontWeight: "600",
                      border: "none",
                      borderRadius: "4px",
                      width: "170px",
                      backgroundColor: "#175aa1",
                      color: "#fff",
                    }}
                  >
                    + Add Another City
                  </button>
                </>
              )}

              {/* Additional Fields */}
              <div>
                <label className="form-label mt-3">
                  Preferred Airline{" "}
                  <small className="text-muted">(optional)</small>
                </label>
                <input
                  type="text"
                  name="preferredAirline"
                  value={formData.preferredAirline}
                  onChange={handleInputChange}
                  className="form-control"
                  style={{
                    borderRadius: "4px",
                    boxShadow: "none",
                    borderColor: "#c9b5b5ff",
                  }}
                />

                <div className="mb-3 mt-3">
                  <label htmlFor="travelClass" className="form-label">
                    Travel Class
                  </label>
                  <select
                    id="travelClass"
                    name="travelClass"
                    value={formData.travelClass}
                    onChange={handleInputChange}
                    className="form-select"
                    aria-label="Travel Class"
                    required
                    style={{
                      borderRadius: "4px",
                      boxShadow: "none",
                      borderColor: "#c9b5b5ff",
                    }}
                  >
                    <option value=""></option>
                    <option value="economy">Economy</option>
                    <option value="premium">Premium</option>
                    <option value="business">Business</option>
                    <option value="first_class">First Class</option>
                  </select>
                </div>
              </div>

              <label className="form-label mt-3">
                Number of Adults (12yrs +)
              </label>
              <input
                type="number"
                name="adults"
                value={formData.adults}
                onChange={handleInputChange}
                className="form-control"
                required
                style={{
                  borderRadius: "4px",
                  boxShadow: "none",
                  borderColor: "#c9b5b5ff",
                }}
              />

              <label className="form-label mt-3">
                Number of Children (2yrs - 12yrs)
              </label>
              <input
                type="number"
                name="children"
                value={formData.children}
                onChange={handleInputChange}
                className="form-control"
                style={{
                  borderRadius: "4px",
                  boxShadow: "none",
                  borderColor: "#c9b5b5ff",
                }}
              />

              <label className="form-label mt-3">
                Number of Infants (Below 2yrs)
              </label>
              <input
                type="number"
                name="infants"
                value={formData.infants}
                onChange={handleInputChange}
                className="form-control"
                style={{
                  borderRadius: "4px",
                  boxShadow: "none",
                  borderColor: "#c9b5b5ff",
                }}
              />

              <p className="mt-5" style={{ fontWeight: "bold" }}>
                ADDITIONAL INFORMATION
              </p>
              <hr />

              <label className="form-label mt-3">Special Request/Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                className="form-control"
                style={{
                  borderRadius: "4px",
                  boxShadow: "none",
                  borderColor: "#c9b5b5ff",
                }}
              />

              <button
                type="button"
                onClick={handleNext}
                className="btn btn-secondary py-3 px-1 mt-5"
                style={{
                  fontFamily: "Raleway",
                  fontWeight: "600",
                  border: "none",
                  borderRadius: "4px",
                  width: "170px",
                }}
              >
                Next
              </button>
            </div>
          </form>
        )}

        {currentStep === "confirmation" && (
          <div>
            <h2 className="mt-5" style={{ fontFamily: "Raleway" }}>
              Confirm Your Booking
            </h2>
            <p>Please review your information before submitting.</p>

            <div className="mt-4">
              <h5>Personal Information</h5>
              <p>
                <strong>Full Name:</strong> {formData.fullName}
              </p>
              <p>
                <strong>Phone:</strong> {formData.countryCode}
                {formData.phoneNumber}
              </p>
              <p>
                <strong>Gender:</strong> {formData.gender}
              </p>
              <p>
                <strong>Date of Birth:</strong> {formData.dob}
              </p>
              {formData.passportDatapage && (
                <p>
                  <strong>Passport Image:</strong>{" "}
                  <img
                    src={formData.passportDatapage.fileUrl}
                    alt="Passport"
                    style={{ maxWidth: "200px" }}
                  />
                </p>
              )}
            </div>

            <div className="mt-4">
              <h5>Flight Details</h5>
              <p>
                <strong>Trip Type:</strong> {tripType}
              </p>
              {tripType !== "multi-city" ? (
                <>
                  <p>
                    <strong>Departure City:</strong> {formData.departureCity}
                  </p>
                  <p>
                    <strong>Destination City:</strong>{" "}
                    {formData.destinationCity}
                  </p>
                  <p>
                    <strong>Departure Date:</strong> {formData.departureDate}
                  </p>
                  {tripType === "round-trip" && (
                    <p>
                      <strong>Return Date:</strong> {formData.returnDate}
                    </p>
                  )}
                </>
              ) : (
                multiCityFlights.map((flight, index) => (
                  <div key={index}>
                    <p>
                      <strong>Segment {index + 1}:</strong> {flight.from} to{" "}
                      {flight.to} on {flight.date}
                    </p>
                  </div>
                ))
              )}
              <p>
                <strong>Preferred Airline:</strong>{" "}
                {formData.preferredAirline || "Not specified"}
              </p>
              <p>
                <strong>Travel Class:</strong> {formData.travelClass}
              </p>
              <p>
                <strong>Adults:</strong> {formData.adults}
              </p>
              <p>
                <strong>Children:</strong> {formData.children}
              </p>
              <p>
                <strong>Infants:</strong> {formData.infants}
              </p>
            </div>

            <div className="mt-4">
              <h5>Additional Information</h5>
              <p>
                <strong>Notes:</strong> {formData.notes || "None"}
              </p>
            </div>

            <div className="mt-5">
              <button
                type="button"
                onClick={handleBack}
                className="btn btn-outline-secondary me-3 mb-3"
                style={{
                  fontFamily: "Raleway",
                  fontWeight: "600",
                  borderRadius: "4px",
                  width: "170px",
                }}
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleFinalSubmit}
                className="btn btn-primary"
                style={{
                  fontFamily: "Raleway",
                  fontWeight: "600",
                  border: "none",
                  borderRadius: "4px",
                  width: "170px",
                }}
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FlightBooking;
