import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPackageById } from "../api/packages";
import HeroHeader from "./HeroHeader";

export default function PackageDetails() {
  const { id } = useParams();
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState({});

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

  const handleFileChange = (e, label) => {
    setUploadedFiles({ ...uploadedFiles, [label]: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle booking submission
    console.log("Form data:", formData);
    console.log("Uploaded files:", uploadedFiles);
    // TODO: Implement booking logic
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
                    {packageData.requirements && packageData.requirements.map((req, index) => (
                      <div key={index} className="mb-3">
                        <label className="form-label">
                          {req.label}
                          {req.description && (
                            <small className="text-muted d-block">{req.description}</small>
                          )}
                        </label>
                        {req.type === "text" ? (
                          <input
                            type="text"
                            className="form-control"
                            value={formData[req.label] || ""}
                            onChange={(e) => handleInputChange(e, req.label)}
                            required
                          />
                        ) : (
                          <input
                            type="file"
                            className="form-control"
                            onChange={(e) => handleFileChange(e, req.label)}
                            accept="image/*,.pdf,.doc,.docx"
                            required
                          />
                        )}
                      </div>
                    ))}

                    <div className="mb-3">
                      <label className="form-label">Number of Persons</label>
                      <input
                        type="number"
                        className="form-control"
                        min="1"
                        max={packageData.persons}
                        defaultValue="1"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Travel Date</label>
                      <input
                        type="date"
                        className="form-control"
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>

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
