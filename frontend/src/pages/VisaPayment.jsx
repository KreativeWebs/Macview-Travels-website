import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PaystackPayment from "../components/PaystackPayment";
import axios from "axios";
import { useAuthStore } from "../store/authStore";

function VisaPayment() {
  const location = useLocation();
  const navigate = useNavigate();
  const [paddingTop, setPaddingTop] = React.useState(150);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth;
      setPaddingTop(width < 768 ? 50 : 150);
      setIsMobile(width < 768);
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);

    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  const data = location.state;

  if (!data) {
    navigate("/visaprocessing");
    return null;
  }

  const { formData, selectedCountry, selectedVisaType, touristRequirements, fee, processingTime } = data;

  const handlePaymentSuccess = async (paymentRef) => {
    try {
      // Build documents array for backend
      const documents = [];

      touristRequirements.forEach((req) => {
        const fieldValue = formData[req.label];

        // Handle array of files (multiple uploads)
        if (Array.isArray(fieldValue)) {
          fieldValue.forEach((file) => {
            if (file && !file.failed && file.fileUrl) {
              documents.push({
                label: req.label,
                fileUrl: file.fileUrl,
              });
            }
          });
        }
        // Handle single file object
        else if (fieldValue && !fieldValue.failed && fieldValue.fileUrl) {
          documents.push({
            label: req.label,
            fileUrl: fieldValue.fileUrl,
          });
        }
        // Handle text input or other values
        else {
          documents.push({
            label: req.label,
            textValue: fieldValue || "",
          });
        }
      });

      const user = useAuthStore.getState().user;
      if (!user || !user.email) {
        alert("Please login to submit your visa application.");
        return;
      }

      const fullPhoneNumber = `${formData.countryCode || '+254'}${formData.phoneNumber}`;

      const payload = {
        fullName: formData.fullName,
        email: user.email,
        phoneNumber: fullPhoneNumber,
        destinationCountry: selectedCountry,
        visaType: selectedVisaType,
        documents,
        processingTime,
        payment: {
          status: "paid",
          provider: "paystack",
          transactionId: paymentRef.reference,
          amount: fee,
        },
      };

      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/visa/apply`, payload);

      navigate("/visa-success", {
        state: { name: formData.fullName, country: selectedCountry },
      });
    } catch (error) {
      console.error("Error submitting visa application:", error);
      alert("Failed to submit visa application. Please contact support.");
    }
  };

  // Helper to extract file name from Cloudinary URL or file object
  const getFileNameFromUrl = (file) => {
      
    if (!file) return "Not uploaded";

    // Handle array of file objects
    if (Array.isArray(file)) {
      return file
        .map(f => f.originalName || decodeURIComponent(f.fileUrl.split("/").pop().split("?")[0]))
        .join(", ");
    }
    
    // Handle single file object with originalName
    if (file.originalName) {
      return file.originalName;
    }
    
    // Handle single file object with fileUrl
    if (file.fileUrl) {
      return file.originalName || decodeURIComponent(file.fileUrl.split("/").pop().split("?")[0]);
    }
    
    // Handle plain string (for text inputs or direct URLs)
    if (typeof file === "string") {
      // If it's a Cloudinary URL, extract filename
      if (file.includes("cloudinary")) {
        return decodeURIComponent(file.split("/").pop().split("?")[0]);
      }
      // Otherwise return the string as-is (for text inputs)
      return file;
    }

    return "Not uploaded";
  };

  return (
    <div className="container-xxl" style={{ paddingTop: `${paddingTop}px` }}>
      <div className="container">
        <h2 className="fw-bold mb-3" style={{ fontFamily: "Raleway" }}>Confirm & Pay</h2>
        <p className="text-muted mb-4">Please confirm your visa details and make payment.</p>

        <div className="row g-4">
          {/* Personal Information Card */}
          <div className="col-lg-6">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-primary text-white">
                <i className="fas fa-user me-2"></i>
                <strong>Personal Information</strong>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <i className="fas fa-user-circle text-primary me-2"></i>
                  <strong>Full Name:</strong> {formData.fullName}
                </div>
                <div className="mb-3">
                  <i className="fab fa-whatsapp text-success me-2"></i>
                  <strong>WhatsApp Number:</strong> {formData.phoneNumber}
                </div>
              </div>
            </div>
          </div>

          {/* Visa Details Card */}
          <div className="col-lg-6">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-success text-white">
                <i className="fas fa-passport me-2"></i>
                <strong>Visa Details</strong>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <i className="fas fa-globe text-info me-2"></i>
                  <strong>Country:</strong> {selectedCountry}
                </div>
                <div className="mb-3">
                  <i className="fas fa-id-card text-warning me-2"></i>
                  <strong>Visa Type:</strong> {selectedVisaType}
                </div>
                {processingTime && (
                  <div className="mb-3">
                    <i className="fas fa-clock text-secondary me-2"></i>
                    <strong>Processing Time:</strong> {processingTime}
                  </div>
                )}
                <div className="mb-3">
                  <i className="fas fa-money-bill-wave text-danger me-2"></i>
                  <strong>Fee:</strong> ₦{fee.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Documents Card */}
          <div className="col-12">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-info text-white">
                <i className="fas fa-file-alt me-2"></i>
                <strong>Documents</strong>
              </div>
              <div className="card-body">
                {touristRequirements.map((req, idx) => (
                  <div key={idx} className="mb-3">
                    <div className="d-flex align-items-start">
                      <i className="fas fa-paperclip text-muted me-2 mt-1"></i>
                      <div>
                        <strong>{req.label}:</strong>
                        {formData[req.label] ? (
                          (Array.isArray(formData[req.label]) ? formData[req.label] : [formData[req.label]]).map((f, i) => (
                            <div key={i} className="ms-3 mt-1">
                              {f.failed ? (
                                <span className="text-danger">
                                  <i className="fas fa-exclamation-triangle me-1"></i>
                                  {f.originalName} (Upload failed)
                                </span>
                              ) : (
                                <span className="text-success">
                                  <i className="fas fa-check-circle me-1"></i>
                                  {typeof f === "string" ? f : (f.originalName || decodeURIComponent(f.fileUrl.split("/").pop().split("?")[0]))}
                                </span>
                              )}
                            </div>
                          ))
                        ) : (
                          <div className="ms-3 mt-1 text-muted">
                            <i className="fas fa-times-circle me-1"></i>
                            Not uploaded
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className={`mt-5 d-flex ${isMobile ? 'flex-column' : 'justify-content-start'}`}>
          <button
            className="btn me-3 mb-3"
            style={{
              backgroundColor: "#175aa1",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "12px 24px",
              fontWeight: "600",
              fontFamily: "Raleway",
              width: isMobile ? "100%" : "auto"
            }}
            onClick={() =>
              navigate("/visaprocessing", {
                state: { formData, selectedCountry, touristRequirements, fee, processingTime },
              })
            }
          >
            <i className="fas fa-arrow-left me-2"></i>
            Back
          </button>

          <div style={{ width: isMobile ? "100%" : "auto" }}>
            <PaystackPayment
              amount={fee}
              fullName={formData.fullName}
              onSuccess={handlePaymentSuccess}
              buttonText="Pay Visa Fee"
              buttonStyle={{
                backgroundColor: "#f1741e",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "12px 24px",
                fontWeight: "600",
                fontFamily: "Raleway",
                width: "100%"
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisaPayment;