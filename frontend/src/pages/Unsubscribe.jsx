import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const API_BASE_URL = "VITE_API_BASE_URL/api";

function Unsubscribe() {
  const { email } = useParams();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const hasUnsubscribed = useRef(false); // 🔒 prevents double call

  useEffect(() => {
    const unsubscribe = async () => {
      if (hasUnsubscribed.current) return;
      hasUnsubscribed.current = true;

      try {
        const response = await axios.delete(
          `${API_BASE_URL}/newsletter/unsubscribe/${email}`
        );
        setMessage(response.data.message);
        toast.success("Unsubscribed successfully!");
      } catch (error) {
        const msg =
          error?.response?.data?.message || "Failed to unsubscribe";
        setMessage(msg);
        toast.error(msg);
      } finally {
        setLoading(false);
      }
    };

    if (email) unsubscribe();
  }, [email]);

  return (
    <div className="container-xxl py-5">
      <div className="container text-center">
        <h1 className="mb-4">Newsletter Unsubscribe</h1>
        {loading ? (
          <div className="spinner-border text-primary" />
        ) : (
          <p className="lead">{message}</p>
        )}
      </div>
    </div>
  );
}

export default Unsubscribe;
