import { useState } from "react";
import { toast } from "react-toastify";
import adminAxios from "../../api/adminAxios";

export default function AddNewPackage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    city: "",
    nights: "",
    persons: "",
    price: "",
    currency: "NGN",
    backgroundImage: null,
    inclusions: [],
    requirements: [],
  });

  const [inclusionInput, setInclusionInput] = useState("");
  const [requirementInput, setRequirementInput] = useState({
    label: "",
    type: "text",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, backgroundImage: e.target.files[0] });
  };

  const addInclusion = () => {
    if (inclusionInput.trim()) {
      setFormData({
        ...formData,
        inclusions: [...formData.inclusions, inclusionInput.trim()],
      });
      setInclusionInput("");
    }
  };

  const removeInclusion = (index) => {
    setFormData({
      ...formData,
      inclusions: formData.inclusions.filter((_, i) => i !== index),
    });
  };

  const addRequirement = () => {
    if (requirementInput.label.trim()) {
      setFormData({
        ...formData,
        requirements: [...formData.requirements, requirementInput],
      });
      setRequirementInput({ label: "", type: "text", description: "" });
    }
  };

  const removeRequirement = (index) => {
    setFormData({
      ...formData,
      requirements: formData.requirements.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "inclusions" || key === "requirements") {
          submitData.append(key, JSON.stringify(formData[key]));
        } else if (key === "backgroundImage" && formData[key]) {
          submitData.append(key, formData[key]);
        } else if (key !== "backgroundImage") {
          submitData.append(key, formData[key]);
        }
      });

      await adminAxios.post("/packages", submitData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Package created successfully!");
      // Reset form
      setFormData({
        title: "",
        description: "",
        city: "",
        nights: "",
        persons: "",
        price: "",
        currency: "NGN",
        backgroundImage: null,
        inclusions: [],
        requirements: [],
      });
    } catch (error) {
      console.error("Error creating package:", error);
      toast.error("Failed to create package");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Add New Package</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Title</label>
                      <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">City</label>
                      <input
                        type="text"
                        className="form-control"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    required
                  />
                </div>

                <div className="row">
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label className="form-label">Nights</label>
                      <input
                        type="number"
                        className="form-control"
                        name="nights"
                        value={formData.nights}
                        onChange={handleInputChange}
                        min="1"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label className="form-label">Persons</label>
                      <input
                        type="number"
                        className="form-control"
                        name="persons"
                        value={formData.persons}
                        onChange={handleInputChange}
                        min="1"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label className="form-label">Price</label>
                      <input
                        type="number"
                        className="form-control"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label className="form-label">Currency</label>
                      <select
                        className="form-control"
                        name="currency"
                        value={formData.currency}
                        onChange={handleInputChange}
                      >
                        <option value="NGN">NGN</option>
                        <option value="USD">USD</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Background Image</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Inclusions</label>
                  <div className="input-group mb-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Add inclusion"
                      value={inclusionInput}
                      onChange={(e) => setInclusionInput(e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={addInclusion}
                    >
                      Add
                    </button>
                  </div>
                  <ul className="list-group">
                    {formData.inclusions.map((inclusion, index) => (
                      <li
                        key={index}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        {inclusion}
                        <button
                          type="button"
                          className="btn btn-sm btn-danger"
                          onClick={() => removeInclusion(index)}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-3">
                  <label className="form-label">Requirements</label>
                  <div className="row mb-2">
                    <div className="col-md-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Label"
                        value={requirementInput.label}
                        onChange={(e) =>
                          setRequirementInput({
                            ...requirementInput,
                            label: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="col-md-3">
                      <select
                        className="form-control"
                        value={requirementInput.type}
                        onChange={(e) =>
                          setRequirementInput({
                            ...requirementInput,
                            type: e.target.value,
                          })
                        }
                      >
                        <option value="text">Text</option>
                        <option value="upload">Upload</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Description (optional)"
                        value={requirementInput.description}
                        onChange={(e) =>
                          setRequirementInput({
                            ...requirementInput,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="col-md-1">
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={addRequirement}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                  <ul className="list-group">
                    {formData.requirements.map((req, index) => (
                      <li
                        key={index}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <div>
                          <strong>{req.label}</strong> ({req.type})
                          {req.description && (
                            <div className="text-muted small">
                              {req.description}
                            </div>
                          )}
                        </div>
                        <button
                          type="button"
                          className="btn btn-sm btn-danger"
                          onClick={() => removeRequirement(index)}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Package"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
