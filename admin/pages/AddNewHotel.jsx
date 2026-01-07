import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import adminAxios from "../src/api/adminAxios";

export default function AddNewHotel() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    destination: "",
    checkInDate: "",
    checkOutDate: "",
    rooms: 1,
    guests: 1,
    roomType: 'single',
    starRating: 'any',
    status: 'received',
    amenities: [],
    budget: '',
    purpose: '',
    notes: '',
    // admin defaults (explicit)
    phoneNumber: 'none',
    gender: 'none',
    dob: 'none',
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName.trim()) return toast.error('Name is required');
    if (!formData.destination.trim()) return toast.error('Destination is required');
    if (!formData.checkInDate || !formData.checkOutDate) return toast.error('Please provide check-in and check-out dates');

    try {
      setLoading(true);
      const payload = {
        fullName: formData.fullName,
        destination: formData.destination,
        checkInDate: formData.checkInDate,
        checkOutDate: formData.checkOutDate,
        rooms: Number(formData.rooms || 1),
        guests: Number(formData.guests || 1),
        roomType: formData.roomType,
        starRating: formData.starRating,
        amenities: formData.amenities,
        budget: formData.budget,
        purpose: formData.purpose,
        notes: formData.notes,
        status: formData.status || 'received',
        phoneNumber: formData.phoneNumber,
        gender: formData.gender,
        dob: formData.dob,
      };

      const res = await adminAxios.post('/hotel-bookings', payload);
      if (res.status === 201) {
        toast.success('Hotel booking added');
        navigate('/admin/hotels');
      }
    } catch (err) {
      console.error('Error adding hotel booking:', err);
      toast.error('Failed to add hotel booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-xxl" style={{ paddingTop: '150px' }}>
      <div className="container">
        <h1 className="text-start" style={{ fontFamily: 'Raleway' }}>Add New Hotel Booking</h1>
        <p>Add a new hotel booking from admin dashboard. Email will be set to the admin's email automatically.</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" name="fullName" value={formData.fullName} onChange={handleInput} required />
          </div>

          <div className="row g-3">
            <div className="col-md-6 mb-3">
              <label className="form-label">Destination</label>
              <input type="text" className="form-control" name="destination" value={formData.destination} onChange={handleInput} required />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">Check-in</label>
              <input type="date" className="form-control" name="checkInDate" value={formData.checkInDate} onChange={handleInput} required />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">Check-out</label>
              <input type="date" className="form-control" name="checkOutDate" value={formData.checkOutDate} onChange={handleInput} required />
            </div>
          </div>

          <div className="row g-3 mb-3">
            <div className="col-md-3">
              <label className="form-label small">Rooms</label>
              <input type="number" min="1" className="form-control" name="rooms" value={formData.rooms} onChange={handleInput} />
            </div>
            <div className="col-md-3">
              <label className="form-label small">Guests</label>
              <input type="number" min="1" className="form-control" name="guests" value={formData.guests} onChange={handleInput} />
            </div>
            <div className="col-md-3">
              <label className="form-label small">Room Type</label>
              <select className="form-select" name="roomType" value={formData.roomType} onChange={handleInput}>
                <option value="single">Single</option>
                <option value="double">Double</option>
                <option value="suite">Suite</option>
                <option value="luxury">Luxury</option>
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label small">Star Rating</label>
              <select className="form-select" name="starRating" value={formData.starRating} onChange={handleInput}>
                <option value="any">Any</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Status</label>
            <select className="form-select" name="status" value={formData.status} onChange={handleInput}>
              <option value="received">Received</option>
              <option value="booked">Booked</option>
              <option value="not booked">Not Booked</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Notes</label>
            <textarea className="form-control" name="notes" value={formData.notes} onChange={handleInput} />
          </div>

          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-secondary" disabled={loading}>{loading ? 'Adding...' : 'Add Booking'}</button>
            <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/admin/hotels')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}