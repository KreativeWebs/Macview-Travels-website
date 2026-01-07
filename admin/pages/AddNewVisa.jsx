import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import adminAxios from "../src/api/adminAxios.js";

function AddNewVisa() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    destinationCountry: "",
    status: "received"
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.destinationCountry.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      const res = await adminAxios.post("/visa-applications", formData);

      if (res.status === 201) {
        toast.success("Visa application added successfully!");
        navigate("/admin/visa");
      }
    } catch (error) {
      console.error("Error adding visa application:", error);
      toast.error("Failed to add visa application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-xxl" style={{ paddingTop: "150px" }}>
      <div className="container">
        <h1 className="text-start" style={{ fontFamily: "Raleway" }}>
          Add New Visa Application
        </h1>
        <p>Add a new visa application directly from the admin dashboard.</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Visa Name (Full Name)</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="form-control"
              required
              placeholder="Enter visa name"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Country</label>
            <input
              type="text"
              name="destinationCountry"
              value={formData.destinationCountry}
              onChange={handleInputChange}
              className="form-control"
              required
              placeholder="Enter destination country"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="form-select"
              required
            >
              <option value="received">Received</option>
              <option value="processing">Processing</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-secondary py-3 px-4 mt-4"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add New Visa"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddNewVisa;
