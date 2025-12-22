import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PaystackPayment from "../components/PaystackPayment";
import axios from "axios";
import { useAuthStore } from "../store/authStore";
import { useState, useEffect } from "react";

function PackageConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state;

  if (!data) {
    navigate("/packages");
    return null;
  }

  const { formData, packageData, travelDate, discountedPrice, promoApplied } = data;

  const [convertedAmount, setConvertedAmount] = useState(discountedPrice || packageData.price);
  const [isConverting, setIsConverting] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const convertCurrency = async () => {
      if (packageData.currency === "USD" && isMounted) {
        setIsConverting(true);
        try {
          // Check for cached exchange rate (valid for 24 hours to reduce API calls)
          const cachedRate = localStorage.getItem('exchangeRate');
          const cachedTime = localStorage.getItem('exchangeRateTime');
          const now = Date.now();
          const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

          let rate;
          if (cachedRate && cachedTime && (now - parseInt(cachedTime)) < twentyFourHours) {
            rate = parseFloat(cachedRate);
            console.log('Using cached exchange rate:', rate);
          } else {
            console.log('Fetching new exchange rate from API');
            try {
              const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/packages/exchange-rate`, {
                timeout: 10000 // 10 second timeout
              });
              rate = response.data.rate;
              // Cache the rate for 24 hours
              localStorage.setItem('exchangeRate', rate.toString());
              localStorage.setItem('exchangeRateTime', now.toString());
              console.log('Cached new exchange rate:', rate);
            } catch (apiError) {
              console.error("API call failed, using fallback rate:", apiError);
              // Use cached rate if available, otherwise use fallback
              if (cachedRate) {
                rate = parseFloat(cachedRate);
                console.log('Using old cached rate as fallback:', rate);
              } else {
                throw new Error('No cached rate available');
              }
            }
          }

          if (isMounted) {
            const nairaAmount = Math.round((discountedPrice || packageData.price) * rate);
            setConvertedAmount(nairaAmount);
          }
        } catch (error) {
          console.error("Error in currency conversion:", error);
          // Use a fallback rate if all else fails (approximate USD to NGN rate)
          if (isMounted) {
            const fallbackRate = 1500; // Approximate fallback rate
            console.log('Using hardcoded fallback exchange rate:', fallbackRate);
            const nairaAmount = Math.round((discountedPrice || packageData.price) * fallbackRate);
            setConvertedAmount(nairaAmount);
          }
        } finally {
          if (isMounted) {
            setIsConverting(false);
          }
        }
      }
    };

    convertCurrency();

    return () => {
      isMounted = false;
    };
  }, [packageData.currency, packageData.price, discountedPrice]);

  const handlePaymentSuccess = async (paymentRef) => {
    try {
      // Build documents array for backend
      const documents = [];

      packageData.requirements.forEach((req) => {
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

      const payload = {
        fullName: formData.fullName,
        email: user?.email,
        whatsappNumber: formData.whatsappNumber,
        travelDate,
        packageId: packageData._id,
        packageTitle: packageData.title,
        packagePrice: packageData.price,
        packageCurrency: packageData.currency,
        documents,
        payment: {
          status: "paid",
          provider: "paystack",
          transactionId: paymentRef.reference,
          amount: convertedAmount,
        },
        discountApplied: promoApplied,
        discountPercentage: promoApplied ? packageData.discountPercentage : 0,
        discountedPrice: promoApplied ? discountedPrice : null,
      };

      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/packages/book`, payload);

      navigate("/package-success", {
        state: { name: formData.fullName, packageTitle: packageData.title },
      });
    } catch (error) {
      console.error("Error submitting package booking:", error);
      alert("Failed to submit package booking. Please contact support.");
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
        <p>Please confirm your package booking details and make payment.</p>

        <div className="mt-4">
          <h5>Personal Information</h5>
          <p><strong>Full Name:</strong> {formData.fullName}</p>
          <p><strong>WhatsApp Number:</strong> {formData.whatsappNumber}</p>
          <p><strong>Travel Date:</strong> {new Date(travelDate).toLocaleDateString()}</p>

          <h5 className="mt-4">Package Details</h5>
          <p><strong>Package:</strong> {packageData.title}</p>
          <p><strong>City:</strong> {packageData.city}</p>
          <p><strong>Duration:</strong> {packageData.nights} Nights</p>
          <p><strong>Capacity:</strong> {packageData.persons} Persons</p>
          <p><strong>Price:</strong> {packageData.currency === "NGN" ? "₦" : "$"}{packageData.price.toLocaleString()}</p>
          {promoApplied && discountedPrice && (
            <p><strong>Discounted Price:</strong> {packageData.currency === "NGN" ? "₦" : "$"}{discountedPrice.toLocaleString()} ({packageData.discountPercentage}% off)</p>
          )}

          <h5 className="mt-4">Documents</h5>
          {packageData.requirements.map((req, idx) => (
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
              navigate(-1, {
                state: { formData, packageData },
              })
            }
          >
            Back
          </button>

          {isConverting ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Converting currency...</span>
              </div>
              <p className="mt-2">Converting currency...</p>
            </div>
          ) : (
            <PaystackPayment
              amount={convertedAmount}
              buttonText="Pay for Package"
              email={formData.email}
              fullName={formData.fullName}
              onSuccess={handlePaymentSuccess}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default PackageConfirmation;
