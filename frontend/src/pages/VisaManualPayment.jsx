import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/authStore";

function VisaManualPayment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  const [receiptFile, setReceiptFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!state) {
    navigate("/visa-processing");
    return null;
  }

  const { formData, selectedCountry, selectedVisaType, touristRequirements, fee, processingTime } = state;

  // Hardcoded account details - TODO: Move to environment variables
  const accountDetails = {
    bankName: "First Bank of Nigeria",
    accountName: "Macview Travels Limited",
    accountNumber: "1234567890", // Replace with actual account number
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size must be less than 10MB");
        return;
      }
      setReceiptFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!receiptFile) {
      toast.error("Please upload your payment receipt");
      return;
    }

    try {
      setUploading(true);

      // Upload receipt file
      const formDataUpload = new FormData();
      formDataUpload.append("file", receiptFile);

      const baseURL = import.meta.env.DEV ? "http://localhost:5000" : (import.meta.env.VITE_API_BASE_URL || "https://macview-travels-website-production.up.railway.app");
      const uploadRes = await fetch(`${baseURL}/api/visa/upload-document`, {
        method: "POST",
        body: formDataUpload,
      });

      if (!uploadRes.ok) {
        const errorData = await uploadRes.json().catch(() => ({}));
        console.error("Upload failed:", uploadRes.status, errorData);
        throw new Error(`Failed to upload receipt: ${errorData.error || uploadRes.statusText}`);
      }

      const uploadData = await uploadRes.json();
      const receiptUrl = uploadData.fileUrl;

      setUploading(false);
      setSubmitting(true);

      // Get user email from auth store
      const user = useAuthStore.getState().user;

      // Prepare application data
      const applicationData = {
        fullName: formData.fullName,
        email: user?.email || "",
        phoneNumber: `${formData.countryCode}${formData.phoneNumber}`,
        destinationCountry: selectedCountry,
        visaType: selectedVisaType,
        documents: touristRequirements.map(req => ({
          label: req.label,
          fileUrl: formData[req.label]?.fileUrl || "",
          textValue: formData[req.label]?.textValue || "",
        })),
        payment: {
          provider: "manual",
          receiptUrl,
          amount: fee,
          status: "pending", // Will be set to "paid" in backend
        },
        processingTime,
      };

      // Submit application
      const submitRes = await fetch(`${baseURL}/api/visa/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applicationData),
      });

      if (!submitRes.ok) {
        throw new Error("Failed to submit application");
      }

      const submitData = await submitRes.json();

      toast.success("Application submitted successfully!");
      navigate("/visa-success", {
        state: {
          applicationId: submitData.data._id,
          paymentMethod: "manual",
        },
      });

    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setUploading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="container-xxl" style={{ paddingTop: "150px" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="bg-white p-4 rounded shadow-sm">
              <h2 className="text-center mb-4">Complete Your Payment</h2>

              {/* Account Details */}
              <div className="mb-4">
                <h4 className="mb-3">Bank Transfer Details</h4>
                <div className="border rounded p-3 bg-light">
                  <div className="row">
                    <div className="col-md-4">
                      <strong>Bank Name:</strong>
                      <p>{accountDetails.bankName}</p>
                    </div>
                    <div className="col-md-4">
                      <strong>Account Name:</strong>
                      <p>{accountDetails.accountName}</p>
                    </div>
                    <div className="col-md-4">
                      <strong>Account Number:</strong>
                      <p className="fs-4 fw-bold text-primary">{accountDetails.accountNumber}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <strong>Amount to Pay:</strong>
                    <p className="fs-5 fw-bold text-success">₦{fee.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="mb-4">
                <h5>Payment Instructions:</h5>
                <ol>
                  <li>Transfer the exact amount (₦{fee.toLocaleString()}) to the account details above</li>
                  <li>Take a screenshot or save the payment receipt from your banking app</li>
                  <li>Upload the receipt below</li>
                  <li>Click "Submit Application" to complete your visa application</li>
                </ol>
                <p className="text-muted">
                  <small>
                    Your application will be processed once the payment is confirmed.
                    Processing time: {processingTime}
                  </small>
                </p>
              </div>

              {/* Receipt Upload Form */}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Upload Payment Receipt *</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    required
                  />
                  <small className="text-muted">Accepted formats: Images, PDF. Max size: 10MB</small>
                </div>

                {receiptFile && (
                  <div className="mb-3">
                    <p><strong>Selected file:</strong> {receiptFile.name}</p>
                  </div>
                )}

                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/visa-processing")}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={uploading || submitting}
                  >
                    {uploading ? "Uploading..." : submitting ? "Submitting..." : "Submit Application"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisaManualPayment;
