import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import adminAxios from "../src/api/adminAxios";

export default function AddNewFlashSaleBooking() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [flashSales, setFlashSales] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    whatsappNumber: "",
    dateOfBirth: "",
    gender: "none",
    flashSaleId: "",
    adults: 1,
    children: 0,
    infants: 0,
    status: "received",
  });

  useEffect(() => {
    fetchFlashSales();
  }, []);

  const fetchFlashSales = async () => {
    try {
      const res = await adminAxios.get('/flash-sales');
      setFlashSales(res.data.flashSales || []);
      if (res.data.flashSales && res.data.flashSales.length > 0) {
        setFormData(prev => ({ ...prev, flashSaleId: res.data.flashSales[0]._id }));
      }
    } catch (err) {
      console.error('Error fetching flash sales:', err);
      toast.error('Failed to load flash sales');
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error('Name is required');
      return;
    }
    if (!formData.flashSaleId) {
      toast.error('Please select a flash sale');
      return;
    }

    try {
      setLoading(true);
      const payload = {
        name: formData.name,
        whatsappNumber: formData.whatsappNumber || 'none',
        dateOfBirth: formData.dateOfBirth || null,
        gender: formData.gender || 'none',
        flashSaleId: formData.flashSaleId,
        adults: Number(formData.adults || 1),
        children: Number(formData.children || 0),
        infants: Number(formData.infants || 0),
        // Admin-created bookings should be marked paid
        status: 'paid'
      };

      const res = await adminAxios.post('/flash-sale-bookings', payload);
      if (res.status === 201) {
        toast.success('Flash sale booking created');
        navigate('/flash-sales');
      }
    } catch (err) {
      console.error('Error creating flash sale booking:', err);
      toast.error('Failed to create flash sale booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-xxl" style={{ paddingTop: '150px' }}>
      <div className="container">
        <h1 className="text-start" style={{ fontFamily: 'Raleway' }}>Add New Flash Sale Booking</h1>
        <p>Add a new flash sale booking from the admin dashboard.</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" name="name" value={formData.name} onChange={handleInput} required />
          </div>

          <div className="mb-3">
            <label className="form-label">WhatsApp Number</label>
            <input type="text" className="form-control" name="whatsappNumber" value={formData.whatsappNumber} onChange={handleInput} />
          </div>

          <div className="mb-3">
            <label className="form-label">Date of Birth</label>
            <input type="date" className="form-control" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInput} />
          </div>

          <div className="mb-3">
            <label className="form-label">Gender</label>
            <select className="form-select" name="gender" value={formData.gender} onChange={handleInput}>
              <option value="none">None</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Flash Sale</label>
            <select className="form-select" name="flashSaleId" value={formData.flashSaleId} onChange={handleInput} required>
              <option value="">Select a flash sale</option>
              {flashSales.map(s => (
                <option key={s._id} value={s._id}>{s.destinationCity} - ₦{s.price}</option>
              ))}
            </select>
            {flashSales.length === 0 && (
              <div className="small text-muted mt-1">No active flash sales available</div>
            )}
          </div>

          <div className="mb-3 d-flex gap-2">
            <div>
              <small className="text-muted d-block">Adults</small>
              <input type="number" min="1" className="form-control" name="adults" value={formData.adults} onChange={handleInput} />
            </div>
            <div>
              <small className="text-muted d-block">Children</small>
              <input type="number" min="0" className="form-control" name="children" value={formData.children} onChange={handleInput} />
            </div>
            <div>
              <small className="text-muted d-block">Infants</small>
              <input type="number" min="0" className="form-control" name="infants" value={formData.infants} onChange={handleInput} />
            </div>
          </div>

          {/* Admin-created bookings are marked paid automatically */}
          <input type="hidden" name="status" value="paid" />

          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-secondary" disabled={loading}>{loading ? 'Adding...' : 'Add Booking'}</button>
            <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/flash-sales')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}