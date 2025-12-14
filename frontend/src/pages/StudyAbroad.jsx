import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function StudyAbroad() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    nationality: "",
    dob: "",
    gender: "",
    highestEducation: "",
    fieldOfStudy: "",
    preferredCountry: "",
    intake: "",
    studyLevel: "",
    budgetRange: "",
    englishTest: "",
    passportStatus: "",
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
        `${import.meta.env.VITE_API_URL}/study-abroad`,
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
        nationality: "",
        dob: "",
        gender: "",
        highestEducation: "",
        fieldOfStudy: "",
        preferredCountry: "",
        intake: "",
        studyLevel: "",
        budgetRange: "",
        englishTest: "",
        passportStatus: "",
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
          Study Abroad Application
        </h1>
        <p>Fill the form below and our consultants will contact you shortly.</p>

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

            <label className="form-label mt-3">Nationality</label>
            <input
              type="text"
              name="nationality"
              value={formData.nationality}
              onChange={handleInputChange}
              className="form-control"
              required
            />

            <label className="form-label mt-3">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
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

            <p className="mt-5" style={{ fontWeight: "bold" }}>ACADEMIC DETAILS</p>
            <hr />

            <label className="form-label mt-3">Highest Education Level</label>
            <input
              type="text"
              name="highestEducation"
              value={formData.highestEducation}
              onChange={handleInputChange}
              className="form-control"
              placeholder="e.g. High School, BSc, HND"
              required
            />

            <label className="form-label mt-3">Field of Study</label>
            <input
              type="text"
              name="fieldOfStudy"
              value={formData.fieldOfStudy}
              onChange={handleInputChange}
              className="form-control"
              required
            />

            <p className="mt-5" style={{ fontWeight: "bold" }}>STUDY PREFERENCE</p>
            <hr />

            <label className="form-label mt-3">Preferred Country</label>
            <input
              type="text"
              name="preferredCountry"
              value={formData.preferredCountry}
              onChange={handleInputChange}
              className="form-control"
              required
            />

            <label className="form-label mt-3">Study Level</label>
            <select
              name="studyLevel"
              value={formData.studyLevel}
              onChange={handleInputChange}
              className="form-select"
              required
            >
              <option value=""></option>
              <option value="diploma">Diploma</option>
              <option value="bachelors">Bachelor’s</option>
              <option value="masters">Master’s</option>
              <option value="phd">PhD</option>
            </select>

            <label className="form-label mt-3">Preferred Intake</label>
            <input
              type="text"
              name="intake"
              value={formData.intake}
              onChange={handleInputChange}
              className="form-control"
              placeholder="e.g. September 2025"
              required
            />

            <label className="form-label mt-3">Budget Range (Tuition + Living)</label>
            <select
              name="budgetRange"
              value={formData.budgetRange}
              onChange={handleInputChange}
              className="form-select"
              required
            >
              <option value=""></option>
              <option>$5,000 - $10,000</option>
              <option>$10,000 - $20,000</option>
              <option>$20,000 - $35,000</option>
              <option>$35,000+</option>
            </select>

            <label className="form-label mt-3">English Test</label>
            <select
              name="englishTest"
              value={formData.englishTest}
              onChange={handleInputChange}
              className="form-select"
              required
            >
              <option value=""></option>
              <option>IELTS</option>
              <option>TOEFL</option>
              <option>Duolingo</option>
              <option>No — I haven't taken a test yet</option>
            </select>

            <label className="form-label mt-3">Passport Status</label>
            <select
              name="passportStatus"
              value={formData.passportStatus}
              onChange={handleInputChange}
              className="form-select"
              required
            >
              <option value=""></option>
              <option>Yes, I have a valid passport</option>
              <option>No, I am processing it</option>
              <option>No, I haven't started</option>
            </select>

            <p className="mt-5" style={{ fontWeight: "bold" }}>ADDITIONAL INFORMATION</p>
            <hr />

            <label className="form-label mt-3">Notes / Message</label>
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
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudyAbroad;
