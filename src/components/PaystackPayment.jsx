import { PaystackButton } from "react-paystack";

export default function PaystackPayment({
  amount,
  email,
  fullName,
  onSuccess,
}) {
  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

  const componentProps = {
    email,
    amount: amount * 100, // convert Naira → kobo here
    metadata: { fullName },
    publicKey,
    text: "Pay Visa Fee",
    onSuccess: (ref) => onSuccess(ref),
    onClose: () => alert("Transaction was not completed"),
  };
  return (
    <PaystackButton
      {...componentProps}
      className="btn btn-success w-100 py-3 mt-3"
    />
  );
}
