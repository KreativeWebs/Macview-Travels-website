import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import adminAxios from "../../api/adminAxios";

export default function PackagesManagement() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await adminAxios.get("/packages");
      setPackages(response.data.packages);
    } catch (error) {
      console.error("Error fetching packages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this package?")) {
      try {
        await adminAxios.delete(`/packages/${id}`);
        setPackages(packages.filter(pkg => pkg._id !== id));
        alert("Package deleted successfully");
      } catch (error) {
        console.error("Error deleting package:", error);
        alert("Error deleting package");
      }
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
            <Link to="/admin/addnewpackage" className="btn btn-primary">
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
                  <Link to="/admin/addnewpackage" className="btn btn-primary">
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
                  
                              <Link
                                to={`/admin/edit-package/${pkg._id}`}
                                className="btn btn-sm btn-outline-secondary"
                                title="Edit"
                              >
                                <i className="fas fa-edit"></i>
                              </Link>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDelete(pkg._id)}
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
    </div>
  );
}
