import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/authStore";
import { countryCodes } from "../data/countryCodes";

function VisaProcessing() {
  const navigate = useNavigate();
  const location = useLocation();

  const prevState = location.state || {};
  const [selectedCountry, setSelectedCountry] = useState(prevState.selectedCountry || "");
  const [visaData, setVisaData] = useState(null);
  const [formData, setFormData] = useState(prevState.formData || {
    fullName: "",
    phoneNumber: "",
    countryCode: "+234",
  });
  const [touristRequirements, setTouristRequirements] = useState(prevState.touristRequirements || []);
  const [fee, setFee] = useState(prevState.fee || 0);
  const [processingTime, setProcessingTime] = useState(prevState.processingTime || "");
  const [uploadProgress, setUploadProgress] = useState({});
  const [selectedFiles, setSelectedFiles] = useState({});

  // Input change for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/visa/upload-document`, {
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
        originalName: file.name, // store real file name
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



  // Fetch visa requirements
  useEffect(() => {
    if (!selectedCountry) return;

    const fetchVisaData = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/visa/requirements/${selectedCountry}`);
        if (!res.ok) throw new Error("Failed to fetch visa requirements");

        const data = await res.json();
        const touristVisa = data.visaTypes.find(v => v.name.toLowerCase() === "tourist");

        if (!touristVisa) {
          toast.error("No Tourist visa available for this country");
          setVisaData(null);
          setTouristRequirements([]);
          setFee(0);
          return;
        }

        setVisaData(data);
        setTouristRequirements(touristVisa.requirements || []);
        setFee(touristVisa.fee || 0);
        setProcessingTime(touristVisa.processingTime || "");
      } catch (error) {
        console.error(error);
        toast.error("Error fetching visa data");
      }
    };

    fetchVisaData();
  }, [selectedCountry]);

  const handleNext = () => {
    if (!formData.fullName || !formData.phoneNumber || !selectedCountry) {
      toast.error("Please fill all required fields");
      return;
    }

    // Check if user is logged in
    const user = useAuthStore.getState().user;
    if (!user || !user.email) {
      toast.error("Please login to continue with your visa application");
      navigate("/");
      return;
    }

    // Check if visaData is loaded
    if (!visaData || !visaData.visaTypes) {
      toast.error("Visa data is still loading. Please wait.");
      return;
    }

    const touristVisa = visaData.visaTypes.find(v => v.name.toLowerCase() === "tourist");

    if (!touristVisa) {
      toast.error("Tourist visa type not found");
      return;
    }

    navigate("/visa-payment", {
      state: {
        formData,
        selectedCountry,
        selectedVisaType: "Tourist",
        touristRequirements: touristVisa.requirements,
        fee: touristVisa.fee,
        processingTime: touristVisa.processingTime,
      },
    });
  };

  return (
    <div className="container-xxl" style={{ paddingTop: "150px" }}>
      <div className="container">
        <h1 className="text-start" style={{ fontFamily: "Raleway" }}>Visa Application</h1>

        <p className="mt-5" style={{ fontWeight: "bold" }}>PERSONAL INFORMATION</p>
        <hr />

        <form>
          <label className="form-label">Full Name <small>(Name to be used on Visa)</small></label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className="form-control"
            required
            style={{ borderRadius: "4px", borderColor: "#c9b5b5ff" }}
          />

          <label className="form-label mt-3">WhatsApp Number</label>
          <div className="input-group">
            <select
              className="form-select"
              name="countryCode"
              value={formData.countryCode || "+234"}
              onChange={handleInputChange}
              style={{ borderRadius: "4px 0 0 4px", borderColor: "#c9b5b5ff", maxWidth: "120px" }}
            >
              {countryCodes.map((country, index) => (
                <option key={index} value={country.code}>
                  {country.flag} {country.code} ({country.name})
                </option>
              ))}
            </select>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Enter phone number without country code"
              required
              style={{ borderRadius: "0 4px 4px 0", borderColor: "#c9b5b5ff" }}
            />
          </div>

          <p className="mt-5" style={{ fontWeight: "bold" }}>VISA DETAILS</p>
          <hr />

          <label className="form-label mt-3">Select Country</label>
          <select
            value={selectedCountry}
            onChange={e => setSelectedCountry(e.target.value)}
            className="form-select"
            required
            style={{ borderRadius: "4px", borderColor: "#c9b5b5ff" }}
          >
            <option value="">Select a country</option>
            <option value="Kenya">Kenya</option>
            <option value="South Africa">South Africa</option>
            <option value="Egypt">Egypt</option>
          </select>

          {touristRequirements.length > 0 && (
            <div className="mt-4">
              <p style={{ fontWeight: "bold" }}>Tourist Visa Requirements</p>
              {touristRequirements.map((req, index) => (
                <div key={index} className="mt-3">
                  <label className="form-label">{req.label}</label>
                  {req.type === "file" ? (
                    <div>
                      <input
                        type="file"
                        name={req.label}
                        multiple // allow multiple files
                        required={req.required}
                        onChange={handleDynamicChange}
                        className="form-control"
                        style={{ borderRadius: "4px", borderColor: "#c9b5b5ff" }}
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
                  ) : (
                    <input
                      type={req.type}
                      name={req.label}
                      value={formData[req.label] || ""}
                      required={req.required}
                      onChange={handleDynamicChange}
                      className="form-control"
                      style={{ borderRadius: "4px", borderColor: "#c9b5b5ff" }}
                    />
                  )}
                </div>
              ))}
              {processingTime && <p><strong>Processing Time:</strong> {processingTime}</p>}
              <p><strong>Fee:</strong> ₦{fee.toLocaleString()}</p>
            </div>
          )}

          <button
            type="button"
            className="btn btn-secondary py-3 px-4 mt-5"
            onClick={handleNext}
            style={{ fontFamily: "Raleway", fontWeight: "600", border: "none", borderRadius: "4px" }}
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
}

export default VisaProcessing;