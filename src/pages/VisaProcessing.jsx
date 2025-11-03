import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function VisaProcessing() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [visaData, setVisaData] = useState(null);
  const [selectedVisaType, setSelectedVisaType] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });

  const navigate = useNavigate();

  // Handle input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Fetch visa requirements when a country is selected
  useEffect(() => {
    if (!selectedCountry) return;

    const fetchVisaData = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/visa/requirements/${selectedCountry}`
        );
        if (!res.ok) throw new Error("Failed to fetch visa requirements");

        const data = await res.json();
        setVisaData(data);
      } catch (error) {
        console.error(error);
        alert("Error fetching visa data");
      }
    };

    fetchVisaData();
  }, [selectedCountry]);

  // Handle file uploads and text inputs for dynamic requirements
  const handleDynamicChange = (e) => {
    const { name, type, files, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();
      form.append("country", selectedCountry);
      form.append("visaType", selectedVisaType);
      form.append("fullName", formData.fullName);
      form.append("email", formData.email);
      form.append("phoneNumber", formData.phoneNumber);

      // Append dynamic fields
      const selectedVisa =
        visaData?.visaTypes?.find((v) => v.name === selectedVisaType) || {};
      selectedVisa.requirements?.forEach((req) => {
        if (formData[req.label]) {
          form.append(req.label, formData[req.label]);
        }
      });

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/visa/apply`,
        {
          method: "POST",
          body: form,
        }
      );

      if (!response.ok) throw new Error("Submission failed");

      navigate("/visa-success", {
        state: { name: formData.fullName, country: selectedCountry },
      });

      // Reset form
      setFormData({ fullName: "", email: "", phoneNumber: "" });
      setSelectedCountry("");
      setSelectedVisaType("");
      setVisaData(null);
    } catch (error) {
      console.error(error);
      alert("❌ Error submitting visa application");
    }
  };

  return (
    <div className="container-xxl" style={{ paddingTop: "150px" }}>
      <div className="container">
        <h1 className="text-start" style={{ fontFamily: "Raleway" }}>
          Visa Application
        </h1>
        <p>Choose your destination country and fill in the required details.</p>

        <p className="mt-5" style={{ fontWeight: "bold" }}>
          PERSONAL INFORMATION
        </p>
        <hr />

        <form onSubmit={handleSubmit}>
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className="form-control"
            required
            style={{ borderRadius: "4px", borderColor: "#c9b5b5ff" }}
          />

          <label className="form-label mt-3">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="form-control"
            required
            style={{ borderRadius: "4px", borderColor: "#c9b5b5ff" }}
          />

          <label className="form-label mt-3">WhatsApp Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="form-control"
            required
            style={{ borderRadius: "4px", borderColor: "#c9b5b5ff" }}
          />

          <p className="mt-5" style={{ fontWeight: "bold" }}>
            VISA DETAILS
          </p>
          <hr />

          {/* Country Selector */}
          <label className="form-label mt-3">Select Country</label>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="form-select"
            required
            style={{ borderRadius: "4px", borderColor: "#c9b5b5ff" }}
          >
            <option value="">Select a country</option>
            <option value="Kenya">Kenya</option>
            <option value="South Africa">South Africa</option>
            <option value="Egypt">Egypt</option>
          </select>

          {/* Visa Type */}
          {visaData && (
            <>
              <label className="form-label mt-3">Visa Type</label>
              <select
                value={selectedVisaType}
                onChange={(e) => setSelectedVisaType(e.target.value)}
                className="form-select"
                required
                style={{ borderRadius: "4px", borderColor: "#c9b5b5ff" }}
              >
                <option value="">Select Visa Type</option>
                {visaData.visaTypes.map((type) => (
                  <option key={type.name} value={type.name}>
                    {type.name.toUpperCase()} — Fee: ${type.fee}
                  </option>
                ))}
              </select>
            </>
          )}

          {/* Dynamic Requirements */}
          {selectedVisaType &&
            visaData?.visaTypes
              ?.find((v) => v.name === selectedVisaType)
              ?.requirements?.map((req, index) => (
                <div key={index} className="mt-3">
                  <label className="form-label">{req.label}</label>
                  <input
                    type={req.type}
                    name={req.label}
                    required={req.required}
                    onChange={handleDynamicChange}
                    className="form-control"
                    style={{ borderRadius: "4px", borderColor: "#c9b5b5ff" }}
                  />
                </div>
              ))}

          {/* Submit Button */}
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
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default VisaProcessing;
