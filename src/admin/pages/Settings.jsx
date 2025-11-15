import { useState } from "react";
import adminAxios from "../../api/adminAxios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Settings() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [loading, setLoading] = useState(false);

  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  const years = [];
  const currentYear = new Date().getFullYear();
  for (let year = currentYear; year >= currentYear - 5; year--) {
    years.push(year);
  }

  const generatePDF = async () => {
    try {
      setLoading(true);

      const response = await adminAxios.get(`/visa-applications/report?month=${selectedMonth}&year=${selectedYear}`);
      const { applications, month, year } = response.data;

      if (applications.length === 0) {
        toast.info(`No visa applications found for ${months.find(m => m.value === parseInt(month))?.label} ${year}`);
        return;
      }

      const doc = new jsPDF();

      // Title
      doc.setFontSize(20);
      doc.text("Visa Applications Report", 14, 22);
      doc.setFontSize(12);
      doc.text(`Month: ${months.find(m => m.value === parseInt(month))?.label} ${year}`, 14, 32);
      doc.text(`Total Applications: ${applications.length}`, 14, 38);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 44);

      // Table data
      const tableData = applications.map((app, index) => [
        index + 1,
        app.fullName,
        app.email,
        app.phoneNumber,
        app.destinationCountry,
        app.visaType,
        app.status,
        app.addedByAdmin ? "Admin" : "User",
        new Date(app.createdAt).toLocaleDateString(),
      ]);

      // Add table
      autoTable(doc, {
        head: [["#", "Full Name", "Email", "Phone", "Country", "Visa Type", "Status", "Source", "Date"]],
        body: tableData,
        startY: 50,
        styles: {
          fontSize: 8,
          cellPadding: 2,
        },
        headStyles: {
          fillColor: [41, 128, 185],
          textColor: 255,
          fontSize: 9,
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245],
        },
      });

      // Save the PDF
      const fileName = `visa-applications-${months.find(m => m.value === parseInt(month))?.label.toLowerCase()}-${year}.pdf`;
      doc.save(fileName);

    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate visa applications report.");
    } finally {
      setLoading(false);
    }
  };

  const generateFlightPDF = async () => {
    try {
      setLoading(true);

      const response = await adminAxios.get(`/flight-bookings/report?month=${selectedMonth}&year=${selectedYear}`);
      const { bookings, month, year } = response.data;

      if (bookings.length === 0) {
        toast.info(`No flight bookings found for ${months.find(m => m.value === parseInt(month))?.label} ${year}`);
        return;
      }

      const doc = new jsPDF();

      // Title
      doc.setFontSize(20);
      doc.text("Flight Bookings Report", 14, 22);
      doc.setFontSize(12);
      doc.text(`Month: ${months.find(m => m.value === parseInt(month))?.label} ${year}`, 14, 32);
      doc.text(`Total Bookings: ${bookings.length}`, 14, 38);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 44);

      // Table data - only include required fields: #, Fullname, Email, Phone, Triptype, Class, Status, Date
      const tableData = bookings.map((bk, index) => [
        index + 1,
        bk.fullName || '',
        bk.email || '',
        bk.phoneNumber || '',
        bk.tripType || '',
        bk.travelClass || '',
        bk.status || '',
        new Date(bk.createdAt).toLocaleDateString(),
      ]);

      // Add table
      autoTable(doc, {
        head: [["#", "Full Name", "Email", "Phone", "Trip Type", "Class", "Status", "Date"]],
        body: tableData,
        startY: 50,
        styles: {
          fontSize: 9,
          cellPadding: 2,
        },
        headStyles: {
          fillColor: [41, 128, 185],
          textColor: 255,
          fontSize: 10,
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245],
        },
      });

      // Save the PDF
      const fileName = `flight-bookings-${months.find(m => m.value === parseInt(month))?.label.toLowerCase()}-${year}.pdf`;
      doc.save(fileName);

    } catch (error) {
      console.error("Error generating Flight PDF:", error);
      // If axios error, surface server message when available
      if (error?.response) {
        console.error('Flight PDF response data:', error.response.data);
        const msg = error.response.data?.message || `Server returned ${error.response.status}`;
        toast.error(`Failed to generate flight bookings report: ${msg}`);
      } else if (error?.request) {
        console.error('Flight PDF no response, request made:', error.request);
        toast.error('No response from server when generating flight bookings report.');
      } else {
        toast.error('Failed to generate flight bookings report.');
      }
    } finally {
      setLoading(false);
    }
  };

  const generateHotelPDF = async () => {
    try {
      setLoading(true);

      const response = await adminAxios.get(`/hotel-bookings/report?month=${selectedMonth}&year=${selectedYear}`);
      const { bookings, month, year } = response.data;

      if (bookings.length === 0) {
        toast.info(`No hotel bookings found for ${months.find(m => m.value === parseInt(month))?.label} ${year}`);
        return;
      }

      const doc = new jsPDF();
      doc.setFontSize(20);
      doc.text("Hotel Bookings Report", 14, 22);
      doc.setFontSize(12);
      doc.text(`Month: ${months.find(m => m.value === parseInt(month))?.label} ${year}`, 14, 32);
      doc.text(`Total Bookings: ${bookings.length}`, 14, 38);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 44);

      const tableData = bookings.map((bk, index) => [
        index + 1,
        bk.fullName || '',
        bk.email || '',
        bk.destination || '',
        bk.status || '',
        bk.starRating || '',
        new Date(bk.createdAt).toLocaleDateString(),
      ]);

      autoTable(doc, {
        head: [["#", "Full Name", "Email", "Destination", "Status", "Star Rating", "Date"]],
        body: tableData,
        startY: 50,
        styles: { fontSize: 9, cellPadding: 2 },
        headStyles: { fillColor: [41, 128, 185], textColor: 255, fontSize: 10 },
      });

      const fileName = `hotel-bookings-${months.find(m => m.value === parseInt(month))?.label.toLowerCase()}-${year}.pdf`;
      doc.save(fileName);
    } catch (error) {
      console.error("Error generating Hotel PDF:", error);
      toast.error("Failed to generate hotel bookings report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      {/* Page Title */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Settings</h2>
      </div>

      {/* Visa Applications Report Section */}
      <div className="row g-4 mb-4">
        <div className="col-12 col-lg-6">
          <div className="bg-white p-4 rounded shadow-sm">
            <h5 className="fw-semibold mb-3">Visa Applications Report</h5>
            <p className="text-muted small mb-3">
              Download visa applications as PDF report filtered by month and year.
            </p>

            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label small fw-medium">Year</label>
                <select
                  className="form-select"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-medium">Month</label>
                <select
                  className="form-select"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                >
                  {months.map((month) => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={generatePDF}
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Generating PDF...
                </>
              ) : (
                <>
                  <i className="fas fa-download me-2"></i>
                  Download Visa PDF Report
                </>
              )}
            </button>
          </div>
        </div>
        {/* Flight Bookings Report Section */}
        <div className="col-12 col-lg-6">
          <div className="bg-white p-4 rounded shadow-sm">
            <h5 className="fw-semibold mb-3">Flight Bookings Report</h5>
            <p className="text-muted small mb-3">
              Download flight bookings as PDF report filtered by month and year.
            </p>

            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label small fw-medium">Year</label>
                <select
                  className="form-select"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-medium">Month</label>
                <select
                  className="form-select"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                >
                  {months.map((month) => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={generateFlightPDF}
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Generating PDF...
                </>
              ) : (
                <>
                  <i className="fas fa-download me-2"></i>
                  Download Flight PDF Report
                </>
              )}
            </button>
          </div>
        </div>
        {/* Other Settings */}
        <div className="col-12 col-lg-6">
          <div className="bg-white p-4 rounded shadow-sm">
            <h5 className="fw-semibold mb-3">All Visa Requirements</h5>
            <p className="text-muted small">
              Here add, update and delete visa requirements, add countries, configure price,
              and processing time.
            </p>

            <div className="mt-3">
              <Link to="/admin/visa-requirements" className="btn btn-outline-primary">
                Manage Visa Requirements
              </Link>
            </div>
          </div>
        </div>
        {/* Hotel Bookings Report Section */}
        <div className="col-12 col-lg-6">
          <div className="bg-white p-4 rounded shadow-sm">
            <h5 className="fw-semibold mb-3">Hotel Bookings Report</h5>
            <p className="text-muted small mb-3">Download hotel bookings as PDF report filtered by month and year.</p>

            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label small fw-medium">Year</label>
                <select
                  className="form-select"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                >
                  {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-medium">Month</label>
                <select
                  className="form-select"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                >
                  {months.map((month) => (
                    <option key={month.value} value={month.value}>{month.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <button onClick={generateHotelPDF} disabled={loading} className="btn btn-primary">
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Generating PDF...
                </>
              ) : (
                <>
                  <i className="fas fa-download me-2"></i>
                  Download Hotel PDF Report
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
