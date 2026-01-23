import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import adminAxios from "../src/api/adminAxios";
import { toast } from "react-toastify";

export default function PackagesManagement() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [packageToDelete, setPackageToDelete] = useState(null);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await adminAxios.get("/packages");
      setPackages(response.data.packages || []);
    } catch (error) {
      console.error("Error fetching packages:", error);
      setPackages([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!packageToDelete) return;

    try {
      await adminAxios.delete(`/packages/${packageToDelete._id}`);
      toast.success("Package deleted successfully");
      fetchPackages();
      setShowDeleteModal(false);
      setPackageToDelete(null);
    } catch (error) {
      console.error("Error deleting package:", error);
      toast.error("Failed to delete package");
    }
  };

  const openDeleteModal = (pkg) => {
    setPackageToDelete(pkg);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setPackageToDelete(null);
  };

  const handleReorder = async (packageId, direction) => {
    try {
      // Make API call
      const response = await adminAxios.put("/packages/reorder", { packageId, direction });
      toast.success("Package reordered successfully");

      // Use the updated packages from the response
      if (response.data.packages) {
        setPackages(response.data.packages);
      } else {
        // Fallback to fetch if no packages in response
        fetchPackages();
      }
    } catch (error) {
      console.error("Error reordering package:", error);
      toast.error("Failed to reorder package");
      // Revert on error by fetching fresh data
      fetchPackages();
    }
  };

  if (loading) {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="mb-0">Packages Management</h2>
            <Link to="/packages/add" className="btn btn-primary">
              <i className="fas fa-plus me-2"></i>Add New Package
            </Link>
          </div>
        </div>
      </div>

      {/* Packages Table */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              {packages.length === 0 ? (
                <div className="text-center py-5">
                  <i className="fas fa-suitcase fa-3x text-muted mb-3"></i>
                  <h5 className="text-muted">No packages found</h5>
                  <p className="text-muted">Create your first package to get started</p>
                  <Link to="/packages/add" className="btn btn-primary">
                    <i className="fas fa-plus me-2"></i>Create Package
                  </Link>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>City</th>
                        <th>Price</th>
                        <th>Nights</th>
                        <th>Persons</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {packages.map((pkg) => (
                        <tr key={pkg._id}>
                          <td>
                            <img
                              src={pkg.backgroundImage}
                              alt={pkg.title}
                              style={{ width: "60px", height: "40px", objectFit: "cover", borderRadius: "4px" }}
                            />
                          </td>
                          <td>{pkg.title}</td>
                          <td>{pkg.city}</td>
                          <td>{pkg.currency === "NGN" ? "₦" : "$"}{pkg.price.toLocaleString()}</td>
                          <td>{pkg.nights}</td>
                          <td>{pkg.persons}</td>
                          <td>
                            <div className="btn-group" role="group">
                              <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => handleReorder(pkg._id, 'up')}
                                title="Move Up"
                                disabled={packages.indexOf(pkg) === 0}
                              >
                                <i className="fas fa-arrow-up"></i>
                              </button>
                              <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => handleReorder(pkg._id, 'down')}
                                title="Move Down"
                                disabled={packages.indexOf(pkg) === packages.length - 1}
                              >
                                <i className="fas fa-arrow-down"></i>
                              </button>
                              <Link
                                to={`/packages/edit/${pkg._id}`}
                                className="btn btn-sm btn-outline-secondary"
                                title="Edit"
                              >
                                <i className="fas fa-edit"></i>
                              </Link>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => openDeleteModal(pkg)}
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
          </div>
        </div>
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
                <p>Are you sure you want to delete the package <strong>{packageToDelete?.title}</strong>?</p>
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
