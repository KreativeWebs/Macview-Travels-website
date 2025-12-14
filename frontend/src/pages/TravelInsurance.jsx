import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function TravelInsurance() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    countryOfResidence: "",
    destinationCountry: "",
    travelStartDate: "",
    travelEndDate: "",
    tripPurpose: "",
    travelersCount: "",
    ageGroup: "",
    passportNumber: "",
    previousInsurance: "",
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
        `${import.meta.env.VITE_API_URL}/travel-insurance`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error("Failed to submit insurance request");

      navigate("/success", { state: { name: formData.fullName } });

      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        countryOfResidence: "",
        destinationCountry: "",
        travelStartDate: "",
        travelEndDate: "",
        tripPurpose: "",
        travelersCount: "",
        ageGroup: "",
        passportNumber: "",
        previousInsurance: "",
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
          Travel Insurance Request
        </h1>
        <p>Fill the form below to request travel insurance.</p>

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

            <label className="form-label mt-3">Country of Residence</label>
            <input
              type="text"
              name="countryOfResidence"
              value={formData.countryOfResidence}
              onChange={handleInputChange}
              className="form-control"
              required
            />

            <label className="form-label mt-3">Destination Country</label>
            <input
              type="text"
              name="destinationCountry"
              value={formData.destinationCountry}
              onChange={handleInputChange}
              className="form-control"
              required
            />

            <p className="mt-5" style={{ fontWeight: "bold" }}>TRAVEL DETAILS</p>
            <hr />

            <label className="form-label mt-3">Travel Start Date</label>
            <input
              type="date"
              name="travelStartDate"
              value={formData.travelStartDate}
              onChange={handleInputChange}
              className="form-control"
              required
            />

            <label className="form-label mt-3">Travel End Date</label>
            <input
              type="date"
              name="travelEndDate"
              value={formData.travelEndDate}
              onChange={handleInputChange}
              className="form-control"
              required
            />

            <label className="form-label mt-3">Purpose of Trip</label>
            <select
              name="tripPurpose"
              value={formData.tripPurpose}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value=""></option>
              <option>Vacation</option>
              <option>Business</option>
              <option>Study</option>
              <option>Medical</option>
              <option>Family Visit</option>
            </select>

            <label className="form-label mt-3">Number of Travelers</label>
            <input
              type="number"
              name="travelersCount"
              value={formData.travelersCount}
              onChange={handleInputChange}
              className="form-control"
              min="1"
              required
            />

            <label className="form-label mt-3">Age Group</label>
            <select
              name="ageGroup"
              value={formData.ageGroup}
              onChange={handleInputChange}
              className="form-select"
              required
            >
              <option value=""></option>
              <option>18-30</option>
              <option>31-45</option>
              <option>46-60</option>
              <option>60+</option>
            </select>

            <label className="form-label mt-3">Passport Number</label>
            <input
              type="text"
              name="passportNumber"
              value={formData.passportNumber}
              onChange={handleInputChange}
              className="form-control"
              required
            />

            <label className="form-label mt-3">Had Travel Insurance Before?</label>
            <select
              name="previousInsurance"
              value={formData.previousInsurance}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value=""></option>
              <option>Yes</option>
              <option>No</option>
            </select>

            <p className="mt-5" style={{ fontWeight: "bold" }}>
              ADDITIONAL INFORMATION
            </p>
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

export default TravelInsurance;
