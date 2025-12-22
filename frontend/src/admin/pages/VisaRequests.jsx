import { useEffect, useState } from "react";
import adminAxios from "../../api/adminAxios";
import { useAuthStore } from "../../store/authStore";
import socket from "../../socket";
import { Link } from "react-router-dom";

export default function VisaRequests() {
  const [applications, setApplications] = useState([]);
  const [selected, setSelected] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedWeek, setSelectedWeek] = useState('');

  useEffect(() => {
    fetchApplications();
  }, [currentPage, statusFilter, searchTerm, selectedYear, selectedMonth, selectedWeek]);

  useEffect(() => {
    // Listen for real-time updates
    socket.on('visaApplicationStatusUpdate', (update) => {
      console.log('VisaRequests: Received status update:', update);
      // Update the application status in real-time
      setApplications(prevApps =>
        prevApps.map(app =>
          app._id === update.id
            ? { ...app, status: update.status, updatedAt: update.updatedAt }
            : app
        )
      );

      // Update selected application if it's the one being updated
      if (selected && selected._id === update.id) {
        setSelected(prev => ({ ...prev, status: update.status, updatedAt: update.updatedAt }));
      }
    });

    // Listen for new visa applications
    socket.on('newVisaApplication', (newApp) => {
      console.log('VisaRequests: New visa application received:', newApp);
      // Prepend the new application to the list
      setApplications(prevApps => {
        const newApps = [newApp, ...prevApps];
        setTotalPages(Math.ceil(newApps.length / 10));
        return newApps;
      });
    });

    // Also listen for global refresh
    socket.on('globalRefresh', () => {
      console.log('VisaRequests: Global refresh triggered');
      fetchApplications();
    });

    return () => {
      socket.off('visaApplicationStatusUpdate');
      socket.off('newVisaApplication');
      socket.off('globalRefresh');
    };
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage,
        limit: 10,
        status: statusFilter,
        ...(searchTerm && { search: searchTerm }),
        ...(selectedYear && { year: selectedYear }),
        ...(selectedMonth && { month: selectedMonth }),
        ...(selectedWeek && { week: selectedWeek })
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

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchApplications();
    setRefreshing(false);
  };

  const openDetails = async (app) => {
    // If the application is incomplete (from socket event), fetch full details
    if (!app.documents || !app.payment || !app.phoneNumber) {
      try {
        const res = await adminAxios.get(`/visa-applications/${app._id}`);
        app = res.data.application;
      } catch (error) {
        console.error("Error fetching full application details:", error);
        return;
      }
    }

    setSelected(app);
    setSelectedRow(app._id);
    // Mark as viewed (remove new indicator)
    if (app.isNew) {
      setApplications(prevApps =>
        prevApps.map(a => a._id === app._id ? { ...a, isNew: false } : a)
      );
    }
  };

  return (
    <div className="row g-4">
      {/* Applications Table */}
      <div className="col-12 col-lg-8">
        <div className="bg-white p-3 rounded shadow-sm">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="fw-bold mb-0">Visa Applications</h2>
            <div className="d-flex gap-2">
              <Link to="addnewvisa" className="btn btn-primary btn-sm">
                <i className="fas fa-plus me-2"></i>
                New Visa
              </Link>
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="btn btn-outline-primary btn-sm"
                title="Refresh applications"
              >
                {refreshing ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Refreshing...
                  </>
                ) : (
                  <>
                    <i className="fas fa-sync-alt me-2"></i>
                    Refresh
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="row g-3 mb-3">
            <div className="col-md-3">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <select
                className="form-select form-select-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="received">Received</option>
                <option value="processing">Processing</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div className="col-md-2">
              <select
                className="form-select form-select-sm"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="">All Years</option>
                {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <select
                className="form-select form-select-sm"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                <option value="">All Months</option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                  <option key={month} value={month}>
                    {new Date(0, month - 1).toLocaleString('default', { month: 'long' })}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <select
                className="form-select form-select-sm"
                value={selectedWeek}
                onChange={(e) => setSelectedWeek(e.target.value)}
              >
                <option value="">All Weeks</option>
                {Array.from({ length: 5 }, (_, i) => i + 1).map(week => (
                  <option key={week} value={week}>Week {week}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle text-sm">
              <thead className="table-light">
                <tr>
                  <th>Visa Name</th>
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
                    <tr key={a._id} className={selectedRow === a._id ? 'table-active' : ''}>
                      <td>
                        <div className="d-flex align-items-center">
                          {a.isNew && (
                            <span className="badge bg-danger me-2" style={{ fontSize: '0.7em' }}>NEW</span>
                          )}
                          <div>
                            <div className="fw-medium">{a.fullName}</div>
                            <div className="small text-muted">{a.email}</div>
                          </div>
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
            <VisaDetails key={selected._id} app={selected} onStatusUpdate={(id, newStatus) => {
              setApplications(prevApps =>
                prevApps.map(a => a._id === id ? { ...a, status: newStatus } : a)
              );
              setSelected(prevSelected => prevSelected && prevSelected._id === id ? { ...prevSelected, status: newStatus } : prevSelected);
            }} />
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

export function VisaDetails({ app, onStatusUpdate }) {
  const [status, setStatus] = useState(app.status);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    setStatus(app.status);
  }, [app.status]);

  const updateStatus = async (newStatus) => {
    try {
      setUpdating(true);
      await adminAxios.put(`/visa-applications/${app._id}/status`, { status: newStatus });
      setStatus(newStatus);
      onStatusUpdate(app._id, newStatus);
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setUpdating(false);
    }
  };

  const handleDownload = async (fileUrl, fileName) => {
    try {
      // For Cloudinary URLs, we need to fetch and download as blob
      const response = await fetch(fileUrl);
      const blob = await response.blob();

      // Create a temporary URL for the blob
      const blobUrl = window.URL.createObjectURL(blob);

      // Create a temporary anchor element and trigger download
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback: open in new tab
      window.open(fileUrl, '_blank');
    }
  };

  return (
    <div>
      <h6 className="fw-bold">{app.email}</h6>

      <div className="mb-3">
        <div className="row g-2">
          <div className="col-6">
            <small className="text-muted d-block">Name</small>
            <span className="small">{app.fullName}</span>
          </div>
          <div className="col-6">
            <small className="text-muted d-block">WhatsApp Number</small>
            <a
              href={`https://wa.me/${app.phoneNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="small text-primary"
              style={{ textDecoration: 'none' }}
            >
              {app.phoneNumber}
            </a>
          </div>

          <div className="col-6">
            <small className="text-muted d-block">Country</small>
            <span className="small">{app.destinationCountry}</span>
          </div>
          <div className="col-6">
            <small className="text-muted d-block">Visa Type</small>
            <span className="small">{app.visaType}</span>
          </div>

          <div className="col-6">
            <small className="text-muted d-block">Status</small>
            <select
              className="form-select form-select-sm"
              value={status}
              onChange={(e) => updateStatus(e.target.value)}
              disabled={updating}
            >
              <option value="received">Received</option>
              <option value="processing">Processing</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div className="col-6">
            <small className="text-muted d-block">Payment</small>
            <span className={`badge ${app.payment?.status === 'paid' || app.addedByAdmin ? 'bg-success' : 'bg-warning'}`}>
              {app.addedByAdmin ? 'paid' : (app.payment?.status || 'pending')}
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
            <div key={index} className="mb-3">
              <strong className="small">{doc.label}:</strong>
              {doc.fileUrl ? (
                <div className="mt-2">
                  {doc.fileUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                    <div className="text-center">
                      <img
                        src={doc.fileUrl.startsWith('http') ? doc.fileUrl : `VITE_API_BASE_URL${doc.fileUrl}`}
                        alt={doc.label}
                        className="img-fluid rounded shadow-sm"
                        style={{ maxWidth: '100%', maxHeight: '300px', cursor: 'pointer' }}
                        onClick={() => window.open(doc.fileUrl.startsWith('http') ? doc.fileUrl : `VITE_API_BASE_URL${doc.fileUrl}`, '_blank')}
                      />
                      <div className="mt-2 d-flex gap-2 justify-content-center">
                        <a
                          href={doc.fileUrl.startsWith('http') ? doc.fileUrl : `VITE_API_BASE_URL${doc.fileUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline-primary"
                        >
                          View Full Size
                        </a>
                        <button
                          onClick={() => handleDownload(doc.fileUrl.startsWith('http') ? doc.fileUrl : `VITE_API_BASE_URL${doc.fileUrl}`, doc.originalName || `${doc.label}.jpg`)}
                          className="btn btn-sm btn-outline-success"
                        >
                          Download
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="d-flex gap-2 align-items-center">
                        <a
                          href={doc.fileUrl.startsWith('http') ? doc.fileUrl : `VITE_API_BASE_URL${doc.fileUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline-primary"
                        >
                          View Document
                        </a>
                        <button
                          onClick={() => handleDownload(doc.fileUrl.startsWith('http') ? doc.fileUrl : `VITE_API_BASE_URL${doc.fileUrl}`, doc.originalName || `${doc.label}.pdf`)}
                          className="btn btn-sm btn-outline-success"
                        >
                          Download
                        </button>
                      </div>
                      <small className="text-muted d-block mt-1">
                        {doc.originalName || 'Document file'}
                      </small>
                    </div>
                  )}
                </div>
              ) : (
                <div className="small text-muted">
                  {doc.textValue || 'Not provided'}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Helper function for status badges
const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'received': return 'bg-warning';
    case 'processing': return 'bg-info';
    case 'approved': return 'bg-success';
    case 'rejected': return 'bg-danger';
    default: return 'bg-secondary';
  }
};
