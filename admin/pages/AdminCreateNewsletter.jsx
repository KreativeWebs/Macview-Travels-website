import React from "react";
import { useState } from "react";
import adminAxios from "../src/api/adminAxios.js";
import { toast } from "react-toastify";

export default function AdminCreateNewsletter() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sendNewsletter = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await adminAxios.post("/newsletter/send-newsletter", {
        subject,
        message,
      });

      toast.success("Newsletter sent!");
      setSubject("");
      setMessage("");
    } catch (error) {
      toast.error("Failed to send newsletter");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header"><h4>Create Newsletter</h4></div>
      <div className="card-body">
        <form onSubmit={sendNewsletter}>
          <div className="mb-3">
            <label className="form-label">Subject</label>
            <input
              className="form-control"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Message</label>
            <textarea
              rows="5"
              className="form-control"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>

          <button className="btn btn-primary" disabled={loading}>
            {loading ? "Sending..." : "Send Newsletter"}
          </button>
        </form>
      </div>
    </div>
  );
}
