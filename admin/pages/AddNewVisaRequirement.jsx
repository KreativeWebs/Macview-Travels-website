import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import adminAxios from "../src/api/adminAxios";
import { toast } from "react-toastify";

export default function AddNewVisaRequirement() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    country: "",
    visaTypes: [
      {
        name: "",
        fee: 0,
        processingTime: "",
        requirements: [
          {
            label: "",
            type: "file",
            required: true,
            hint: ""
          }
        ]
      }
    ]
  });

  const handleCountryChange = (e) => {
    setFormData({ ...formData, country: e.target.value });
  };

  const handleVisaTypeChange = (index, field, value) => {
    const updatedVisaTypes = [...formData.visaTypes];
    updatedVisaTypes[index][field] = value;
    setFormData({ ...formData, visaTypes: updatedVisaTypes });
  };

  const handleRequirementChange = (visaTypeIndex, reqIndex, field, value) => {
    const updatedVisaTypes = [...formData.visaTypes];
    updatedVisaTypes[visaTypeIndex].requirements[reqIndex][field] = value;
    setFormData({ ...formData, visaTypes: updatedVisaTypes });
  };

  const addVisaType = () => {
    setFormData({
      ...formData,
      visaTypes: [
        ...formData.visaTypes,
        {
          name: "",
          fee: 0,
          processingTime: "",
          requirements: [
            {
              label: "",
              type: "file",
              required: true,
              hint: ""
            }
          ]
        }
      ]
    });
  };

  const removeVisaType = (index) => {
    if (formData.visaTypes.length > 1) {
      const updatedVisaTypes = formData.visaTypes.filter((_, i) => i !== index);
      setFormData({ ...formData, visaTypes: updatedVisaTypes });
    }
  };

  const addRequirement = (visaTypeIndex) => {
    const updatedVisaTypes = [...formData.visaTypes];
    updatedVisaTypes[visaTypeIndex].requirements.push({
      label: "",
      type: "file",
      required: true,
      hint: ""
    });
    setFormData({ ...formData, visaTypes: updatedVisaTypes });
  };

  const removeRequirement = (visaTypeIndex, reqIndex) => {
    const updatedVisaTypes = [...formData.visaTypes];
    if (updatedVisaTypes[visaTypeIndex].requirements.length > 1) {
      updatedVisaTypes[visaTypeIndex].requirements = updatedVisaTypes[visaTypeIndex].requirements.filter((_, i) => i !== reqIndex);
      setFormData({ ...formData, visaTypes: updatedVisaTypes });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.country.trim()) {
      toast.error("Country is required");
      return;
    }

    for (let i = 0; i < formData.visaTypes.length; i++) {
      const visaType = formData.visaTypes[i];
      if (!visaType.name.trim()) {
        toast.error(`Visa type name is required for visa type ${i + 1}`);
        return;
      }
      if (!visaType.processingTime.trim()) {
        toast.error(`Processing time is required for ${visaType.name}`);
        return;
      }

      for (let j = 0; j < visaType.requirements.length; j++) {
        const req = visaType.requirements[j];
        if (!req.label.trim()) {
          toast.error(`Requirement label is required for ${visaType.name} - requirement ${j + 1}`);
          return;
        }
      }
    }

    try {
      setLoading(true);

      if (isEdit && requirementId) {
        // Update existing requirement
        await adminAxios.put(`/visa-requirements/${requirementId}`, formData);
        toast.success("Visa requirement updated successfully");
      } else {
        // Create new requirement
        await adminAxios.post("/visa-requirements", formData);
        toast.success("Visa requirement added successfully");
      }

      navigate("/admin/visa-requirements");
    } catch (error) {
      console.error("Error saving visa requirement:", error);
      toast.error("Failed to save visa requirement");
    } finally {
      setLoading(false);
    }
  };

  // Edit mode: fetch existing requirement when requirementId present
  const { id: requirementId } = useParams();
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const loadRequirement = async (id) => {
      try {
        setLoading(true);
        const res = await adminAxios.get(`/visa-requirements/${id}`);
        const req = res.data.requirement;
        if (req) {
          // Populate form with data from server
          setFormData({
            country: req.country || "",
            visaTypes: Array.isArray(req.visaTypes) && req.visaTypes.length > 0 ? req.visaTypes : [
              {
                name: "",
                fee: 0,
                processingTime: "",
                requirements: [
                  { label: "", type: "file", required: true, hint: "" }
                ]
              }
            ]
          });
          setIsEdit(true);
        }
      } catch (err) {
        console.error("Error loading visa requirement (admin):", err);
        // Try fallback to public endpoint (no auth required) so form can still be populated
        try {
          const publicRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/visa/requirements`);
          if (publicRes.ok) {
            const publicData = await publicRes.json();
            const found = Array.isArray(publicData.requirements) ? publicData.requirements.find(r => String(r._id) === String(id)) : null;
            if (found) {
              setFormData({
                country: found.country || "",
                visaTypes: Array.isArray(found.visaTypes) && found.visaTypes.length > 0 ? found.visaTypes : [
                  { name: "", fee: 0, processingTime: "", requirements: [{ label: "", type: "file", required: true, hint: "" }] }
                ]
              });
              setIsEdit(true);
              toast.info("Loaded requirement from public data. Save will still require admin login.");
            } else {
              toast.error("Visa requirement not found");
            }
          } else {
            toast.error("Failed to load visa requirement for editing");
          }
        } catch (publicErr) {
          console.error("Public fallback error:", publicErr);
          toast.error("Failed to load visa requirement for editing");
        }
      } finally {
        setLoading(false);
      }
    };

    if (requirementId) loadRequirement(requirementId);
  }, [requirementId]);

  return (
    <div className="container-fluid">
      {/* Page Title */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Add New Visa Requirement</h2>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => navigate("/admin/visa-requirements")}
        >
          <i className="fas fa-arrow-left me-2"></i>
          Back to Requirements
        </button>
      </div>

      {/* Form */}
      <div className="bg-white p-4 rounded shadow-sm">
        <form onSubmit={handleSubmit}>
          {/* Country */}
          <div className="mb-4">
            <label className="form-label fw-semibold">Country *</label>
            <input
              type="text"
              className="form-control"
              value={formData.country || ""}
              onChange={handleCountryChange}
              placeholder="Enter country name"
              required
            />
          </div>

          {/* Visa Types */}
          {formData.visaTypes.map((visaType, visaTypeIndex) => (
            <div key={visaTypeIndex} className="border rounded p-3 mb-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Visa Type {visaTypeIndex + 1}</h5>
                {formData.visaTypes.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => removeVisaType(visaTypeIndex)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                )}
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-4">
                  <label className="form-label">Visa Type Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={visaType.name || ""}
                    onChange={(e) => handleVisaTypeChange(visaTypeIndex, "name", e.target.value)}
                    placeholder="e.g., tourist, business"
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Fee (₦)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={visaType.fee ?? 0}
                    onChange={(e) => handleVisaTypeChange(visaTypeIndex, "fee", parseFloat(e.target.value) || 0)}
                    min="0"
                    step="1000"
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Processing Time *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={visaType.processingTime || ""}
                    onChange={(e) => handleVisaTypeChange(visaTypeIndex, "processingTime", e.target.value)}
                    placeholder="e.g., 3-7 days"
                    required
                  />
                </div>
              </div>

              {/* Requirements */}
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <label className="form-label fw-semibold">Requirements</label>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => addRequirement(visaTypeIndex)}
                  >
                    <i className="fas fa-plus me-1"></i>
                    Add Requirement
                  </button>
                </div>

                {visaType.requirements.map((requirement, reqIndex) => (
                  <div key={reqIndex} className="border rounded p-3 mb-2">
                    <div className="row g-3">
                      <div className="col-md-4">
                        <label className="form-label">Label *</label>
                        <input
                          type="text"
                          className="form-control"
                          value={requirement.label || ""}
                          onChange={(e) => handleRequirementChange(visaTypeIndex, reqIndex, "label", e.target.value)}
                          placeholder="e.g., Passport copy"
                          required
                        />
                      </div>
                      <div className="col-md-2">
                        <label className="form-label">Type</label>
                        <select
                          className="form-select"
                          value={requirement.type || "file"}
                          onChange={(e) => handleRequirementChange(visaTypeIndex, reqIndex, "type", e.target.value)}
                        >
                          <option value="file">File</option>
                          <option value="text">Text</option>
                          <option value="date">Date</option>
                        </select>
                      </div>
                      <div className="col-md-2">
                        <label className="form-label">Required</label>
                        <div className="form-check mt-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={Boolean(requirement.required)}
                            onChange={(e) => handleRequirementChange(visaTypeIndex, reqIndex, "required", e.target.checked)}
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <label className="form-label">Hint (Optional)</label>
                        <input
                          type="text"
                          className="form-control"
                          value={requirement.hint || ""}
                          onChange={(e) => handleRequirementChange(visaTypeIndex, reqIndex, "hint", e.target.value)}
                          placeholder="Optional guidance"
                        />
                      </div>
                      <div className="col-md-1 d-flex align-items-end">
                        {visaType.requirements.length > 1 && (
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => removeRequirement(visaTypeIndex, reqIndex)}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Add Visa Type Button */}
          <div className="mb-4">
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={addVisaType}
            >
              <i className="fas fa-plus me-2"></i>
              Add Another Visa Type
            </button>
          </div>

          {/* Submit Button */}
          <div className="d-flex gap-2">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Adding...
                </>
              ) : (
                <>
                  <i className="fas fa-save me-2"></i>
                  Add Requirement
                </>
              )}
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => navigate("/admin/visa-requirements")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
