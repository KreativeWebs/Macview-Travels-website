import React from "react";
import { useState, useEffect } from "react";
import adminAxios from "../src/api/adminAxios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function VisaRequirements() {
  const [requirements, setRequirements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [requirementToDelete, setRequirementToDelete] = useState(null);

  useEffect(() => {
    fetchRequirements();
  }, []);

  const fetchRequirements = async () => {
    try {
      setLoading(true);
      const response = await adminAxios.get("/visa-requirements");
      setRequirements(response.data.requirements || []);
    } catch (error) {
      console.error("Error fetching visa requirements:", error);
      toast.error("Failed to fetch visa requirements");
      setRequirements([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!requirementToDelete) return;

    try {
      await adminAxios.delete(`/visa-requirements/${requirementToDelete._id}`);
      toast.success("Visa requirement deleted successfully");
      fetchRequirements();
      setShowDeleteModal(false);
      setRequirementToDelete(null);
    } catch (error) {
      console.error("Error deleting visa requirement:", error);
      toast.error("Failed to delete visa requirement");
    }
  };

  const openDeleteModal = (requirement) => {
    setRequirementToDelete(requirement);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setRequirementToDelete(null);
  };

  return (
    <div className="container-fluid">
      {/* Page Title */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Visa Requirements Management</h2>
        <Link to="/visa-requirements/add" className="btn btn-primary">
          <i className="fas fa-plus me-2"></i>
          Add New Requirement
        </Link>
      </div>

      {/* Requirements Table */}
      <div className="bg-white rounded shadow-sm">
        {loading ? (
          <div className="p-4 text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : requirements.length === 0 ? (
          <div className="p-4 text-center">
            <p className="text-muted mb-3">No visa requirements found</p>
            <Link to="/visa-requirements/add" className="btn btn-outline-primary">
              Add First Requirement
            </Link>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th className="border-0 fw-semibold">Country</th>
                  <th className="border-0 fw-semibold">Visa Types</th>
                  <th className="border-0 fw-semibold">Requirements</th>
                  <th className="border-0 fw-semibold">Last Updated</th>
                  <th className="border-0 fw-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {requirements.map((requirement) => (
                  <tr key={requirement._id}>
                    <td className="fw-medium">{requirement.country}</td>
                    <td>
                      {requirement.visaTypes.map((visaType, index) => (
                        <div key={index} className="mb-1">
                          <span className="badge bg-primary me-2">{visaType.name}</span>
                          <small className="text-muted">
                            ₦{visaType.fee} | {visaType.processingTime}
                          </small>
                        </div>
                      ))}
                    </td>
                    <td>
                      {requirement.visaTypes.map((visaType, index) => (
                        <div key={index} className="mb-2">
                          <strong>{visaType.name}:</strong>
                          <ul className="list-unstyled ms-3 mb-0 small">
                            {visaType.requirements.map((req, reqIndex) => (
                              <li key={reqIndex}>
                                {req.label} ({req.type}) {req.required ? <span className="text-danger">*</span> : ''}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </td>
                    <td>
                      <small className="text-muted">
                        {new Date(requirement.updatedAt).toLocaleDateString()}
                      </small>
                    </td>
                    <td className="text-center">
                      <div className="btn-group" role="group">
                        <Link
                          to={`/visa-requirements/edit/${requirement._id}`}
                          className="btn btn-sm btn-outline-primary"
                          title="Edit"
                        >
                          <i className="fas fa-edit"></i>
                        </Link>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => openDeleteModal(requirement)}
                          title="Delete"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button type="button" className="btn-close" onClick={closeDeleteModal}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete visa requirements for <strong>{requirementToDelete?.country}</strong>?</p>
                <p className="text-danger small">This action cannot be undone.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeDeleteModal}>
                  Cancel
                </button>
                <button type="button" className="btn btn-danger" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
