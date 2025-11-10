import { useLocation, useNavigate } from "react-router-dom";
import PaystackPayment from "../components/PaystackPayment";
import axios from "axios";
import { useAuthStore } from "../store/authStore";

function VisaPayment() {
  const location = useLocation();
  const navigate = useNavigate();

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

      await axios.post(`${import.meta.env.VITE_API_URL}/visa/apply`, payload);

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
        <h2 className="fw-bold">Confirm & Pay</h2>
        <p>Please confirm your visa details and make payment.</p>

        <div className="mt-4">
          <h5>Personal Information</h5>
          <p><strong>Full Name:</strong> {formData.fullName}</p>
          <p><strong>WhatsApp Number:</strong> {formData.phoneNumber}</p>

          <h5 className="mt-4">Visa Details</h5>
          <p><strong>Country:</strong> {selectedCountry}</p>
          <p><strong>Visa Type:</strong> {selectedVisaType}</p>
          {processingTime && <p><strong>Processing Time:</strong> {processingTime}</p>}
          <p><strong>Fee:</strong> ₦{fee.toLocaleString()}</p>

          <h5 className="mt-4">Documents</h5>
          {touristRequirements.map((req, idx) => (
            <div key={idx} className="mb-2">
              <strong>{req.label}:</strong>
              {formData[req.label] ? (
                (Array.isArray(formData[req.label]) ? formData[req.label] : [formData[req.label]]).map((f, i) => (
                  <div key={i} style={{ marginLeft: "20px" }}>
                    {f.failed ? (
                      <span style={{ color: "red" }}>{f.originalName} (Upload failed)</span>
                    ) : (
                      typeof f === "string" ? f : (f.originalName || decodeURIComponent(f.fileUrl.split("/").pop().split("?")[0]))
                    )}
                  </div>
                ))
              ) : (
                <div style={{ marginLeft: "20px" }}>Not uploaded</div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-5">
          <button
            className="btn btn-secondary me-3"
            onClick={() =>
              navigate("/visaprocessing", {
                state: { formData, selectedCountry, touristRequirements, fee, processingTime },
              })
            }
          >
            Back
          </button>

          <PaystackPayment
            amount={fee} 
            email="ishakad041@example.com"
            fullName={formData.fullName}
            onSuccess={handlePaymentSuccess}
          />
        </div>
      </div>
    </div>
  );
}

export default VisaPayment;