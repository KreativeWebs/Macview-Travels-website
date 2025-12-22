import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { countryCodes } from "../data/countryCodes";
import { useAuthStore } from "../store/authStore";

function UpdateFlight() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, accessToken } = useAuthStore();

  useEffect(() => {
    if (!user) {
      toast.error("Please log in to update booking.");
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
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/flight-bookings/${id}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (!response.ok) throw new Error("Failed to fetch booking");
        const booking = await response.json();
        // Pre-fill form
        setFormData({
          fullName: booking.fullName || "",
          email: booking.email || "",
          phoneNumber: booking.phoneNumber ? booking.phoneNumber.replace(/^\+\d+/, "") : "",
          countryCode: booking.phoneNumber ? booking.phoneNumber.match(/^\+\d+/)?.[0] || "+1" : "+1",
          gender: booking.gender || "",
          dob: booking.dob ? new Date(booking.dob).toISOString().split('T')[0] : "",
          departureCity: booking.departureCity || "",
          destinationCity: booking.destinationCity || "",
          departureDate: booking.departureDate ? new Date(booking.departureDate).toISOString().split('T')[0] : "",
          returnDate: booking.returnDate ? new Date(booking.returnDate).toISOString().split('T')[0] : "",
          preferredAirline: booking.preferredAirline || "",
          travelClass: booking.travelClass || "",
          adults: booking.adults || "",
          children: booking.children || "",
          infants: booking.infants || "",
          notes: booking.notes || "",
        });
        setTripType(booking.tripType || "");
        setMultiCityFlights(booking.multiCityFlights || [{ from: "", to: "", date: "" }]);
        setLoading(false);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load booking details");
        navigate("/managebookings");
      }
    };
    fetchBooking();
  }, [id, accessToken, navigate]);

  // Handle field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      fullName: formData.fullName,
      email: user.email,
      phoneNumber: `${formData.countryCode}${formData.phoneNumber}`,
      gender: formData.gender || "",
      dob: formData.dob || "",
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
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/flight-bookings/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to update booking");

      toast.success("Flight booking updated successfully");
      navigate("/managebookings");
    } catch (err) {
      console.error(err);
      toast.error("Error updating booking. Please try again.");
    }
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container-xxl" style={{ paddingTop: "150px" }}>
      <div className="container">
        <h1 className="text-start" style={{ fontFamily: "Raleway" }}>
          Update Your Flight Booking
        </h1>
        <p>
          Update the details below. Changes will be saved to your booking.
        </p>

        <p className="mt-5" style={{ fontWeight: "bold" }}>
          PERSONAL INFORMATION
        </p>
        <hr />

        <form onSubmit={handleSubmit}>
          <div className="personalInformation">
            {/* Personal Info */}
            <label className="form-label">Full Name</label>
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

                    <label className="form-label mt-3">Destination City</label>
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
              type="submit"
              className="btn btn-secondary py-3 px-1 mt-5"
              style={{
                fontFamily: "Raleway",
                fontWeight: "600",
                border: "none",
                borderRadius: "4px",
                width: "170px",
              }}
            >
              Update Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateFlight;
