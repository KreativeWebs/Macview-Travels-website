import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function FlightBookingView() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    axios.get(`/api/admin/flight-bookings/${id}`)
      .then(res => setBooking(res.data))
      .catch(err => console.log(err));
  }, [id]);

  if (!booking) return <p className="m-3">Loading booking...</p>;

  return (
    <div className="container mt-4">
      <h3 className="fw-bold mb-3">Flight Booking Details</h3>

      <Link className="btn btn-secondary mb-3" to="/admin/flight-bookings">
        Back
      </Link>

      <div className="card p-4">

        <p><strong>Name:</strong> {booking.fullName}</p>
        <p><strong>Email:</strong> {booking.email}</p>
        <p><strong>Phone:</strong> {booking.phoneNumber}</p>
        <p><strong>Gender:</strong> {booking.gender}</p>
        <p><strong>DOB:</strong> {booking.dob}</p>
        <p><strong>Trip Type:</strong> {booking.tripType}</p>

        {booking.tripType !== "multi-city" ? (
          <>
            <p><strong>From:</strong> {booking.departureCity}</p>
            <p><strong>To:</strong> {booking.destinationCity}</p>
            <p><strong>Departure:</strong> {booking.departureDate}</p>
            {booking.returnDate && <p><strong>Return:</strong> {booking.returnDate}</p>}
          </>
        ) : (
          <>
            <strong>Multi-City Flights:</strong>
            {booking.multiCityFlights.map((flight, index) => (
              <p key={index}>{flight.from} → {flight.to} on {flight.date}</p>
            ))}
          </>
        )}

        <p><strong>Preferred Airline:</strong> {booking.preferredAirline || "N/A"}</p>
        <p><strong>Class:</strong> {booking.travelClass}</p>
        <p><strong>Passengers:</strong> 
          {booking.adults} Adults, 
          {booking.children || 0} Children, 
          {booking.infants || 0} Infants
        </p>

        {booking.notes && (
          <p><strong>Notes:</strong> {booking.notes}</p>
        )}

      </div>
    </div>
  );
}
