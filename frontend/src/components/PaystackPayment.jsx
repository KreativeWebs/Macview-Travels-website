import React from "react";
import { PaystackButton } from "react-paystack";
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

  const componentProps = {
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
    text: buttonText,
    onSuccess: (ref) => onSuccess(ref),
    onClose: () => alert("Transaction was not completed"),
  };

  // Debug logging
  console.log("Paystack component props:", {
    email,
    amount: amount * 100,
    fullName,
    publicKey: publicKey ? "Present" : "Missing"
  });

  return (
    <PaystackButton
      {...componentProps}
      className={className}
      style={{ borderRadius: "3px", backgroundColor: "#175aa1", color: "#fff"}}
    />
  );
}
