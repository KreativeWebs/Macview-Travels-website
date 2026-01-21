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

  const { formData, selectedCountry, selectedVisaType, touristRequirements, fee, processingTime, paymentMethod } = data;

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
    <div className="container-xxl" style={{ paddingTop: "150px" }}>
      <div className="container">
        <h1 className="text-start" style={{ fontFamily: "Raleway" }}>
          Confirm Your Visa Application
        </h1>
        <p>Please review your information before submitting.</p>

        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Personal Information</h5>
                <hr />
                <div className="row">
                  <div className="col-md-6">
                    <p><strong>Full Name:</strong> {formData.fullName}</p>
                    <p><strong>Phone Number:</strong> {formData.phoneNumber}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card mt-4">
              <div className="card-body">
                <h5 className="card-title">Visa Details</h5>
                <hr />
                <div className="row">
                  <div className="col-md-6">
                    <p><strong>Destination Country:</strong> {selectedCountry}</p>
                    <p><strong>Visa Type:</strong> {selectedVisaType}</p>
                    <p><strong>Processing Time:</strong> {processingTime}</p>
                    <p><strong>Fee:</strong> ₦{fee.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card mt-4">
              <div className="card-body">
                <h5 className="card-title">Documents</h5>
                <hr />
                {touristRequirements.map((req, idx) => (
                  <div key={idx} className="mb-3">
                    <p><strong>{req.label}:</strong> {getFileNameFromUrl(formData[req.label])}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Application Summary</h5>
                <hr />
                <p><strong>Country:</strong> {selectedCountry}</p>
                <p><strong>Visa Type:</strong> {selectedVisaType}</p>
                <p><strong>Fee:</strong> ₦{fee.toLocaleString()}</p>
              </div>
            </div>

            <div className="mt-4">
              <button
                onClick={() => navigate("/visaprocessing", { state: { formData, selectedCountry, touristRequirements, fee, processingTime } })}
                className="btn w-100 mb-2"
                style={{
                  backgroundColor: "#175aa1",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "12px 24px",
                  fontWeight: "600",
                  fontFamily: "Raleway"
                }}
              >
                Edit Information
              </button>
              {paymentMethod === "manual" ? (
                <button
                  onClick={() => navigate("/visa-manual-payment", {
                    state: {
                      formData,
                      selectedCountry,
                      selectedVisaType,
                      touristRequirements,
                      fee,
                      processingTime,
                    },
                  })}
                  className="btn w-100"
                  style={{
                    backgroundColor: "#ff5e14",
                    color: "#fff",
                    border: "none",
                    borderRadius: "3px",
                    padding: "12px 24px",
                    fontWeight: "600",
                    fontFamily: "Raleway"
                  }}
                >
                  Proceed to Payment
                </button>
              ) : (
                <PaystackPayment
                  amount={fee}
                  fullName={formData.fullName}
                  onSuccess={handlePaymentSuccess}
                  buttonText="Pay Now"
                  className="paystack-flash-sale-btn w-100"
                  style={{
                    color: "#fff",
                    border: "none",
                    borderRadius: "3px",
                    padding: "12px 24px",
                    fontWeight: "600",
                    fontFamily: "Raleway"
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisaPayment;