import React from "react";
import { usePaystackPayment } from "react-paystack";
import { useAuthStore } from "../store/authStore";

export default function PaystackPayment({
  amount,
  fullName,
  onSuccess,
  buttonText = "Pay Now",
  className,
  style,
}) {
  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

  // Get logged-in user email from auth store
  const user = useAuthStore((state) => state.user);
  const email = user?.email;

  // If no email, do not render the Paystack button
  if (!email) {
    return (
      <p className="text-danger mt-3">
        You must be logged in to make a payment.
      </p>
    );
  }

  // Validate amount
 if (!amount || isNaN(amount) || Number(amount) <= 0) {
    console.error("Invalid amount for Paystack:", amount);
    return (
      <p className="text-danger mt-3">
        Invalid payment amount.
      </p>
    );
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.error("Invalid email format for Paystack:", email);
    return (
      <p className="text-danger mt-3">
        Invalid email address for payment.
      </p>
    );
  }

  const config = {
    email,
    amount: Math.floor(Number(amount) * 100), // Paystack requires kobo, ensure it's an integer
    currency: 'NGN', // Explicitly set currency
    metadata: {
      fullName,
      custom_fields: [
        {
          display_name: "Full Name",
          variable_name: "full_name",
          value: fullName
        }
      ]
    },
    publicKey,
    onSuccess: (ref) => onSuccess(ref),
    onClose: () => alert("Transaction was not completed"),
  };

  const initializePayment = usePaystackPayment(config);

  // Debug logging
  console.log("Paystack config:", {
    email,
    amount: amount * 100,
    fullName,
    publicKey: publicKey ? "Present" : "Missing"
  });

  return (
    <button
      onClick={() => initializePayment()}
      className={className}
      style={style}
    >
      {buttonText}
    </button>
  );
}
