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

        <p className="mt-5" style={{ fontWeight: "bold" }}>
          PERSONAL INFORMATION
        </p>
        <div className="container">
          <img
            src="assets/img/students-people-excited-with-selfie-graduation-campus-with-celebration-success-portrait-college-university-classmate-friends-with-pride-social-media-post-qualification.jpg"
            alt=""
          />
        </div>
        <hr />
      </div>
    </div>
  );
}

export default StudyAbroad;
