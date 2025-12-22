import React from "react";
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
        `${import.meta.env.VITE_API_BASE_URL}/study-abroad`,
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
        <div className="row g-4">
          <div
            style={{
              height: "400px",
              width: "100%",
              backgroundImage: `url('assets/img/students-people-excited-with-selfie-graduation-campus-with-celebration-success-portrait-college-university-classmate-friends-with-pride-social-media-post-qualification.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
            }}
          ></div>
        </div>
        <div className="row g-4 mt-4">
          <div className="col-12 text-start">
            <h1 style={{ fontFamily: "Raleway" }}>
              Study Abroad Application
            </h1>
            <p className="mb-3">
              Contact our Study Abroad consultant for more information.
            </p>
            <a
              href="https://wa.me/+2347076177013"
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{
                backgroundColor: "#f1741e",
                border: "none",
                borderRadius: "10px",
                color: "white",
              }}
            >
              <i className="fab fa-whatsapp me-2"></i>
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudyAbroad;
