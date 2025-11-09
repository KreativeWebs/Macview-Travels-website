import { useEffect, useState } from "react";
import adminAxios from "../../api/adminAxios";

export default function VisaRequests() {
  const [applications, setApplications] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchApplications();
  }, [currentPage, statusFilter, searchTerm]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage,
        limit: 10,
        status: statusFilter,
        ...(searchTerm && { search: searchTerm })
      });

      const res = await adminAxios.get(`/visa-applications?${params}`);
      setApplications(res.data.applications);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Error fetching visa applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const openDetails = (app) => setSelected(app);

  return (
    <div className="row g-4">
      {/* Applications Table */}
      <div className="col-12 col-lg-8">
        <div className="bg-white p-3 rounded shadow-sm">
          <h2 className="fw-bold mb-3">Visa Applications</h2>

          {/* Filters */}
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <select
                className="form-select form-select-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="received">Received</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle text-sm">
              <thead className="table-light">
                <tr>
                  <th>Client</th>
                  <th>Country</th>
                  <th>Visa Type</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      <div className="spinner-border spinner-border-sm text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </td>
                  </tr>
                ) : applications.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-muted">
                      No visa applications found
                    </td>
                  </tr>
                ) : (
                  applications.map((a) => (
                    <tr key={a._id}>
                      <td>
                        <div>
                          <div className="fw-medium">{a.fullName}</div>
                          <div className="small text-muted">{a.email}</div>
                        </div>
                      </td>
                      <td>{a.destinationCountry}</td>
                      <td>{a.visaType}</td>
                      <td>
                        <span className={`badge ${getStatusBadgeClass(a.status)}`}>{a.status}</span>
                      </td>
                      <td>{new Date(a.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button
                          onClick={() => openDetails(a)}
                          className="btn btn-sm btn-outline-primary"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="mt-3">
              <ul className="pagination pagination-sm justify-content-center">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>

      {/* Details Panel */}
      <div className="col-12 col-lg-4">
        <div className="bg-white p-3 rounded shadow-sm">
          <h5 className="fw-semibold mb-3">Details</h5>

          {selected ? (
            <VisaDetails app={selected} />
          ) : (
            <div className="text-muted small">
              Select an application to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function VisaDetails({ app }) {
  const [updating, setUpdating] = useState(false);

  const updateStatus = async (newStatus) => {
    try {
      setUpdating(true);
      await adminAxios.put(`/visa-applications/${app._id}/status`, { status: newStatus });
      // Refresh the applications list
      window.location.reload();
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div>
      <h6 className="fw-bold">{app.fullName}</h6>

      <div className="mb-3">
        <div className="row g-2">
          <div className="col-6">
            <small className="text-muted d-block">Email</small>
            <span className="small">{app.email}</span>
          </div>
          <div className="col-6">
            <small className="text-muted d-block">Phone</small>
            <span className="small">{app.phoneNumber}</span>
          </div>
          <div className="col-6">
            <small className="text-muted d-block">Nationality</small>
            <span className="small">{app.nationality}</span>
          </div>
          <div className="col-6">
            <small className="text-muted d-block">Destination</small>
            <span className="small">{app.destinationCountry}</span>
          </div>
          <div className="col-6">
            <small className="text-muted d-block">Visa Type</small>
            <span className="small">{app.visaType}</span>
          </div>
          <div className="col-6">
            <small className="text-muted d-block">Travel Date</small>
            <span className="small">{app.travelDate ? new Date(app.travelDate).toLocaleDateString() : 'Not specified'}</span>
          </div>
          <div className="col-6">
            <small className="text-muted d-block">Status</small>
            <span className={`badge ${getStatusBadgeClass(app.status)}`}>{app.status}</span>
          </div>
          <div className="col-6">
            <small className="text-muted d-block">Payment</small>
            <span className={`badge ${app.payment?.status === 'paid' ? 'bg-success' : 'bg-warning'}`}>
              {app.payment?.status || 'pending'}
            </span>
          </div>
        </div>
      </div>

      {app.notes && (
        <div className="mb-3">
          <small className="text-muted d-block">Notes</small>
          <p className="small mb-0">{app.notes}</p>
        </div>
      )}

      {app.documents && app.documents.length > 0 && (
        <div className="mb-3">
          <small className="text-muted d-block">Documents</small>
          {app.documents.map((doc, index) => (
            <div key={index} className="small mb-2">
              <strong>{doc.label}:</strong>
              {doc.fileUrl ? (
                <div className="mt-1">
                  <a
                    href={`http://localhost:5000${doc.fileUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-outline-primary me-2"
                  >
                    View Document
                  </a>
                  {doc.fileUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i) && (
                    <img
                      src={`http://localhost:5000${doc.fileUrl}`}
                      alt={doc.label}
                      className="img-thumbnail mt-2"
                      style={{ maxWidth: '200px', maxHeight: '200px' }}
                    />
                  )}
                </div>
              ) : (
                doc.textValue || 'Not provided'
              )}
            </div>
          ))}
        </div>
      )}

      <div className="d-flex gap-2 flex-wrap">
        <button
          className="btn btn-warning btn-sm"
          onClick={() => updateStatus('processing')}
          disabled={updating || app.status === 'processing'}
        >
          {updating ? 'Updating...' : 'Mark Processing'}
        </button>
        <button
          className="btn btn-success btn-sm"
          onClick={() => updateStatus('completed')}
          disabled={updating || app.status === 'completed'}
        >
          {updating ? 'Updating...' : 'Approve'}
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => updateStatus('rejected')}
          disabled={updating || app.status === 'rejected'}
        >
          {updating ? 'Updating...' : 'Reject'}
        </button>
      </div>
    </div>
  );
}

// Helper function for status badges
const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'received': return 'bg-warning';
    case 'processing': return 'bg-info';
    case 'completed': return 'bg-success';
    case 'rejected': return 'bg-danger';
    default: return 'bg-secondary';
  }
};
