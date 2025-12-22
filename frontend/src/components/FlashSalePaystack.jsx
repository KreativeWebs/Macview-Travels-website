import React from "react";
import { PaystackButton } from "react-paystack";
import { useAuthStore } from "../store/authStore";

export default function PaystackPayment({
  amount,
  fullName,
  onSuccess,
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

  const componentProps = {
    email,
    amount: amount * 100, // Paystack requires kobo
    metadata: { fullName },
    publicKey,
    text: "Pay Visa Fee",
    onSuccess: (ref) => onSuccess(ref),
    onClose: () => alert("Transaction was not completed"),
  };

  return (
    <PaystackButton
      {...componentProps}
      className="btn btn-success w-100 mt-3 pt-3 pb-3"
    />
  );
}
