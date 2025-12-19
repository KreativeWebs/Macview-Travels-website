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

        {booking.passportDatapage && booking.passportDatapage.fileUrl && (
          <div className="mt-4">
            <strong>Uploaded Documents</strong>
            <div className="mt-3">
              <strong className="small">Passport Datapage:</strong>
              <div className="mt-2">
                {booking.passportDatapage.fileUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                  <div className="text-center">
                    <img
                      src={booking.passportDatapage.fileUrl}
                      alt="Passport Datapage"
                      className="img-fluid rounded shadow-sm"
                      style={{ maxWidth: '100%', maxHeight: '200px', cursor: 'pointer' }}
                      onClick={() => window.open(booking.passportDatapage.fileUrl, '_blank')}
                    />
                    <div className="mt-2 d-flex gap-2 justify-content-center">
                      <a
                        href={booking.passportDatapage.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-outline-primary"
                      >
                        View Full Size
                      </a>
                      <button
                        onClick={() => handleDownload(booking.passportDatapage.fileUrl, booking.passportDatapage.originalName || 'passport-datapage.jpg')}
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
                        href={booking.passportDatapage.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-outline-primary"
                      >
                        View Document
                      </a>
                      <button
                        onClick={() => handleDownload(booking.passportDatapage.fileUrl, booking.passportDatapage.originalName || 'passport-datapage.pdf')}
                        className="btn btn-sm btn-outline-success"
                      >
                        Download
                      </button>
                    </div>
                    <small className="text-muted d-block mt-1">
                      {booking.passportDatapage.originalName || 'Passport datapage file'}
                    </small>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
