import React, { useState, useEffect } from "react";
import adminAxios from "../src/api/adminAxios";
import { toast } from "react-toastify";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [search, setSearch] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await adminAxios.get(`/users`, {
        params: { page, limit, search }
      });
      setUsers(res.data.users || []);
      setTotalPages(res.data.totalPages || 1);
      setTotalUsers(res.data.total || 0);
    } catch (err) {
      console.error("Error fetching users:", err);
      toast.error("Failed to fetch users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setPage(1);
    await fetchUsers();
  };

  const openDeleteModal = (u) => { setUserToDelete(u); setShowDeleteModal(true); };
  const closeDeleteModal = () => { setShowDeleteModal(false); setUserToDelete(null); };

  const handleDelete = async () => {
    if (!userToDelete) return;
    try {
      await adminAxios.delete(`/users/${userToDelete._id}`);
      toast.success("User deleted");
      closeDeleteModal();
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
      toast.error("Failed to delete user");
    }
  };

  const openDetails = async (id) => {
    try {
      const res = await adminAxios.get(`/users/${id}`);
      setSelectedUser(res.data.user);
      setShowDetails(true);
    } catch (err) {
      console.error("Error fetching user details:", err);
      toast.error("Failed to fetch user details");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row mb-4">
        <div className="col-8">
          <div className="d-flex align-items-center mb-2">
            <h2 className="mb-0 me-3">Users</h2>
            <span className="badge bg-primary">Total: {totalUsers}</span>
          </div>
          <p className="text-muted">Registered users on the main site</p>
        </div>
        <div className="col-4 d-flex justify-content-end align-items-start">
          <form onSubmit={handleSearch} className="d-flex w-100">
            <input className="form-control form-control-sm me-2" placeholder="Search by name or email" value={search} onChange={(e) => setSearch(e.target.value)} />
            <button className="btn btn-sm btn-primary" type="submit">Search</button>
          </form>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div>
                </div>
              ) : users.length === 0 ? (
                <div className="text-center py-5">
                  <h5 className="text-muted">No users found</h5>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>First Name</th>
                        <th>Email</th>
                        <th>Provider</th>
                        <th>Created</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u) => (
                        <tr key={u._id}>
                          <td>{u.firstName}</td>
                          <td>{u.email}</td>
                          <td>{u.authProvider}</td>
                          <td>{u.createdAt ? new Date(u.createdAt).toLocaleString() : ''}</td>
                          <td>
                            <div className="btn-group" role="group">
                              <button className="btn btn-sm btn-outline-secondary" onClick={() => openDetails(u._id)} title="View">View</button>
                              <button className="btn btn-sm btn-outline-danger" onClick={() => openDeleteModal(u)} title="Delete">Delete</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Pagination */}
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div>
                  <small className="text-muted">Page {page} of {totalPages}</small>
                </div>
                <div>
                  <button className="btn btn-sm btn-outline-primary me-2" disabled={page <= 1} onClick={() => setPage(p => Math.max(1, p - 1))}>Prev</button>
                  <button className="btn btn-sm btn-primary" disabled={page >= totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))}>Next</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button type="button" className="btn-close" onClick={closeDeleteModal}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete user <strong>{userToDelete?.firstName}</strong>?</p>
                <p className="text-danger small">This action cannot be undone.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeDeleteModal}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetails && selectedUser && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">User Details</h5>
                <button type="button" className="btn-close" onClick={() => setShowDetails(false)}></button>
              </div>
              <div className="modal-body">
                <p><strong>First name:</strong> {selectedUser.firstName}</p>
                <p><strong>Email:</strong> {selectedUser.email}</p>
                <p><strong>Provider:</strong> {selectedUser.authProvider}</p>
                <p><strong>Joined:</strong> {selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleString() : ''}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowDetails(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}