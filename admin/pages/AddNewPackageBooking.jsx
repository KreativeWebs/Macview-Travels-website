import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import adminAxios from "../src/api/adminAxios";

export default function AddNewPackageBooking() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [packages, setPackages] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    whatsappNumber: "",
    email: "",
    travelDate: "",
    packageId: "",
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const res = await adminAxios.get('/packages');
      setPackages(res.data.packages || []);
      if (res.data.packages && res.data.packages.length > 0) {
        setFormData(prev => ({ ...prev, packageId: res.data.packages[0]._id }));
      }
    } catch (err) {
      console.error('Error fetching packages:', err);
      toast.error('Failed to load packages');
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName.trim()) {
      toast.error('Full name is required');
      return;
    }
    if (!formData.packageId) {
      toast.error('Please select a package');
      return;
    }
    if (!formData.travelDate) {
      toast.error('Travel date is required');
      return;
    }

    try {
      setLoading(true);
      const selectedPackage = packages.find(p => p._id === formData.packageId);

      const payload = {
        fullName: formData.fullName,
        whatsappNumber: formData.whatsappNumber || 'none',
        email: formData.email || 'none',
        travelDate: formData.travelDate,
        packageId: formData.packageId,
        packageTitle: selectedPackage.title,
        packagePrice: selectedPackage.price,
        packageCurrency: selectedPackage.currency,
        packageCity: selectedPackage.city,
        // Admin-created bookings should be marked paid
        payment: { status: 'paid' }
      };

      const res = await adminAxios.post('/package-bookings', payload);
      if (res.status === 201) {
        toast.success('Package booking created');
        navigate('/package-bookings');
      }
    } catch (err) {
      console.error('Error creating package booking:', err);
      toast.error('Failed to create package booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-xxl" style={{ paddingTop: '150px' }}>
      <div className="container">
        <h1 className="text-start" style={{ fontFamily: 'Raleway' }}>Add New Package Booking</h1>
        <p>Add a new package booking from the admin dashboard.</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-control" name="fullName" value={formData.fullName} onChange={handleInput} required />
          </div>

          <div className="mb-3">
            <label className="form-label">WhatsApp Number</label>
            <input type="text" className="form-control" name="whatsappNumber" value={formData.whatsappNumber} onChange={handleInput} />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" name="email" value={formData.email} onChange={handleInput} />
          </div>

          <div className="mb-3">
            <label className="form-label">Travel Date</label>
            <input type="date" className="form-control" name="travelDate" value={formData.travelDate} onChange={handleInput} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Package</label>
            <select className="form-select" name="packageId" value={formData.packageId} onChange={handleInput} required>
              <option value="">Select a package</option>
              {packages.map(p => (
                <option key={p._id} value={p._id}>{p.title} - {p.city} - {p.currency === "NGN" ? "₦" : "$"}{p.price}</option>
              ))}
            </select>
            {packages.length === 0 && (
              <div className="small text-muted mt-1">No active packages available</div>
            )}
          </div>

          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-secondary" disabled={loading}>{loading ? 'Adding...' : 'Add Booking'}</button>
            <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/package-bookings')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
