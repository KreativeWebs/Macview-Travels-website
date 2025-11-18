import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPackageById } from "../api/packages";
import HeroHeader from "./HeroHeader";
import { toast } from "react-toastify";

const API_BASE_URL = "http://localhost:5000/api";

export default function PackageDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    whatsappNumber: "",
  });
  const [travelDate, setTravelDate] = useState("");
  const [uploadProgress, setUploadProgress] = useState({});
  const [selectedFiles, setSelectedFiles] = useState({});

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const data = await getPackageById(id);
        setPackageData(data);
        // Initialize form data based on requirements
        const initialFormData = {};
        data.requirements.forEach((req) => {
          initialFormData[req.label] = "";
        });
        setFormData(initialFormData);
      } catch (error) {
        console.error("Error fetching package:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackage();
  }, [id]);

  const handleInputChange = (e, label) => {
    setFormData({ ...formData, [label]: e.target.value });
  };

  const handleTravelDateChange = (e) => {
    setTravelDate(e.target.value);
  };

  // Upload file to backend (Cloudinary)
  const handleFileUpload = async (file, reqLabel, fileIndex) => {
    const form = new FormData();
    form.append("file", file);

    // Set initial progress
    setUploadProgress(prev => ({
      ...prev,
      [`${reqLabel}-${fileIndex}`]: { status: 'uploading', progress: 0 }
    }));

    try {
      const res = await fetch(`${API_BASE_URL}/packages/upload-document`, {
        method: "POST",
        body: form,
      });

      if (!res.ok) throw new Error("File upload failed");
      const data = await res.json();

      // Update progress to success
      setUploadProgress(prev => ({
        ...prev,
        [`${reqLabel}-${fileIndex}`]: { status: 'success', progress: 100 }
      }));

      return {
        fileUrl: data.fileUrl,
        originalName: file.name,
      };
    } catch (error) {
      console.error("File upload error:", error);
      toast.error("File upload failed");

      // Update progress to failed
      setUploadProgress(prev => ({
        ...prev,
        [`${reqLabel}-${fileIndex}`]: { status: 'failed', progress: 0 }
      }));

      return null;
    }
  };

  // Dynamic input change (text & file)
  const handleDynamicChange = async (e) => {
    const { name, type, files, value } = e.target;

    if (type === "file") {
      if (!files || files.length === 0) return;

      // Store selected files for display
      setSelectedFiles(prev => ({
        ...prev,
        [name]: Array.from(files)
      }));

      const uploadedFiles = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (file.size > 10 * 1024 * 1024) {
          toast.error(`File "${file.name}" is too large! Max 10MB.`);
          uploadedFiles.push({ fileUrl: null, originalName: file.name, failed: true });
          setUploadProgress(prev => ({
            ...prev,
            [`${name}-${i}`]: { status: 'failed', progress: 0 }
          }));
          continue;
        }

        const uploaded = await handleFileUpload(file, name, i);
        uploadedFiles.push(uploaded || { fileUrl: null, originalName: file.name, failed: true });
      }

      setFormData(prev => ({
        ...prev,
        [name]: uploadedFiles.length > 1 ? uploadedFiles : uploadedFiles[0],
      }));

      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.whatsappNumber || !travelDate) {
      toast.error("Please fill all required fields");
      return;
    }

    // Check if all required files are uploaded successfully
    const hasFailedUploads = packageData.requirements.some(req => {
      if (req.type === "upload") {
        const fieldValue = formData[req.label];
        if (Array.isArray(fieldValue)) {
          return fieldValue.some(f => f.failed);
        } else {
          return fieldValue && fieldValue.failed;
        }
      }
      return false;
    });

    if (hasFailedUploads) {
      toast.error("Please ensure all files are uploaded successfully before proceeding");
      return;
    }

    // Navigate to confirmation page
    navigate("/package-confirmation", {
      state: { formData, packageData, travelDate },
    });
  };

  if (loading) {
    return (
      <div>
        <HeroHeader
          heroheaderbg="assets/img/2151747438.jpg"
          heroheadertitle="Package Details"
          pageName="Package Details"
          heroheaderdesc="Book your dream package"
        />
        <div className="container-xxl py-5">
          <div className="container">
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!packageData) {
    return (
      <div>
        <HeroHeader
          heroheaderbg="assets/img/2151747438.jpg"
          heroheadertitle="Package Details"
          pageName="Package Details"
          heroheaderdesc="Book your dream package"
        />
        <div className="container-xxl py-5">
          <div className="container">
            <div className="text-center">
              <h3>Package not found</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <HeroHeader
        heroheaderbg={packageData.backgroundImage}
        heroheadertitle={packageData.title}
        pageName="Package Details"
        heroheaderdesc={packageData.description}
      />

      <div className="container-xxl py-5">
        <div className="container">
          <div className="row">
            {/* Package Image and Basic Info */}
            <div className="col-lg-8">
              <div className="package-detail-card mb-4">
                <img
                  src={packageData.backgroundImage}
                  alt={packageData.title}
                  className="img-fluid rounded mb-4"
                  style={{ width: "100%", height: "400px", objectFit: "cover" }}
                />
                <h2 className="mb-3">{packageData.title}</h2>
                <p className="mb-4">{packageData.description}</p>

                <div className="row mb-4">
                  <div className="col-md-3">
                    <div className="text-center">
                      <i className="fa fa-map-marker-alt text-primary mb-2" style={{ fontSize: "24px" }} />
                      <h5>{packageData.city}</h5>
                      <small>Location</small>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="text-center">
                      <i className="fa fa-calendar-alt text-primary mb-2" style={{ fontSize: "24px" }} />
                      <h5>{packageData.nights} Nights</h5>
                      <small>Duration</small>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="text-center">
                      <i className="fa fa-user text-primary mb-2" style={{ fontSize: "24px" }} />
                      <h5>{packageData.persons} Persons</h5>
                      <small>Capacity</small>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="text-center">
                      <i className="fa fa-money-bill text-primary mb-2" style={{ fontSize: "24px" }} />
                      <h5>{packageData.currency === "NGN" ? "₦" : "$"}{packageData.price.toLocaleString()}</h5>
                      <small>Price</small>
                    </div>
                  </div>
                </div>

                {/* Inclusions */}
                {packageData.inclusions && packageData.inclusions.length > 0 && (
                  <div className="mb-4">
                    <h4 className="mb-3">What's Included</h4>
                    <ul className="list-group">
                      {packageData.inclusions.map((inclusion, index) => (
                        <li key={index} className="list-group-item">
                          <i className="fa fa-check text-success me-2" />
                          {inclusion}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Requirements */}
                {packageData.requirements && packageData.requirements.length > 0 && (
                  <div className="mb-4">
                    <h4 className="mb-3">Requirements</h4>
                    <ul className="list-group">
                      {packageData.requirements.map((req, index) => (
                        <li key={index} className="list-group-item">
                          <i className="fa fa-list text-primary me-2" />
                          {req.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Booking Form */}
            <div className="col-lg-4">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title mb-0">Book This Package</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange(e, "fullName")}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">WhatsApp Number</label>
                      <input
                        type="tel"
                        className="form-control"
                        value={formData.whatsappNumber}
                        onChange={(e) => handleInputChange(e, "whatsappNumber")}
                        placeholder="Enter your WhatsApp number"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Travel Date</label>
                      <input
                        type="date"
                        className="form-control"
                        value={travelDate}
                        onChange={handleTravelDateChange}
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>

                    {packageData.requirements && packageData.requirements.filter(req => req.type === "upload").map((req, index) => (
                      <div key={index} className="mb-3">
                        <label className="form-label">
                          {req.label}
                          {req.description && (
                            <small className="text-muted d-block">{req.description}</small>
                          )}
                        </label>
                        <div>
                          <input
                            type="file"
                            name={req.label}
                            multiple
                            required={req.required}
                            onChange={handleDynamicChange}
                            className="form-control"
                            accept="image/*,.pdf,.doc,.docx"
                          />
                          {selectedFiles[req.label] && selectedFiles[req.label].map((file, fileIndex) => {
                            const progressKey = `${req.label}-${fileIndex}`;
                            const progress = uploadProgress[progressKey];
                            return (
                              <div key={fileIndex} className="mt-2">
                                <small className="text-muted">{file.name}</small>
                                {progress && (
                                  <div className="progress mt-1" style={{ height: '6px' }}>
                                    <div
                                      className={`progress-bar ${progress.status === 'success' ? 'bg-success' : progress.status === 'failed' ? 'bg-danger' : 'bg-primary'}`}
                                      role="progressbar"
                                      style={{ width: `${progress.progress}%` }}
                                      aria-valuenow={progress.progress}
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                    ></div>
                                  </div>
                                )}
                                {progress && progress.status === 'success' && (
                                  <small className="text-success">✓ Uploaded successfully</small>
                                )}
                                {progress && progress.status === 'failed' && (
                                  <small className="text-danger">✗ Upload failed</small>
                                )}
                                {progress && progress.status === 'uploading' && (
                                  <small className="text-primary">Uploading...</small>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}

                    <div className="mb-4">
                      <h5>Total Price: {packageData.currency === "NGN" ? "₦" : "$"}{packageData.price.toLocaleString()}</h5>
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                      Proceed to Payment
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
