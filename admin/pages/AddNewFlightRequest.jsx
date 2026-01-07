import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import adminAxios from "../src/api/adminAxios";

export default function AddNewFlightRequest() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [tripType, setTripType] = useState("one-way");
  const [formData, setFormData] = useState({
    fullName: "",
    departureCity: "",
    destinationCity: "",
    departureDate: "",
    returnDate: "",
    multiCityFlights: [{ from: "", to: "", date: "" }],
    status: "received",
    adults: 1,
    children: 0,
    infants: 0,
    // Always default these to the literal string 'none' per admin preference
    phoneNumber: 'none',
    gender: 'none',
    dob: 'none',
    travelClass: 'none',
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSegment = () => {
    setFormData(prev => ({ ...prev, multiCityFlights: [...(prev.multiCityFlights || []), { from: "", to: "", date: "" }] }));
  };

  const handleSegmentChange = (index, field, value) => {
    const updated = [...(formData.multiCityFlights || [])];
    updated[index][field] = value;
    setFormData(prev => ({ ...prev, multiCityFlights: updated }));
  };

  const handleRemoveSegment = (index) => {
    const updated = (formData.multiCityFlights || []).filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, multiCityFlights: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName.trim()) {
      toast.error("Name is required");
      return;
    }

    // Basic validation depending on tripType
    if (tripType === "one-way") {
      if (!formData.departureCity || !formData.destinationCity || !formData.departureDate) {
        toast.error("Please fill departure city, destination city and departure date");
        return;
      }
    } else if (tripType === "round-trip") {
      if (!formData.departureCity || !formData.destinationCity || !formData.departureDate || !formData.returnDate) {
        toast.error("Please fill departure, destination, departure and return dates");
        return;
      }
    } else if (tripType === "multi-city") {
      if (!formData.multiCityFlights || formData.multiCityFlights.length === 0) {
        toast.error("Please add at least one segment");
        return;
      }
      for (const seg of formData.multiCityFlights) {
        if (!seg.from || !seg.to || !seg.date) {
          toast.error("Please fill all multi-city segments completely");
          return;
        }
      }
    }

    try {
      setLoading(true);

      const payload = {
        fullName: formData.fullName,
        tripType,
        departureCity: tripType === 'multi-city' ? undefined : formData.departureCity,
        destinationCity: tripType === 'multi-city' ? undefined : formData.destinationCity,
        departureDate: tripType === 'multi-city' ? undefined : formData.departureDate,
        returnDate: tripType === 'round-trip' ? formData.returnDate : '',
        multiCityFlights: tripType === 'multi-city' ? formData.multiCityFlights : [],
        status: formData.status || 'received'
      ,
        // include explicit admin fields (defaults are 'none')
        phoneNumber: formData.phoneNumber,
        gender: formData.gender,
        dob: formData.dob,
        travelClass: formData.travelClass,
        // include passenger counts explicitly (ensure numbers)
        adults: Number(formData.adults || 1),
        children: Number(formData.children || 0),
        infants: Number(formData.infants || 0),
      };

      const res = await adminAxios.post('/flight-bookings', payload);
      if (res.status === 201) {
        toast.success('Flight request added');
        navigate('/admin/flights');
      }
    } catch (err) {
      console.error('Error adding flight request:', err);
      toast.error('Failed to add flight request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-xxl" style={{ paddingTop: '150px' }}>
      <div className="container">
        <h1 className="text-start" style={{ fontFamily: 'Raleway' }}>Add New Flight Request</h1>
        <p>Add a new flight request from admin dashboard. Email will be set to the admin's email automatically.</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" name="fullName" value={formData.fullName} onChange={handleInput} required />
          </div>

          <div className="mb-3">
            <label className="form-label d-block">Trip Type</label>
            <div className="d-flex gap-3">
              <label>
                <input type="radio" name="tripType" value="one-way" checked={tripType === 'one-way'} onChange={() => setTripType('one-way')} /> One Way
              </label>
              <label>
                <input type="radio" name="tripType" value="round-trip" checked={tripType === 'round-trip'} onChange={() => setTripType('round-trip')} /> Round Trip
              </label>
              <label>
                <input type="radio" name="tripType" value="multi-city" checked={tripType === 'multi-city'} onChange={() => setTripType('multi-city')} /> Multi City
              </label>
            </div>
          </div>

          {tripType !== 'multi-city' && (
            <>
              <div className="mb-3">
                <label className="form-label">Departure City</label>
                <input type="text" className="form-control" name="departureCity" value={formData.departureCity} onChange={handleInput} required={tripType !== 'multi-city'} />
              </div>

              <div className="mb-3">
                <label className="form-label">Destination City</label>
                <input type="text" className="form-control" name="destinationCity" value={formData.destinationCity} onChange={handleInput} required={tripType !== 'multi-city'} />
              </div>

              <div className="mb-3">
                <label className="form-label">Departure Date</label>
                <input type="date" className="form-control" name="departureDate" value={formData.departureDate} onChange={handleInput} required={tripType !== 'multi-city'} />
              </div>

              {tripType === 'round-trip' && (
                <div className="mb-3">
                  <label className="form-label">Return Date</label>
                  <input type="date" className="form-control" name="returnDate" value={formData.returnDate} onChange={handleInput} required={tripType === 'round-trip'} />
                </div>
              )}
            </>
          )}

          {tripType === 'multi-city' && (
            <>
              {formData.multiCityFlights.map((seg, idx) => (
                <div key={idx} className="mb-3 border rounded p-3">
                  <h6>Segment {idx + 1}</h6>
                  <div className="mb-2">
                    <label className="form-label">Departure City</label>
                    <input type="text" className="form-control" value={seg.from} onChange={(e) => handleSegmentChange(idx, 'from', e.target.value)} required />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Destination City</label>
                    <input type="text" className="form-control" value={seg.to} onChange={(e) => handleSegmentChange(idx, 'to', e.target.value)} required />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Departure Date</label>
                    <input type="date" className="form-control" value={seg.date} onChange={(e) => handleSegmentChange(idx, 'date', e.target.value)} required />
                  </div>
                  {formData.multiCityFlights.length > 1 && (
                    <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => handleRemoveSegment(idx)}>Remove</button>
                  )}
                </div>
              ))}

              <button type="button" className="btn btn-outline-primary mb-3" onClick={handleAddSegment}>+ Add Segment</button>
            </>
          )}

          <div className="mb-3">
            <label className="form-label">Passengers</label>
            <div className="d-flex gap-2">
              <div>
                <small className="text-muted">Adults</small>
                <input type="number" min="1" className="form-control" name="adults" value={formData.adults} onChange={handleInput} />
              </div>
              <div>
                <small className="text-muted">Children</small>
                <input type="number" min="0" className="form-control" name="children" value={formData.children} onChange={handleInput} />
              </div>
              <div>
                <small className="text-muted">Infants</small>
                <input type="number" min="0" className="form-control" name="infants" value={formData.infants} onChange={handleInput} />
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Travel Class</label>
            <select className="form-select" name="travelClass" value={formData.travelClass} onChange={handleInput}>
              <option value="none">None</option>
              <option value="economy">Economy</option>
              <option value="premium_economy">Premium Economy</option>
              <option value="business">Business</option>
              <option value="first">First</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Status</label>
            <select className="form-select" name="status" value={formData.status} onChange={handleInput}>
              <option value="received">Received</option>
              <option value="booked">Booked</option>
              <option value="not booked">Not Booked</option>
            </select>
          </div>

          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-secondary" disabled={loading}>{loading ? 'Adding...' : 'Add Request'}</button>
            <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/admin/flights')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
